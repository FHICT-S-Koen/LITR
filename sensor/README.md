# Building the dockerfile
```
docker build -t siem228/litr:latest -f ultralytics.Dockerfile .
docker push siem228/litr:latest
```

# Running the container on the Jetson Nano
```
docker pull siem228/litr:latest
```
# Run in a bash to make use of the display 
# !/bin/bash 
```bash 
xhost +local: 

docker run -it --rm --runtime nvidia --network host --device /dev/video0:/dev/video0:mrw -e DISPLAY=$DISPLAY -v /tmp/.X11-unix/:/tmp/.X11-unix siem228/litr/ultralytics:latest
```
