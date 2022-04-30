import json
import datetime
import base64
from io import BytesIO
from PIL import Image

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
        buffered = BytesIO()
        img_base64 = Image.fromarray(bitmap)
        img_base64.save(buffered, format="JPEG")
        return base64.b64encode(buffered.getvalue()).decode('utf-8')

    def json_serialize(self):
        return json.dumps(self.__dict__)
