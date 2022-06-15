import json
from colorama import Fore
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
error_ls = []

def get_municipality_coords_url(municipality, suffixes, response_codes):
    for suffix in suffixes:
        try:
            if (municipality == 'Altena'): # Has not been tested yet
                response = requests.get("https://en.wikipedia.org/wiki/Altena,_North_Brabant")
            else:
                response = requests.get("https://en.wikipedia.org/wiki/" + municipality + suffix)
            soup = BeautifulSoup(response.text, 'html.parser')
            coords_url = soup.find('span', {'class': "geo-default"}).findParent()['href']
            response_codes.append(response.status_code)
            break
        except:
            response_codes.append(response.status_code)
    return coords_url, response_codes

for x in df[['Municipality[a]', 'Land area[d][26]']].values.tolist():
    municipality = x[0]
    municipality = municipality.replace(" (LI)", ",_Limburg")
    municipality = municipality.replace(" (NH)", ",_North_Holland")
    area = x[1][slice(x[1].index('km2')-1)]
    response_codes = []

    try: 
        coords_url, response_codes = get_municipality_coords_url(municipality, ["", ",_Netherlands", "_(municipality)", ",_Overijssel", ",_North_Holland", ",_Gelderland", ",_Limburg"], response_codes)
        response = requests.get("https:" + coords_url)

        soup = BeautifulSoup(response.text, 'html.parser')
        lat = soup.find('span', {'class': "p-latitude"}).text
        lon = soup.find('span', {'class': "p-longitude"}).text

        ls.append({'name': x[0], 'coords': [lat, lon], 'area': area})

        print(Fore.LIGHTWHITE_EX, "["+" ".join(str(code) for code in response_codes) + f"] {municipality} - ({lat}, {lon}, {area}): successfully added")

    except:
        m = municipality.replace(" ", "_")
        error_ls.append(municipality)
        print(Fore.LIGHTRED_EX, "["+" ".join(str(code) for code in response_codes) + f"] Error: Could not find coords of {municipality} (https://en.wikipedia.org/wiki/{m})")

json_object = json.dumps(ls, indent=4)

path = __file__.replace("./", "")
path = path.replace("scraper.py", "")

with open(path + "options.json", "w") as outfile:
    outfile.write(json_object)

print("done!")

if (len(error_ls) > 0):
    print(Fore.LIGHTRED_EX, "The following municipalities could not be found or the coordinates could not be found:", end="")
    print(Fore.LIGHTRED_EX, "".join(f"\n\t{m}: (https://en.wikipedia.org/wiki/{m})" for m in error_ls))
    print(Fore.LIGHTRED_EX, "You may need to add another suffix or manually set the coordinates")
