import json
from matplotlib.font_manager import json_dump
import torch
from matplotlib import pyplot as plt
import numpy as np
import cv2
import datetime 
import requests
from objects import Detection

# Load Model (yolov5s)
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

# Set confidence treshold
model.conf = 0.30

# Only detect bottles
model.classes = [39]

# Detect real time
cap = cv2.VideoCapture(0)

isRunning = True

while isRunning:
    ret, frame = cap.read()    

    # Make detections 
    results = model(frame)

    # cv2.imshow('YOLOv5s', np.squeeze(results.render()))

    # time location littertype probability image(frames) bounding box
    objects = []
    detectedAt = datetime.datetime.now().strftime("%c")
    lat = 00.00
    lon = 00.00   
    picture = results.render()

    for n in results.xyxyn[0]:
        classIndex = int(n[5])
        type = [results.names[classIndex], probability]

        probability = n[4]

        xMin = results.xyxy[0][0]
        yMin = results.xyxy[0][1]
        xMax = results.xyxy[0][2]
        yMax = results.xyxy[0][3]

        objects.append({type, probability, xMin, yMin, xMax, yMax})

    url = "http://localhost:3000/api/detection"
    headers = {"Authorization": "test"}
    data = json.dumps(Detection(objects, detectedAt, lat, lon, "picture" ).__dict__)

    res = requests.post(url, data=data, headers=headers)
    # print(res.text)
    isRunning = False

    if cv2.waitKey(10) & 0xFF == ord('q'):
        break
cap.release()

cv2.destroyAllWindows()