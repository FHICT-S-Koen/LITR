
from matplotlib.font_manager import json_dump
import torch
from matplotlib import pyplot as plt
import numpy as np

import os
from dotenv import load_dotenv

from detect import detect

# setting device on GPU if available, else CPU
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print('Using device:', device, '\n')

#Additional Info when using cuda
# if device.type == 'cuda':
#     print(torch.cuda.get_device_name(0))
#     print('Memory Usage:')
#     print('Allocated:', round(torch.cuda.memory_allocated(0)/1024**3,1), 'GB')
#     print('Cached:   ', round(torch.cuda.memory_reserved(0)/1024**3,1), 'GB')

# Load Model (yolov5s)
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

# Set confidence treshold
model.conf = 0.30

# Only detect bottles
model.classes = [39]

load_dotenv() # DO NOT PRINT OUT THE ENVIRONMENT VARIABLES since the output may be saved, because of Jupyter notebook and then may be pushed to github excedentally

API_URL = os.getenv('API_URL')
if API_URL is None: raise Exception("API_URL can't be empty")

SECRET_KEY = os.getenv('SECRET_KEY')
if SECRET_KEY is None: raise Exception("SECRET_KEY can't be empty")

detect(model, API_URL, SECRET_KEY)