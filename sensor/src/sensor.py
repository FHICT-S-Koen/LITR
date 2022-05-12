import serial

# make sure the 'COM#' is set according the Windows Device Manager
def get_location(): 
    try: 
        ser = serial.Serial('COM3', 9600, timeout=1)
        val = ser.readline().split(' ')
        ser.close()
        return int(val[0]), int(val[1])
    except:
        return 0, 0
