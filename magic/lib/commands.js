// Command Management System
var ProtoPigeon = require("./protopigeon");
var pigey = new ProtoPigeon()

function commands(service){
  this.s = service;
  this.procedural = false
  
  this.init = function(){
  }
  
  this.initSync = function(){
    this.procedural = true;
    this.commandQueue = [];
  }
  
  // Turn ALL Lights in the system OFF
  this.systemAllOff = function(){
    if (this.procedural){
      this.commandQueue.push([this.systemAllOff]);
    } else {
      this.s.serialwrite(pigey.systemAllOff());
    }
  }
  
  // Turn ALL Lights in the system ON
  this.systemAllOn = function(){
    if (this.procedural){
      this.commandQueue.push([this.systemAllOn]);
    } else {
      this.s.serialwrite(pigey.systemAllOn());
    }
  }
    
  // Turn OFF all lights of a particular address
  this.addressAllOff = function(addr){
    if (this.procedural){
      this.commandQueue.push([this.addressAllOff, addr]);
    } else {
      this.s.serialwrite(pigey.addressAllOff(addr));
    }
  }
  
  // Turn ON all lights of a particular address
  this.addressAllOn = function(addr){
    if (this.procedural){
      this.commandQueue.push([this.addressAllOn, addr]);
    } else {
      this.s.serialwrite(pigey.addressAllOn(addr));
    }
  }
  
  // Turn all lights of an address to a VALUE
  this.addressAllatValue = function(data){
    if (this.procedural){
      this.commandQueue.push([this.addressAllatValue, data]);
    } else {
      this.s.serialwrite(pigey.addressAllatValue(data));
    }
  }
  
  // In Synchronous mode, delays the next event by t milliseconds
  this.sleep = function(t){
    if (this.procedural){
      this.commandQueue.push(["sleep", t]);
    } else {
      console.log("cannot run sleep in event mode...")
    }
  }
  
  this.end = function(){
    cq = this.commandQueue;
    sleeptimer = 0;
    functionCount = 0;
    functionQueue = [];
    
    function genEvent(curr, next, s, data) { 
      this.s = s
      return function() { 
        curr(data);
        next();
      }
    }
     
    function genLastEvent(curr, s, data, context) { 
      this.s = s
      return function() { 
        curr(data);
        context.end();
      }
    }
    
    function genEventWithDelay(curr, next, s, t, data) { 
      this.s = s
      return function() { 
        curr(data);
        setTimeout(next, t);
      }
    }
    
    for (i in cq){
      ip = cq.length-1-i;
      cmd = cq[ip][0]
      if (cq[ip].length > 1){
        data = cq[ip][1]
      }
      if (ip == cq.length-1){
        // Last Function
        // TODO: implement functions for looping params- i.e. infinite loops or 3 loops
        if (true){                
          functionQueue[functionCount] = genLastEvent(cmd, this.s, data, this);
          ++functionCount;
        }
      } else if (cmd !== 'sleep') {
        // Any Continuous Function
        if (sleeptimer != 0){
          functionQueue[functionCount] = 
            genEventWithDelay(cmd, functionQueue[functionCount-1], this.s, sleeptimer, data)
        } else {
          functionQueue[functionCount] = genEvent(cmd, functionQueue[functionCount-1], this.s, data)
        }
        ++functionCount;
        sleeptimer = 0;
      } else if (cmd == 'sleep'){
        // Sleep Function
        sleeptimer += data;
      }
    }
    
    // Start the Function Queue
    setTimeout(functionQueue[functionCount-1], sleeptimer);
  }
  
  this.init();
}

module.exports = commands;