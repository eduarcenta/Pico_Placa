var express = require('express');
var app = express();
var checkAllowDrive = require('./checkAllowDrive');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
    let plate = req.body.plateNumber
    let date = req.body.date
    let time = req.body.time
    let checkDrive = checkAllowDrive(plate, date, time)
    let body = {result: checkDrive}
    res.send(body);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});