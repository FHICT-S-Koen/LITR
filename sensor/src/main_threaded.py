import time
import torch
import cv2
import serial
import numpy as np
from copy import copy
from time import time
from concurrent.futures import ThreadPoolExecutor

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
model.conf = 0.6

# Only detect bottles
model.classes = [39]

# Get environment variables
API_URL, SECRET_KEY = _utils.get_env(['API_URL', 'SECRET_KEY'])

# worker function
def task(detection):
	results, lat, lon, base_img = detection
	data = Detection(results.pandas().xyxy[0], lat, lon, base_img)
	res = data.send(API_URL, SECRET_KEY)
	print(
		f'[ status: {res.status_code} ]' +
		f'[ {data.detectedAt} ]' +
		f'[ object(s): {len(data.objects)} ]' +
		f'[ lat: {data.lat} - lon: {data.lon} ]'
		)

detections = []

# init thread pool
executor = ThreadPoolExecutor(1)

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
				base_img = copy(frame) # necessary
				# detect
				results = model(frame)
				count += 1
				print(f"FPS: {count/(time() - start)}")
				# after five detections offload to worker threads
				if len(detections) == 10:
					executor.map(task, detections)
					detections.clear()
				# get location
				lat, lon = sensor.get_location(ser)
				# append data to offload
				if not results.pandas().xyxy[0].empty:
					detections.append([results, lat, lon, base_img]) # To get the image with bounding box use: results.render()[0]
				# Show results in window
				# cv2.imshow('YOLOv5s', np.squeeze(results.render()))
			else: break

	except:
		cap.release()
		cv2.destroyAllWindows()
		ser.close()
		time.sleep(1)
		continue
