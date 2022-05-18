from copy import copy
import time
import torch
import requests
import cv2
import serial
import numpy as np
from matplotlib import pyplot as plt

# our modules
import sensor
from detection import Detection 
import _utils

# setting device on GPU if available, else CPU
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print('Using device:', device, '\n')

# Load Model (yolov5s)
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

# Set confidence treshold
model.conf = 0.30

# Only detect bottles
model.classes = [39]

# Get environment variables
API_URL, SECRET_KEY = _utils.get_env(['API_URL', 'SECRET_KEY'])

while True:
	try:
		# Try to start videocapture
		cap = cv2.VideoCapture(0)
		print("Camera connected")
		ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
		print("GPS connected")

		# --------------------- START DETECTING ------------------------ #
		while cap.isOpened():
			if cv2.waitKey(10) & 0xFF == ord('h'):
				break
			ret, frame = cap.read()
			base_img = copy(frame)

			# Check frame for objects
			results = model(frame)

			# Show results in window
			# cv2.imshow('YOLOv5s', np.squeeze(results.render()))

			# Reformat results to pandas dataframe
			df = results.pandas().xyxy[0]

			# If empty continue with next frame
			# else send detection data
			if (df.empty): continue

			lat, lon = sensor.get_location(ser)
			data = Detection(df, lat, lon, base_img)
			res = requests.post(
				url=API_URL, 
				data=data.json_serialize(), # To get the image with bounding box use: results.render()[0]
				headers={"Authorization": SECRET_KEY, "Content-Type": "application/json"})
			
			print(
				f'[ status: {res.status_code} ]' +
				f'[ {data.detectedAt} ]' +
				f'[ object(s): {len(data.objects)} ]' +
				f'[ lat: {data.lat} - lon: {data.lon} ]'
				)

	except:
		cap.release()
		cv2.destroyAllWindows()
		ser.close()
		time.sleep(1)
		continue
