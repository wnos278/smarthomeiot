import paho.mqtt.client as mqtt


# TODO: 1Threads So much message

def MQTTClientInit(message):

    flag = 0
    def on_connect(client, userdata, flags, rc):
        print("Connected with result code \n" + str(rc))
        client.subscribe('homeinfo')
        # Publish
        client.publish('homeinfo', message, 0, False)

    def on_message(client, userdata, msg):
        global flag
        print(msg.topic + " " + str(msg.payload))
        client.disconnect()

    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message
    client.username_pw_set(username="admin", password="admin")

    client.connect("localhost", 1883, 60)

    client.loop_forever()


