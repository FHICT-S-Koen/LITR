import torch
import requests
import cv2
import torch
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

# Start videocapture
cap = cv2.VideoCapture(0)
count = 0

# --------------------- START DETECTING ------------------------ #
while cap.isOpened():
	ret, frame = cap.read()

	# Check frame for objects
	results = model(frame)

	# Show results in window
	# cv2.imshow('YOLOv5s', np.squeeze(results.render()))

	# Reformat results to pandas dataframe
	df = results.pandas().xyxy[0]

	# If empty continue with next frame
	# else send detection data
	if (df.empty): continue

	lat, lon = sensor.get_location()
	res = requests.post(
		url=API_URL, 
		data=Detection(df, lat, lon, frame).json_serialize(), # To get the image with bounding box use: results.render()[0]
		headers={"Authorization": SECRET_KEY, "Content-Type": "application/json"})
	
	count += 1
	print(f'{count} data send')
	# print(res.text)

	if cv2.waitKey(10) & 0xFF == ord('q'):
		break

cap.release()
cv2.destroyAllWindows()
