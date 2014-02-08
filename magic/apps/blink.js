/**
* Blink.js
* An example app that 'blinks' all the lights 4 times. 
*
*/

var SerialConnection = require('../lib/service');
var Commands = require('../lib/commands');

var serv = new SerialConnection();    // Establish Serial Connection
var cmd = new Commands(serv);         // Apply Commands to Serial Connection serv

cmd.initSync()      // Initiates Synchronous Command Mode
cmd.sleep(1000)     // Wait 1 Second
cmd.systemAllOn()   // Turns every light on
cmd.sleep(1000)     // Wait 1 Second
cmd.systemAllOff()  // Turn every light off
cmd.loop(4)         // Loop 4 More Times