const mongo = require('../db/connectmgdb')
var md = require('../services/MQTTBroker');
const queueName = "dkled"
// type, temperature, humidity, turnOnLed, timestamp
const mongoose = require("mongoose");

// generate jwt token
// const Message = mongoose.model("Messages", MessageSchema);

exports.getLastestRoomInfo = async () => {
    // MGDB.insertData(""); // test db
    let result = await mongo.selectLastestData();
    return result;
}

exports.makeTurnOnLedMessage = async () => {
    message = "turnOnLed";
    await md.publishMessage(queueName, message);
    return 1;
}

exports.makeTurnOffLedMessage = async () => {
    message = "turnOffLed";
    await md.publishMessage(queueName, message);
    return 1;
}