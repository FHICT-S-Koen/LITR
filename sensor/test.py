import torch
import numpy as np
import cv2

# setting device on GPU if available, else CPU
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print('Using device:', device)
print()

#Additional Info when using cuda
if device.type == 'cuda':
    print(torch.cuda.get_device_name(0))
    print('Memory Usage:')
    print('Allocated:', round(torch.cuda.memory_allocated(0)/1024**3,1), 'GB')
    print('Cached:   ', round(torch.cuda.memory_reserved(0)/1024**3,1), 'GB')

#Load Model (yolov5s)
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
# Set IOU treshold
# model.iou = 0.3
# Set confidence treshold
model.conf = 0.3
# Only detect bottles
model.classes = [39]

# Detect real time
cap = cv2.VideoCapture(0)
while cap.isOpened():
    ret, frame = cap.read()
    
    # Make detections 
    results = model(frame)
    
    cv2.imshow('YOLOv5s', np.squeeze(results.render()))   

    if cv2.waitKey(10) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()

# # Make Detection
# img = 'yolov5/data/images/zidane.jpg'

# results = model(img)
# results.print()

# ## Show outputdata:
# import json

# # Detection class
# for n in results.xyxyn[0]:
#     classIndex = int(n[5])
#     classname = results.names[classIndex]
#     probability = n[4]

# # Amount of detections
# detections = len(results.xyxyn[0])

# # Bounding box
# bbox = results.xyxy[0]
# # Frames of image
# img = results.render()



