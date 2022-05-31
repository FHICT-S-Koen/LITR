import json
import requests
import random
import base64
import datetime
from io import BytesIO
from PIL import Image
# img = os.path.join(os.path.dirname(__file__), 'bottle.jpg')
img = Image.open('bottle.jpg')
im_file = BytesIO()
img.save(im_file, format="JPEG")
im_bytes = im_file.getvalue()  # im_bytes: image in binary format.
im_b64 = base64.b64encode(im_bytes).decode('utf-8')

path = __file__.replace("./", "")
path = path.replace("generate_markers.py", "")
with open(path + "options.json") as outfile:
    options = json.load(outfile)

def generate_random_markers_in_municipalities():
    for o in options:
        for i in range(10):
            randLat = random.randint(0, 1)
            randLon = random.randint(0, 1)
            # Add area logic
            req = requests.post(
                url ="http://localhost:3000/api/detection", 
                data = json.dumps({
                    'objects': [{
                        'xMin': 222.1836242675781,
                        'yMin': 136.0699005126953,
                        'xMax': 384.6746520996094,
                        'yMax': 478.2084350585938,
                        'confidence': 0.7357182502746582,
                        'type': 'bottle'}],
                    'detectedAt': datetime.datetime.now().strftime("%c"),
                    'lat': o.get('coords')[0] + randLat / 100,
                    'lon': o.get('coords')[1] + randLon / 100,
                    'picture': im_b64
                }),
                headers= { "Authorization": "test", "Content-Type": "application/json" }
            )
        print(req)

def generate_random_amount_of_markers():
    for o in options:
        for i in range(10):
            randLat = random.randint(0, 1)
            randLon = random.randint(0, 1)
            req = requests.post(
                url =" http://localhost:3000/api/detection", 
                data = json.dumps({
                    'objects': [],
                    'detectedAt': '',
                    'lat': o.get('coords')[0] + randLat / 100,
                    'lon': o.get('coords')[1] + randLon / 100,
                    'picture': ''
                }),
                headers= { "Authorization": "test", "Content-Type": "application/json" }
            )
        print(req)

generate_random_markers_in_municipalities()