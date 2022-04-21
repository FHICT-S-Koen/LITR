import torch
from matplotlib import pyplot as plt
import numpy as np
import cv2
import time
import requests
import models

# Load Model (yolov5s)
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
# Set confidence treshold
model.conf = 0.30
# Only detect bottles
model.classes = [39]
# Detect real time
cap = cv2.VideoCapture(0)
while cap.isOpened():
    ret, frame = cap.read()    

    # Make detections 
    results = model(frame)
    
    cv2.imshow('YOLOv5s', np.squeeze(results.render()))   
    
    # time location littertype probability image(frames) bounding box
    objects = []
    detectedAt = time.time()    
    lat = 00.00
    lon = 00.00   
    
    for n in results.xyxyn[0]:
        classIndex = int(n[5])
        probability = n[4]
        type = [results.names[classIndex], probability]
        xMin = results.xyxy[0][0]
        yMin = results.xyxy[0][1]
        xMax = results.xyxy[0][2]
        yMax = results.xyxy[0][3]
        print(n)
        objects.append(models.Object(type, probability, xMin, yMin, xMax, yMax))
    picture = results.render()  
    requests.post("localhost:3000/api/detection", models.Detection(objects, detectedAt, lat, lon, picture))
    if cv2.waitKey(10) & 0xFF == ord('q'):
        break
cap.release()

cv2.destroyAllWindows()