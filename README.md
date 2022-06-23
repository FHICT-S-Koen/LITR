# LITR

## About

As we know, litter is terrible for the environment, and about nine tons of litter end up in the ocean every year. More than 5.25 trillion pieces of garbage are estimated to currently reside in the ocean.

As a group of motivated students that are interested and concerned about the environment, we wanted to make something that would have a positive impact on the environment by combatting litter.

In this project we are trying to combat this by making a product that detects and visualises where clear plastic bottles gathers using AI. We believe that in the end we were able to deliver a product that would be valuable for the municipalities and cleaning services within the Netherlands.

Our product focuses on the detection of plastic bottles, since this makes up for the most harmful litter and takes a long time to decompose, about 400 to 500 years.

## Shared Folders
- [Video of the final product](https://drive.google.com/drive/folders/1AE9gQe00VmUOt-cTsj99FegoZDUd5Omj?usp=sharing)
- [Documentation](https://drive.google.com/drive/folders/13Hvu0HvZMFe8924iIHaNt1IoE8Jhh-DD?usp=sharing) 
- [Dataset](https://drive.google.com/drive/folders/10EfykFGg2A3XUdsAD8U7QPi4LKihlV8W?usp=sharing)

## Technologies
We made use of object detection, web application and data science for the realization. <br>

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

### Software
For our software system, we made the following C4-container-diagram, describing what technologies we use and how each container within the system
interacts. <br>

<table>
  <tbody>
    <tr>
    <td>
    Our sensor runs our custom object detection model for detecting plastic bottles, using a base version of the pre-trained model Yolov5. <br><br>
    The data collected by the model will be sent to the API.<br><br>
    API We figured that Next.js would be a great fit, since a Monolithic application is all we need. <br>
    We want to work on a per-municipality basis, so each municipality has their own API/data. <br>
    This also makes deployment much simpler since Next.js acts as a backend that serves the React SPA to the user, which allows for a single deployment workflow. <br><br>
    For our database, we use PostgreSQL with an ORM called Prisma to query our data using our node backend (Next.js). <br><br>
    Prisma includes a cloud based DBMS, which makes it easy to interact with the data in the browser. <br><br>
    Within our single-page-application, we use a JavaScript library called Leaflet (in our case, React Leaflet). <br><br>
    Leaflet allows us to use features like showing grouped markers with litter data on a geographical map. <br>
    </td>
    <td><img src="https://user-images.githubusercontent.com/48807736/175287274-602f7094-67cb-498c-a616-2bf37d210eb9.png"></img></td>
  </tr>
 </tbody>
</table> 



### Hardware
For the sensor, we made the following hardware decisions:
On the Jetson Xavier, which is a computer specialised for running AI models, we run our Python script which contains the object detection model. <br>
When we detect a plastic bottle, we send the data along with the location from the GPS module to our API for displaying the data on our visual heatmap. <br>

![image](https://user-images.githubusercontent.com/48807736/175286686-3c3be4b3-c7f3-48ac-8896-f3fbc425d111.png)

We wrote a dockerfile to push and run the object detection script on the Jetson Xavier, to detect the clear plastic bottles with the on-mounted camera. <br>

A problem we came across when running the object detection model on the Jetson, is to make use of the CUDA (GPU), instead of the CPU when detecting objects.<br> 
You will have to flash your Jetson with a JetPack SDK corresponding with the CUDA version you want to use.<br>

If you want to run CUDA on the Jetson, you could make use of the l4t-pytorch images, containing Pytorch and torchvision pre-installed in a 3.6 Python environment. You will also have to make sure to maintain the correct python library/module versions as some libraries won't work in particular python versions.<br>
- https://catalog.ngc.nvidia.com/orgs/nvidia/containers/l4t-pytorch


## References

1. [TACO](http://tacodataset.org/): Open image dataset of waste in the wild. It contains photos of litter taken under diverse environments, from tropical beaches to London streets
2. [PlastOPol](https://zenodo.org/record/5829156#.YrRJ2exBzmE): PlastOPol is a one-class labeled dataset, where all the data corresponds to the “litter” class as its super-category.

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
