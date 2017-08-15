#!/usr/bin/python
# coding: utf-8


import cv2.cv as cv
import cv2 as cv2
import time
import numpy as np
import sys
from picamera.array import PiRGBArray
from picamera import PiCamera


#import RPi.GPIO as gpio


#green tape
Hmin = 40
Hmax = 80
Smin = 100
Smax = 255
Vmin = 100
Vmax = 255

 # Cria-se um array de valores HSV(mínimo e máximo)
rangeMin = np.array([Hmin, Smin, Vmin], np.uint8)
rangeMax = np.array([Hmax, Smax, Vmax], np.uint8)

# Área mínima á ser detectada
minArea = 50

def main():
#    capture = cv2.VideoCapture(0)
#    capture = PiCamera()
    # Parametros do tamannho da imagem de captura
    camera = PiCamera()
    camera.resolution = (320, 240)
    camera.framerate = 10
    rawCapture = PiRGBArray(camera, size=(320, 240))

    time.sleep(0.1)

    # capture frames from the camera
    for frame in camera.capture_continuous(rawCapture, format="bgr", use_video_port=True):
        # grab the raw NumPy array representing the image, then initialize the timestamp
        # and occupied/unoccupied text
        image = frame.array
        imgHSV = cv2.cvtColor(image,cv2.cv.CV_BGR2HSV)
        imgThresh = cv2.inRange(imgHSV, rangeMin, rangeMax)
        imgErode = cv2.erode(imgThresh, None, iterations = 3)
        moments = cv2.moments(imgErode, True)
        if moments['m00'] >= minArea:
            x = moments['m10'] / moments['m00']
            y = moments['m01'] / moments['m00']
            #print(x, ", ", y)
            #sets size of cirlce.. can use this to determine stuff.
            cv2.circle(image, (int(x), int(y)), 25, (0, 255, 0), -1)
            #print("x: ", x, "y: ", y)
            print (x, y)
            sys.stdout.flush()
                                                                                                                
        # show the frame
        cv2.imshow("Frame", image)
        cv2.imshow("HSV", imgHSV)
        cv2.imshow("Thre", imgThresh)
        cv2.imshow("Erosao", imgErode)
        key = cv2.waitKey(1) & 0xFF

        
        # clear the stream in preparation for the next frame
        rawCapture.truncate(0)
    
    
    # Definir um tamanho para os frames (descartando o PyramidDown
#    if capture.isOpened():
#      capture.set(cv2.cv.CV_CAP_PROP_FRAME_WIDTH, width)
#      capture.set(cv2.cv.CV_CAP_PROP_FRAME_HEIGHT, height)


#    while True:
#        ret, entrada = capture.read()
#        imgHSV = cv2.cvtColor(entrada,cv2.cv.CV_BGR2HSV)
#        imgThresh = cv2.inRange(imgHSV, rangeMin, rangeMax)
#        imgErode = cv2.erode(imgThresh, None, iterations = 3)
#        moments = cv2.moments(imgErode, True)
#        if moments['m00'] >= minArea:
#           x = moments['m10'] / moments['m00']
#           y = moments['m01'] / moments['m00']
           #print(x, ", ", y)
           #sets size of cirlce.. can use this to determine stuff.
#           cv2.circle(entrada, (int(x), int(y)), 50, (0, 255, 0), -1)
           #lines_sum = x
           #print("x: ", x, "y: ", y)
#           print (x, y)
#           sys.stdout.flush()

#        cv2.imshow("Entrada",entrada)
#        cv2.imshow("HSV", imgHSV)
#        cv2.imshow("Thre", imgThresh)
#        cv2.imshow("Erosao", imgErode)

#        if cv.WaitKey(10) == 27:
#            break
#    cv.DestroyAllWindows()


if __name__ == '__main__':
    main()
