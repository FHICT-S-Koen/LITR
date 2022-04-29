import json
import requests
import cv2
from matplotlib import pyplot as plt
import numpy as np
import datetime 

from objects import Detection

def detect(model, API_URL: str, SECRET_KEY: str):

	cap = cv2.VideoCapture(0)

	while cap.isOpened():
		ret, frame = cap.read()

		results = model(frame)
		cv2.imshow('YOLOv5s', np.squeeze(results.render()))

		objects = []
		detectedAt = datetime.datetime.now().strftime("%c")
		lat, lon = 00.00, 00.00

		for n in results.xyxyn[0]:
			objects.append({results.names[int(n[5])], results.names[int(n[4])], n[0], n[1], n[2], n[3]})
		# print(objects)
		# data = json.dumps(Detection(objects, detectedAt, lat, lon, "picture" ).__dict__)
		# res = requests.post(API_URL, data=data, headers={"Authorization": SECRET_KEY, "Content-Type": "application/json"})
		# print(res.text)

		if cv2.waitKey(10) & 0xFF == ord('q'):
			break
	cap.release()
	cv2.destroyAllWindows()
