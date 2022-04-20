class Detection:
    def __init__(self, objects, detectedAt, lat, lon, picture):
        self.objects = objects
        self.detectedAt = detectedAt
        self.lat = lat
        self.lon = lon
        self.picture = picture

class Object:
    def __init__(self, type, probability, xMin, yMin, xMax, yMax) -> None:
        self.type = type
        self.probability = probability
        self.xMin = xMin
        self.yMin = yMin
        self.xMax = xMax
        self.yMax = yMax