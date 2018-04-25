const express = require('express');
const request = require('request');
const moment = require("moment");
var app = express();


app.listen(3000 , () => {
  console.log("started");
})

var startedTime = Date.now();
var wait;
var startTime;
console.log(moment(startedTime).format('LT'))
getRandomTime();
function getRandomTime() {
  wait = Math.round(Math.random()*86400*1000);
  startTime = Date.now();

  while (moment(Date.now() + wait).toObject().hours > 20 - 4 || moment(Date.now() + wait).toObject().hours < 5 - 4){
    wait = Math.round(Math.random()*86400*1000);
  }

}
  console.log(moment(startTime + wait).format('LT'));
  setInterval(function(){
    if (Date.now() > startTime + wait) {
      console.log("message sent");
      sendPushNotification();
      getRandomTime();
    }
    else {
      console.log("it isn't time " + moment(startTime + wait).format('LT'))
    }
  }, 5000)



function sendPushNotification() {
  request.post(
    'https://pushmeapi.jagcesar.se',
    { json: { title: 'Take a picture of something', identifier: 'fdmnvxsrhgtmpsyw0y8e0oo1snraoefkhyoxexoed74cn9lcifj6lr0ln05pqecf' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    })
}
