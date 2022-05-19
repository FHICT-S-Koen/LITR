def get_location(ser): 
    try: 
        val = ser.readline().decode().replace('\r\n', '').split(' ')
        return float(val[0]), float(val[1])
    except:
        return 0, 0
