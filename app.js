var SerialPort = require("serialport").SerialPort

var serialPort = new SerialPort("/dev/tty.usbmodem1411", {
  baudrate: 9600
});

serialPort.on("open", function () {
  console.log('open');
  
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
    
    serialPort.write('t', function(err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
      
      //serialPort.write("hey");
      
    });
  
  });
  
});

var s = require("serialport");

s.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});

setTimeout(function(){serialPort.write(0xFF); serialPort.write("\n")},2000);