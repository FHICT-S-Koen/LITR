import serial

# make sure the 'COM#' is set according the Windows Device Manager
def get_location(): #//TODO: fix, (currently return default values, eventually we want to return the actual location)
    # ser = serial.Serial('COM3', 9600, timeout=1)
    # val = ser.readline()
    # ser.close()
    # return val
    return 0, 0