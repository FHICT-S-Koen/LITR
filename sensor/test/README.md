# Model Outputs

## The yolov3 explained
- 3 layers
   1. (1, 13, 13, 33)
   2. (1, 26, 26, 33)
   3. (1, 52, 52, 33)

(1, 13, 13, 33):
1 = batch-size
13 + 13 = grid of 13 x 13
33 = predicted bounding box coordinates, classes probabilities

