# jetson nano ubuntu with python base container
# FROM balenalib/jetson-nano-ubuntu-python
FROM nvcr.io/nvidia/l4t-pytorch:r32.6.1-pth1.9-py3

RUN apt-get update
RUN apt-get install -y build-essential python3-pip python3.7 python3-setuptools libfreetype6-dev
RUN python3.7 -m pip install --upgrade pip setuptools wheel
# RUN pip3 install -U pip

# install pika: library for rabbitMQ
RUN python3.7 -m pip install pika opencv-python numpy matplotlib==3.3.0 pandas Pillow PyYAML requests scipy tqdm seaborn

# copy the python code.
COPY main.py main.py

# entrypoint for the python code.
# ENTRYPOINT [ "python3", "-m", "flask", "run", "--host=0.0.0.0", "--port=5000" ]
ENTRYPOINT [ "python3.7", "main.py" ]