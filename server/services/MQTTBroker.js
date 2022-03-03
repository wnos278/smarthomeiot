const mqtt = require('mqtt')
const mongo = require('../db/connectmgdb')
const host = 'localhost'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 6000,
    username: 'admin',
    password: 'admin',
    reconnectPeriod: 1000,
})


client.on('connect', () => {
    console.log('Connected')
    client.subscribe(['dkled'], () => {
        console.log(`Subscribe to topic \'dkled\'`)
    })
    client.subscribe(['homeinfo'], () => {
        console.log(`Subscribe to topic \'homeinfo\'`)
    })
})

// Receive something from broker
client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
    if (topic !== 'dkled')
        mongo.insertData(JSON.parse(payload.toString()));
})

exports.publishMessage = async (topic, data) => {
    if (topic == null)
        topic = 'dkled';

    client.publish(topic, data, { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
    })
}
