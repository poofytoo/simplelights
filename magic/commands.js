// Command Management System

function commands(service){
  this.s = service;
  this.procedural = false
  
  this.init = function(){
    
  }
  
  this.initSync = function(){
    this.procedural = true;
    this.commandQueue = [];
    this.sleepQueue = [];
  }
  
  this.systemAllOff = function(){
    if (this.procedural){
      this.commandQueue.push(this.systemAllOff);
    } else {
      this.s.serialwrite("allOff");
    }
  }
  
  this.systemAllOn = function(){
    if (this.procedural){
      this.commandQueue.push(this.systemAllOn);
    } else {
      this.s.serialwrite("allOn");
    }
  }
  
  this.sleep = function(t){
    if (this.procedural){
      this.commandQueue.push("sleep");
      this.sleepQueue.push(t);
    } else {
      console.log("cannot run sleep in event mode...")
    }
  }
  
  this.loop = function(){
    cq = this.commandQueue;
    sleeptimer = 0;
    functionCount = 0;
    functionQueue = [];
    
    function genEvent(curr, next, s) { 
      this.s = s
      return function() { 
        console.log(curr)
        curr();
        next();
      }
    }
     
    function genLastEvent(curr, s) { 
      this.s = s
      return function() { 
        curr();
      }
    }
    
    function genEventWithDelay(curr, next, s, t) { 
      this.s = s
      return function() { 
        curr();
        setTimeout(next, t);
      }
    }
    
    for (i in cq){
      ip = cq.length-1-i;
      cmd = cq[ip]
      if (ip == cq.length-1){
        // Last Function
        // TODO: implement functions for looping params- i.e. infinite loops or 3 loops
        if (true){                
          functionQueue[functionCount] = genLastEvent(cmd, this.s);
          ++functionCount;
        }
      } else if (cmd !== 'sleep') {
        // Any Continuous Function
        if (sleeptimer != 0){
          console.log(sleeptimer)
          functionQueue[functionCount] = 
            genEventWithDelay(cmd, functionQueue[functionCount-1], this.s, sleeptimer)
        } else {
          functionQueue[functionCount] = genEvent(cmd, functionQueue[functionCount-1], this.s)
        }
        ++functionCount;
        sleeptimer = 0;
      } else if (cmd == 'sleep'){
        // Sleep Function
        sleeptimer += this.sleepQueue.pop();
      }
    }
    
    // Start the Function Queue
    setTimeout(functionQueue[functionCount-1], sleeptimer);
  }
  
  this.init();
}

module.exports = commands;