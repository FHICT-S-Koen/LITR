# FROM nvcr.io/nvidia/l4t-base:r32.6.1
FROM nvcr.io/nvidia/l4t-cuda:10.2.460-runtime

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update
RUN apt install -y cmake libgtk2.0-dev wget python3.8 python3.8-dev python3-pip
# ffmpeg
RUN apt install -y libavcodec-dev libavformat-dev libavutil-dev libswscale-dev libavresample3
# gstreamer
RUN apt install -y libgstreamer-opencv1.0-0 libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev libgstreamer1.0-dev

RUN apt install -y build-essential libfreetype6-dev

RUN python3.8 -m pip install --upgrade pip setuptools
RUN python3.8 -m pip install scikit-build opencv-python pika matplotlib pandas Pillow PyYAML requests scipy tqdm seaborn
RUN python3.8 -m pip install torch==1.8.1 torchvision==0.9.1 -f https://download.pytorch.org/whl/lts/1.8/torch_lts.html

ENV PATH="/usr/local/cuda/bin:${PATH}"
ENV LD_LIBRARY_PATH="/usr/local/cuda/lib64:${LD_LIBRARY_PATH}"
RUN echo "$PATH" && echo "$LD_LIBRARY_PATH"

COPY main.py main.py

ENTRYPOINT [ "python3.8", "main.py" ]