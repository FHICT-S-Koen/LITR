import json
import cv2
from matplotlib import pyplot as plt
import numpy as np
import datetime 
import requests

from objects import Detection

def detect(model, API_URL: str, SECRET_KEY: str):

	# Detect real time
	cap = cv2.VideoCapture(0)

	isRunning = True

	while isRunning:
		ret, frame = cap.read()
		print("aoisjdowjodjowajdjwaijdoiwajoijdoiwajdwaoidjo", frame)

		# Make detections 
		results = model(frame)

		cv2.imshow('YOLOv5s', np.squeeze(results.render()))

		# time location littertype probability image(frames) bounding box
		objects = []
		detectedAt = datetime.datetime.now().strftime("%c")
		lat = 00.00
		lon = 00.00
		picture = results.render()
		print(picture)

		for n in results.xyxyn[0]:
			classIndex = int(n[5])
			type = results.names[classIndex]
			probability = n[4]

			xMin = results.xyxy[0][0]
			yMin = results.xyxy[0][1]
			xMax = results.xyxy[0][2]
			yMax = results.xyxy[0][3]


			objects.append({type, probability, xMin, yMin, xMax, yMax})

		data = json.dumps(Detection(objects, detectedAt, lat, lon, "picture" ).__dict__)

		res = requests.post(API_URL, data=data, headers={"Authorization": SECRET_KEY})
		# print(res.text)
		isRunning = False

		if cv2.waitKey(10) & 0xFF == ord('q'):
			break
	cap.release()

	cv2.destroyAllWindows()
