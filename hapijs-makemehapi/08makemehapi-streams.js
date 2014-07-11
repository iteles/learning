//Objective is to stream in a file with the text 'The Pursuit of Hapi-ness'
//and put it through the provided ROT13 function to jumble it up, replying
//with that jumbled up text

var Hapi = require('hapi');
var fs = require('fs');
//var ROT13module = require(__dirname + '/simple-rot13-stream.js');

//I originally had ROT13 in a separate js file and was requiring it as a local module
//however, issues with ROT13 and its implementation meant it couldn't be required and
//had to be added locally, within the same file as the rest of the code
var Stream = require('stream');
var Util = require('util');

//BEGINNING OF ROT13

function ROT13Stream() {
    Stream.Transform.call(this);
}
Util.inherits(ROT13Stream, Stream.Transform);

ROT13Stream.table = {
    A: 'N',
    B: 'O',
    C: 'P',
    D: 'Q',
    E: 'R',
    F: 'S',
    G: 'T',
    H: 'U',
    I: 'V',
    J: 'W',
    K: 'X',
    L: 'Y',
    M: 'Z',
    N: 'A',
    O: 'B',
    P: 'C',
    Q: 'D',
    R: 'E',
    S: 'F',
    T: 'G',
    U: 'H',
    V: 'I',
    W: 'J',
    X: 'K',
    Y: 'L',
    Z: 'M',
    a: 'n',
    b: 'o',
    c: 'p',
    d: 'q',
    e: 'r',
    f: 's',
    g: 't',
    h: 'u',
    i: 'v',
    j: 'w',
    k: 'x',
    l: 'y',
    m: 'z',
    n: 'a',
    o: 'b',
    p: 'c',
    q: 'd',
    r: 'e',
    s: 'f',
    t: 'g',
    u: 'h',
    v: 'i',
    w: 'j',
    x: 'k',
    y: 'l',
    z: 'm'
};

ROT13Stream.prototype._transform = function (data, encoding, callback) {

    encoding = (encoding == 'buffer' ? 'utf8' : encoding);
    data = data.toString(encoding);

    var modified = "";
    var l = data.length;
    for(var i = 0;i<l;i++) {
        if (ROT13Stream.table.hasOwnProperty(data[i])) {
            modified += ROT13Stream.table[data[i]];
        } else {
            modified += data[i];
        }
    }
    this.push(modified, encoding);

    callback();
};
//END OF ROT13

var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080));

server.route({
  method: 'GET',
  path:'/',
  handler: function(request, reply){
    //reads in from stream-text.txt which contains the text 'The Pursuit of Hapi-ness'
    var readStream = fs.createReadStream('./stream-text.txt');

    //implementation of ROT13 as per the instruction in ROT13 file
    //creates an instance of ROT13Stream() which we will use to modify the readStream object
    var rot13 = new ROT13Stream();

    //eliminated '.pipe(process.stdout)' from the end of this (in original instructions)
    //as didn't see a use for it in this particular example
    reply(readStream.pipe(rot13));
  }

});

server.start();
