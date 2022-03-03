var express = require('express');
var router = express.Router();

const Message = require('../model/message');

// exports.roomInfo = async function(req, res, next) {
//   // message = {"type": 0, "temperature": 0, "humidity": 0, "timestamp": 0, "turnOnLed": false};
//   console.log( req.body["time_begin"] + " " + req.body["time_end"] );
//   const results = await Message.getRoomInfo(req.body["time_begin"], req.body["time_end"]);
//   if (results != null) {
//     res.statusCode = 200;
//     res.data = { "result": results };
//     res.status(res.statusCode || 200).send({ status: true, response: res.data });
//   }
//   else {
//     res.statusCode = 200;
//     res.data = {  };
//     res.status(res.statusCode || 200).send({ status: true, response: res.data });
//   }
// }

exports.turnOnLed = async function(req, res, next) {
  console.log("turn on led");
  result = await Message.makeTurnOnLedMessage()
  if (result == 1) {
    res.statusCode = 200;
    res.data = { "result": result };
    res.status(res.statusCode || 200).send({ status: true, response: res.data });
  }
  else {
    res.statusCode = 200;
    res.data = {  };
    res.status(res.statusCode || 200).send({ status: true, response: res.data });
  }
}

exports.turnOffLed = async function(req, res, next) {
  console.log("turn off led");
  result = await Message.makeTurnOffLedMessage()
  if (result == 1) {
    res.statusCode = 200;
    res.data = { "result": result };
    res.status(res.statusCode || 200).send({ status: true, response: res.data });
  }
  else {
    res.statusCode = 200;
    res.data = {  };
    res.status(res.statusCode || 200).send({ status: true, response: res.data });
  }
  
}
