# potentiometer.py

import serial

# make sure the 'COM#' is set according the Windows Device Manager
def get_location():
    ser = serial.Serial('COM3', 9600, timeout=1)
    val = ser.readline()
    ser.close()
    return val