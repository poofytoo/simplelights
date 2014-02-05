var serialConnection = require('./service');
var serv = new serialConnection();

serv.discoverPorts()
setTimeout(function(){serv.sendSimpleCommand()}, 2000);