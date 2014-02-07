var SerialConnection = require('./lib/service');
var Commands = require('./lib/commands');

var serv = new SerialConnection();
var cmd = new Commands(serv);

// alternatively, serv.end()

// in reality, cmd.systemAllOn on generates adds a systemAllOn string to the queue. once program reaches 'LOOP', checks queue one by one, and creates functions with functions in itself. each has appropriate timers.



cmd.initSync()
//cmd.sleep(1000)
cmd.systemAllOff()
cmd.addressAllOn(8)
//cmd.sleep(1000)
cmd.addressAllOn(7)
cmd.addressAllOff(8)
cmd.addressAllatValue({5:254})
cmd.end()

// cmd.loop()
// add loop controls
