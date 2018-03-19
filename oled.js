process.hrtime = require('browser-process-hrtime');
var webusbSerialPort = require('webusb-serial').SerialPort;
var firmata = require('firmata');
var ioOptions = {reportVersionTimeout: 1, samplingInterval: 300, skipCapabilities: true, };
var five = require('johnny-five');
var Oled  = require('oled-js');
var font = require('oled-font-5x7');

//create the webusb serialport and optionally specify a USB filter
var serialPort = new webusbSerialPort({
  filters: [
    //{ 'vendorId': 0x2341, 'productId': 0x804e }
    { 'vendorId': 0x239a, 'productId': 0x800c }
  ]
});

serialPort.on('open', () => console.log('device opened'));
serialPort.on('emit', (msg) => console.log(msg));
serialPort.on('error', (msg) => console.log(msg));
serialPort.on('data', (msg) => console.log(msg));
//use the virtual serial port to send a command to a firmata device
var io = new firmata.Board(serialPort, ioOptions );

var board = new five.Board({io, repl: false, timeout: 30000});
board.on("ready", function() {
  //var led = new five.Led(13);
  //led.blink(500);

  var opts = {
    width: 128,
    height: 64,
    address: 0x3D,
    resetPin: 12 
  };

  var screen = new Oled(board, five, opts);
  screen.clearDisplay();
  screen.update();
//  oled.setCursor(1, 1);
 // oled.writeString(font, 1, 'Hello webUSB', 1, true, 2);
 document.getElementById('sendWebUSB').addEventListener('click', () => {
   encodeBitmap();
    screen.buffer = oledbytearray;
    screen.update();  
 });
});
