var SerialPort = require("serialport").SerialPort

function serialConnection() {
  var serialPort = new SerialPort("/dev/tty.usbmodem1411", {
    baudrate: 9600
  });
  
  serialPort.on("open", function () {
    
    serialPort.write('t', function(err, results) {
      // Sent
    });
    
    /*
    serialPort.on('data', function(data) {
      console.log('data received: ' + data);
    });
    */
    
    setInterval(function(){
      serialPort.write('a');
    }, 1000);
  }); 
  
}

module.exports = serialConnection;

/*
var s = require("serialport");

s.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});
*/

/*setTimeout(function(){serialPort.write(0xFF); serialPort.write("\n")},2000);*/

