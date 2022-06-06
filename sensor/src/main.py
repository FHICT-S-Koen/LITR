from copy import copy
import time
import torch
import cv2
import serial
import numpy as np
from time import time

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

		# start timer
		start = time()
		count = 0

		# --------------------- START DETECTING ------------------------ #
		while cap.isOpened():
			ret, frame = cap.read()

			if ret:
				base_img = copy(frame)
				# Check frame for objects
				results = model(frame)
				count += 1
				print(f"FPS: {count/(time() - start)}")
				# Show results in window
				# cv2.imshow('YOLOv5s', np.squeeze(results.render()))

				# Reformat results to pandas dataframe
				df = results.pandas().xyxy[0]

				# If empty continue with next frame
				# else send detection data
				if (df.empty): continue

				lat, lon = sensor.get_location(ser)
				# To get the image with bounding box use: results.render()[0]
				data = Detection(df, lat, lon, base_img)
				res = data.send(API_URL, SECRET_KEY)
				
				print(
					f'[ status: {res.status_code} ]' +
					f'[ {data.detectedAt} ]' +
					f'[ object(s): {len(data.objects)} ]' +
					f'[ lat: {data.lat} - lon: {data.lon} ]'
					)
			else: break

	except:
		cap.release()
		cv2.destroyAllWindows()
		ser.close()
		time.sleep(1)
		continue
