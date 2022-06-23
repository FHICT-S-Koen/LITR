# LITR

## About

As we know, litter is terrible for the environment, and about nine tons of litter end up in the ocean every year. Also, more than 5.25 trillion pieces of garbage are estimated to currently reside in the ocean.

As a group of motivated students that are interested and concerned about the environment, we wanted to make something that would have a positive impact on the environment by combatting litter.

In this project we are trying to combat this by making a product that detects and visualises where clear plastic bottles gather using AI.
We believe that in the end we were able to deliver a product that would be valuable for the municipalities and cleaning services within the Netherlands.
A video of the final product can be seen here : https://drive.google.com/drive/folders/1AE9gQe00VmUOt-cTsj99FegoZDUd5Omj?usp=sharing

We used YoloV5 to detect bottles.
The Jetson AGX Xavier is used to run the model outside.
Furthermore we used a Serial GPS module connected to the Arduino UNO and a camera mounted on the Jetson Xavier, to retrieve the location and frames data. 

Documentation: https://drive.google.com/drive/folders/13Hvu0HvZMFe8924iIHaNt1IoE8Jhh-DD?usp=sharing

Dataset: https://app.roboflow.com/k-s/litr-eleku/22

## Software system
![container-diagram](http://www.plantuml.com/plantuml/png/bL9Daz9043rlVaNBYIs5NDQBfqMWNAomH9BLsbDgacbXS38pDTCXKfR_tHvW5QpouAsxypxwJUS-aF3KjHgcTzLSOuk6Gl9AcKPt4c5BvCAxDFMY7syKRRkw2-WRQuXnuyQsgTF2HFueaDIgJgTtepoEdfPPsef0w7bKJPaXb44_TenDacpol7eggo-Byg7AvX_cZxFXRPBaw8CrmsZn1WPJZS8eim5kzwh10S_ABO93wpH2lxNGH0Xq3hGYTXeFMAGui6bRlRUTaS8VXdKi_879sQ9SZxOeg1LkSFiZkVczrJ0umO22tJIESh51c3YdLID8MHEDroWQWjTG7XmMZLUEuZJtTgya1X1mreMz4a2yPOyrrDxsuRpMXTaEYMCoVR4gEPm9reUezhpALlktLxgdN22Hi8chW1GaeB5QSuyIwWFOUiVr1QIr4dNqlBaq5Kwny2HVHFr7_4xZNU0ykLUX5R1QBqyfoIlSnq16GkyLSHdJlAIBzd_5cTL3MJDtnfzg4OvdocsWZSVYKnQxWgp_XyxF95cZhcRdcv_Ey5bXVmMFXYVO4N2AiXJVM9G3GIEqPhoDNX-BrMFwK9PvyOVqyjx_oplYZzdu-ZB0Ls_RguUnCS8z6id_z2y0%20%22C4_Elements%22)

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
