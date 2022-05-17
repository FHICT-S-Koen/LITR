import torch
import torchvision
from PIL import Image
import numpy as np

# Load yolov5 model
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

# Download litter image
import urllib
url, filename = ("https://images.pond5.com/plastic-water-bottle-litter-grass-footage-159735350_iconl.jpeg", "bottle.jpg")
urllib.request.urlretrieve(url, filename)

from torchvision import transforms
inp_image = Image.open(filename)

preprocess = transforms.Compose([
                                 transforms.Resize(256),
                                 transforms.CenterCrop(224),
                                 transforms.ToTensor(),
                                 transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

input_tensor = preprocess(inp_image)
inp_batch = input_tensor.unsqueeze(0)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
inp_batch.to(device)
model.to(device)

# Output of shape 1000, confidence scores for each of the imagenet classes
with torch.no_grad():
  output = model(inp_batch)
print(output[0])

# Now we will save this model.
import torch.onnx

torch.onnx.export(
    model,
    inp_batch,
    "yolov5.onnx",
    export_params=True,
    opset_version=11
)

import onnx

onnx_model = onnx.load("yolov5.onnx")
onnx.checker.check_model(onnx_model)