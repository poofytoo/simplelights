function protoPigeon(debug){
  this.debug = debug;
  
  // Turns all lights in the system off
  this.systemAllOff = function(){
    packet = [254, 0, 0]
    if (debug) console.log(packet)
    return packetToCharArray(packet, calculateParity(packet));
  }
  
  // Turns all lights in the system on
  this.systemAllOn = function(){
    packet = [254, 5, 0]
    if (debug) console.log(packet)
    return packetToCharArray(packet, calculateParity(packet));
  }
  
  // Turns all lights of an address off
  this.addressAllOff = function(addr){
    packet = [254, 6, addr]
    if (debug) console.log(packet)
    return packetToCharArray(packet, calculateParity(packet));
  }
  
  // Turns all lights of an address on
  this.addressAllOn = function(addr){
    packet = [254, 7, addr]
    if (debug) console.log(packet)
    return packetToCharArray(packet, calculateParity(packet));
  }
  
  // Turns all lights of an address to VALUE
  this.addressAllatValue = function(data){
    addr = Object.keys(data)[0]
    value = data[addr]
    packet = [254, 8, parseInt(addr), parseInt(value)]
    if (debug) console.log(packet)
    return packetToCharArray(packet, calculateParity(packet));
  }
  
  // Turns every light of an address to a specific VALUE
  this.steadyValues = function(data){
    var strandBytes = [0, 0];
    var strandUnits = Object.keys(data).sort();
    var dataBytes = [];
    for (strand in strandUnits){
      bitmaskByte = + (strandUnits[strand] >= 8);
      strandBytes[bitmaskByte] += Math.pow(2, (strandUnits[strand] % 8));
      dataBytes.push(data[strandUnits[strand]]);
    }
    if (strandBytes[0] != 0 && strandBytes[1] != 0){
      // Send cmd 0x10
      var packet = [254, 8, 16].concat(strandBytes).concat(dataBytes);
    } else if (strandBytes[1] == 0){
      // Send cmd 0x11
      var packet = [254, 8, 17, strandBytes[0]].concat(dataBytes);
    } else {
      // Send cmd 0x12
      var packet = [254, 8, 18, strandBytes[1]].concat(dataBytes);
    }
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
    console.log(packet)
    out = '';
    for (k in packet){
      byte = (k == 2) ? packet[k] + 128 * parityBit : packet[k];
      out += String.fromCharCode(byte)
    }
    return out
  }
}

module.exports = protoPigeon;