import json
import pandas as pd  # library for data analysis
import requests  # library to handle requests
from bs4 import BeautifulSoup  # library to parse HTML documents

response = requests.get("https://en.wikipedia.org/wiki/Municipalities_of_the_Netherlands")
print(response.status_code)

soup = BeautifulSoup(response.text, 'html.parser')
municipality_table = soup.find('table', {'class': "plainrowheaders"})

df = pd.read_html(str(municipality_table))
df = pd.DataFrame(df[0])

ls = []

for x in df[['Municipality[a]', 'Land area[d][26]']].values.tolist():
    municipality = x[0]
    area = x[1][slice(x[1].index('km2')-1)]

    try:
        response = requests.get("https://en.wikipedia.org/wiki/" + municipality)
        print(response.status_code)

        soup = BeautifulSoup(response.text, 'html.parser')
        coords_url = soup.find('span', {'class': "geo-default"}).findParent()['href']

        response = requests.get("https:" + coords_url)
        print(response.status_code)

        soup = BeautifulSoup(response.text, 'html.parser')
        lat = soup.find('span', {'class': "p-latitude"}).text
        lon = soup.find('span', {'class': "p-longitude"}).text

        ls.append({'name': municipality, 'coords': [lat, lon], 'area': area})

    except:
        ls.append({'name': municipality, 'area': area})

json_object = json.dumps(ls, indent=4)

with open("data.json", "w") as outfile:
    outfile.write(json_object)
