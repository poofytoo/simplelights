var serialConnection = require('./service');
var serv = new serialConnection();

setTimeout(function(){serv.systemAllOn()}, 2000);