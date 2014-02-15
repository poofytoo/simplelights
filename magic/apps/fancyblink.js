/**
* FancyBlink.js
* An example app that does some fancier blinks. 
*
*/

var SerialConnection = require('../lib/service');
var Commands = require('../lib/commands');

var serv = new SerialConnection();    // Establish Serial Connection
var cmd = new Commands(serv);         // Apply Commands to Serial Connection serv

cmd.initSync()      // Initiates Synchronous Command Mode
cmd.steadyValues({0:255});
cmd.sleep(500);
cmd.steadyValues({1:255, 10:255});
cmd.sleep(500);
cmd.steadyValues({9:255, 12:255});
cmd.loop(0)         // Loop 0 More Times
