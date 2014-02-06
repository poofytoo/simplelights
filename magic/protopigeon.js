function protoPigeon(debug){
  this.debug = debug;
  
  // Turns all lights in the system on
  this.systemAllOn = function(){
    packet = [254, 0, 0]
    if (debug) console.log(packet)
    return packetToCharArray(packet, calculateParity(packet));
  }
  
  // Turns all lights in the system off
  this.systemAllOff = function(){
    packet = [254, 5, 0]
    if (debug) console.log(packet)
    return packetToCharArray(packet, calculateParity(packet));
  }
  
  // Turns all lights of an address on
  this.addressAllOn = function(addr){
    packet = [254, 6, addr]
    if (debug) console.log(packet)
    return packetToCharArray(packet, calculateParity(packet));
  }
  
  // Turns all lights of an address off
  this.addressAllOff = function(addr){
    packet = [254, 7, addr]
    if (debug) console.log(packet)
    return packetToCharArray(packet, calculateParity(packet));
  }
  
  calculateParity = function(packet){
    count = 0
    for (k in packet){
      byte = packet[k];
      ones = byte.toString(2).match(/1/g);
      if (ones !== null) {
        count += ones.length;
      }
    }
    return count%2;
  }
  
  packetToCharArray = function(packet, parityBit){
    out = '';
    for (k in packet){
      byte = (k == 2) ? packet[k] + 128 * parityBit : packet[k];
      out += String.fromCharCode(byte)
    }
    return out
  }
}

module.exports = protoPigeon;