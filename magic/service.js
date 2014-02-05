var SerialPort = require("serialport").SerialPort

function serialConnection() {
  var serialPort = new SerialPort("/dev/tty.usbmodem1411", {
    baudrate: 9600
  });
  
  serialPort.on('open', function () {
    console.log('serial connection established...');
    serialPort.write('a', function(err, results) {
      console.log('sending hello world byte...');
      if (err != undefined){
        console.log(err);
      }
    });
  }); 
  
  this.sendSimpleCommand = function(){
    serialPort.write('a', function(err, results) {
      if (err != undefined){
        console.log(err);
      }
    });
  }
  
  this.discoverPorts = function(){
    var s = require("serialport");
    s.list(function (err, ports) {
      ports.forEach(function(port) {
        console.log(port.comName + " " + port.manufacturer);
      });
    });
  }
}

module.exports = serialConnection;