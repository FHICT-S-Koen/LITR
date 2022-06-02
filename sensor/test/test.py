import cv2
import matplotlib.pyplot as plt
import onnxruntime as ort
import numpy as np

IMG_SIZE = 416
img_array = cv2.imread("bottle.jpg")
new_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
new_array.reshape(-1, IMG_SIZE, IMG_SIZE, 3)
new_array = new_array.astype('float32')

ort_sess = ort.InferenceSession('test.onnx')
outputs = ort_sess.run(None, {'bottle_input': [new_array]})

# print(outputs[2].shape)

plt.imshow(outputs[0])