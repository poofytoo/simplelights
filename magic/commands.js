// Command Management System

function commands(service){
  this.s = service;
  this.procedural = false
  
  this.init = function(){
    
  }
  
  this.initSync = function(){
    this.procedural = true;
    this.commandQueue = [];
  }
  
  this.systemAllOff = function(){
    this.s.serialwrite("1")
  }
  
  this.systemAllOn = function(){
    if (this.procedural){
      this.commandQueue.push(this.systemAllOn);
    } else {
      this.s.serialwrite("allOn");
    }
  }
  
  this.sleep = function(){
    if (this.procedural){
      this.commandQueue.push("sleep");
    } else {
      console.log("cannot run sleep in event mode...")
    }
  }
  
  this.loop = function(){
    cq = this.commandQueue;
    functionQueue = [];
    console.log(cq)
    for (i in cq){
      cmd = cq[i]
      console.log("HEYYYYYYYY" + cmd)
      if (cmd !== 'sleep') {
        functionQueue.push(function(){
          var t = cmd
          console.log("thisisnotsupposedtorun" + cmd)
          cmd()
          functionQueue[(i+1)]();
        })
      }
      
    }
    functionQueue[0]();
  }
  
  this.init();
}

module.exports = commands;