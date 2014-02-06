var serialConnection = require('./service');
var serv = new serialConnection();

serv.turnAllTheFuckOn();
setTimeout(function(){serv.sendSimpleCommand('a')}, 2000);