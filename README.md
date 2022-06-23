# LITR

## About

As we know, litter is terrible for the environment, and about nine tons of litter end up in the ocean every year. More than 5.25 trillion pieces of garbage are estimated to currently reside in the ocean.

As a group of motivated students that are interested and concerned about the environment, we wanted to make something that would have a positive impact on the environment by combatting litter.

In this project we are trying to combat this by making a product that detects and visualises where clear plastic bottles gathers using AI. We believe that in the end we were able to deliver a product that would be valuable for the municipalities and cleaning services within the Netherlands.

Our product focuses on the detection of plastic bottles, since this makes up for the most harmful litter and takes a long time to decompose, about 400 to 500 years.

## Technologies
We made use of object detection, web application and data science for the realization.

### Software
The web application was built with React/NextJS. <br> NextJS lets you build server-side rendering and static web applications using React. We used TypeScript, as this makes it easy to find type-conflicts and makes building the project more secure as it checks for types.<br>
- https://reactjs.org/
- https://nextjs.org/

We made use of a PostgreSQL database for storing the detection data, along with Prisma, which is an ORM that uses custom Schema Definition Language (SDL), that automatically writes migrations and generates type-safe code in TypeScript.<br>
- https://www.prisma.io/
- https://www.postgresql.org/

For the object detection model we wrote a script in Python that uses the pre-trained YOLOv5 model from [ultralytics](https://github.com/ultralytics/yolov5). The YOLO algorithm employs convolutional neural networks (CNN) to detect objects in real-time. <br>
- https://www.section.io/engineering-education/introduction-to-yolo-algorithm-for-object-detection/
- https://github.com/ultralytics/yolov5 <br>

YOLOv5 is trained on the COCO dataset containing roughly 330,000 images with 80 different labels. <br>
To run the model, we used PyTorch which is an open source machine learning framework to run the object detection on the model. <br>
- https://www.python.org
- https://pytorch.org/

### Hardware
We wrote a dockerfile to push and run the object detection script on the Jetson Xavier, to detect the clear plastic bottles with the on-mounted camera. <br>

A problem we came across when running the object detection model on the Jetson, is to make use of the CUDA (GPU), instead of the CPU when detecting objects.<br> 
You will have to flash your Jetson with a JetPack SDK corresponding with the CUDA version you want to use.<br>

If you want to run CUDA on the Jetson, you could make use of the l4t-pytorch images, containing Pytorch and torchvision pre-installed in a 3.6 Python environment. You will also have to make sure to maintain the correct python library/module versions as some libraries won't work in particular python versions.<br>
- https://catalog.ngc.nvidia.com/orgs/nvidia/containers/l4t-pytorch

### Shared Folders
Video of the final product: https://drive.google.com/drive/folders/1AE9gQe00VmUOt-cTsj99FegoZDUd5Omj?usp=sharing <br>
Documentation: https://drive.google.com/drive/folders/13Hvu0HvZMFe8924iIHaNt1IoE8Jhh-DD?usp=sharing <br>
Dataset: https://app.roboflow.com/k-s/litr-eleku/22 <br>

## Software system
![container-diagram](http://www.plantuml.com/plantuml/png/bL9Daz9043rlVaNBYIs5NDQBfqMWNAomH9BLsbDgacbXS38pDTCXKfR_tHvW5QpouAsxypxwJUS-aF3KjHgcTzLSOuk6Gl9AcKPt4c5BvCAxDFMY7syKRRkw2-WRQuXnuyQsgTF2HFueaDIgJgTtepoEdfPPsef0w7bKJPaXb44_TenDacpol7eggo-Byg7AvX_cZxFXRPBaw8CrmsZn1WPJZS8eim5kzwh10S_ABO93wpH2lxNGH0Xq3hGYTXeFMAGui6bRlRUTaS8VXdKi_879sQ9SZxOeg1LkSFiZkVczrJ0umO22tJIESh51c3YdLID8MHEDroWQWjTG7XmMZLUEuZJtTgya1X1mreMz4a2yPOyrrDxsuRpMXTaEYMCoVR4gEPm9reUezhpALlktLxgdN22Hi8chW1GaeB5QSuyIwWFOUiVr1QIr4dNqlBaq5Kwny2HVHFr7_4xZNU0ykLUX5R1QBqyfoIlSnq16GkyLSHdJlAIBzd_5cTL3MJDtnfzg4OvdocsWZSVYKnQxWgp_XyxF95cZhcRdcv_Ey5bXVmMFXYVO4N2AiXJVM9G3GIEqPhoDNX-BrMFwK9PvyOVqyjx_oplYZzdu-ZB0Ls_RguUnCS8z6id_z2y0%20%22C4_Elements%22)

## References

1. [TACO](http://tacodataset.org/): Open image dataset of waste in the wild. It contains photos of litter taken under diverse environments, from tropical beaches to London streets
2. [PlastOPol](https://zenodo.org/record/5829156#.YrRJ2exBzmE): PlastOPol is a one-class labeled dataset, where all the data corresponds to the “litter” class as its super-category.

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
