var SerialPort = require("serialport").SerialPort
var ProtoPigeon = require("./protopigeon");
var events = require('events');
var eventEmitter = new events.EventEmitter();

function serialConnection() {
  var CONNECTION_PORT = "/dev/tty.usbmodem1411"
  var pigeon = new ProtoPigeon();  
  var portFound = false;
  
  this.init = function(){
    discoverPorts = function(){
      var s = require("serialport");
      s.list(function (err, ports) {
        ports.forEach(function(port) {
          if (port.comName.replace("cu","") == CONNECTION_PORT.replace("tty","")){
            console.log('port verified, serialHelloConnect');
            eventEmitter.emit('serialHelloConnect');
            portFound = true;
          }
        });
        if (!portFound){
          console.log('port not found - defaulting to debug mode');
        }
      });
    }
    
    serialHelloConnect = function(){
      var serialPort = new SerialPort(CONNECTION_PORT, {
        baudrate: 9600
      });
      serialPort.on('open', function (err) {
        console.log('serial connection established...');
        serialPort.write('a', function(err, results) {
          console.log('sending hello world byte...');
          if (err != undefined){
            console.log(err);
          }
        });
      }); 
    }
    
    eventEmitter.on('serialHelloConnect', serialHelloConnect);
    discoverPorts();
    
    pigeon.systemAllOn();
  }
  
  this.systemAllOff = function(){
    serialwrite(pigeon.systemAllOff())
  }
  
  this.systemAllOn = function(){
    serialwrite(pigeon.systemAllOn())
  }
  
  serialwrite = function(data){
    if (portFound){
      serialPort.write(data, function(err, results) {
        if (err != undefined){
          console.log(err);
        }
      });
    } else {
      console.log(data);
    }
  }
  
  this.init();
}

module.exports = serialConnection;