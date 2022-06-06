import json
import datetime
import base64
import cv2
import requests

class Detection:
    def __init__(self, df, lat, lon, bitmap):
        self.objects = self.reformat_dataframe(df)
        self.detectedAt = self.get_local_time()
        self.lat = lat
        self.lon = lon
        self.picture = self.encode_bitmap_to_base64(bitmap)

    def get_local_time(self):
        return datetime.datetime.now().strftime("%c")

    def reformat_dataframe(self, df):
        df.pop('class')
        df = df.rename(columns = {'xmin': 'xMin','ymin': 'yMin','xmax': 'xMax','ymax': 'yMax','name':'type'})
        return df.to_dict(orient='records')

    def encode_bitmap_to_base64(self, bitmap):
        _, buffer = cv2.imencode(
            '.jpg', bitmap, 
            [cv2.IMWRITE_JPEG_QUALITY, 80]
        ) # for more info about quality see https://docs.opencv.org/3.4/d8/d6a/group__imgcodecs__flags.html
        return base64.b64encode(buffer).decode('utf-8')

    def json_serialize(self):
        return json.dumps(self.__dict__)

    def send(self, api_url, secret_key):
        return requests.post(
            url=api_url, 
            data=self.json_serialize(),
            headers={"Authorization": secret_key, "Content-Type": "application/json"})
