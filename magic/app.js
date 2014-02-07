var serialConnection = require('./service');
var serv = new serialConnection();
var Commands = require('./commands')

cmd = new Commands(serv);

// cmd.init()
// cmd.systemAllOn()
// cmd.addressAllOff(10)
// cmd.sleep(100)

// cmd.initSync()
// cmd.loop(1,2,etc)

// alternatively, serv.end()

// in reality, cmd.systemAllOn on generates adds a systemAllOn string to the queue. once program reaches 'LOOP', checks queue one by one, and creates functions with functions in itself. each has appropriate timers.

cmd.initSync()
cmd.sleep(2000)
cmd.systemAllOn()
cmd.sleep(1000)
cmd.systemAllOff()
cmd.addressAllOn(8)
cmd.sleep(1000)
cmd.addressAllOn(7)
cmd.addressAllOff(8)
cmd.end()

//holy fucking shit it works
//add loop controls