from ast import arguments
from tkinter import *
from sendmessage import MQTTClientInit
from datetime import datetime
import random
import threading
import time
import json
from time import sleep
root = Tk()
import sys

root.title("Tool Check MQTT Server")
root.geometry('640x320')
 
lbl1 = Label(root, text = "Giả lập N IoT Devices gửi đồng thời")
lbl1.grid()
lbl2 = Label(root, text = "Giả lập 1 IoT Devices gửi mỗi Ns")
lbl2.grid()

txt = Entry(root, width=10)
txt.grid(column =1, row =0)
txt2 = Entry(root, width=10)
txt2.grid(column =1, row =1)

flagStop = 1

def thread_function():
    now = datetime.now()
    message = { "temperature": random.randint(0, 60), "humidity": random.randint(20, 120), "time": now.strftime("%H:%M:%S")}
    MQTTClientInit(json.dumps(message))
    time.sleep(2)

def function2():
    now = datetime.now()
    message = { "temperature": random.randint(0, 60), "humidity": random.randint(20, 120), "time": now.strftime("%H:%M:%S")}
    MQTTClientInit(json.dumps(message))

def clicked():
    res = "Giả lập " + txt.get() + " thiết bị gửi đồng thời"
    lbl1.configure(text = res)
    NUM_THREADS = int(txt.get())

    for _ in range(NUM_THREADS):
        x = threading.Thread(target=thread_function)
        x.start()

def clicked2():
    global flagStop
    res = "Giả lập thiết bị gửi mỗi " + txt2.get() + " s"
    lbl2.configure(text = res)
    while True:
        function2()
        time.sleep(int(txt2.get()))

#  Button
btn = Button(root, text = "Start" ,
             fg = "red", command=clicked)
btn.grid(column=2, row=0)
btn2 = Button(root, text = "Start" ,
             fg = "green", command=clicked2)
btn2.grid(column=2, row=1)

root.mainloop()