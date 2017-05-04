// Firebase ref
let fb = require('./firebase');

// Info data structure
let Info = {};
//Files data structure
let files = [];

fb.firebase.database().ref().once('value').then(function(snapshot) {
  let fbaseObj = snapshot.val();
  let infoKeys = Object.keys(fbaseObj['Info']);
  for(let i=0;i<infoKeys.length;i++){
      Info[infoKeys[i].replace("_",".")] = fbaseObj['Info'][infoKeys[i]];
      files.push(infoKeys[i].replace("_","."));
  }
}, function(error){
    console.log("Error occured",error);
});


//Key Mappings
let KeyCodes = {
    81:"q",
    87:"w",
    69:"e",
    82:"r",
    84:"t",
    89:"y",
    85:"u",
    73:"i",
    79:"o",
    80:"p",
    219:"[",
    221:"]",
    220:"\\",
    65:"a",
    83:"s",
    68:"d",
    70:"f",
    71:"g",
    72:"h",
    74:"j",
    75:"k",
    76:"l",
    186:";",
    222:"'",
    90:"z",
    88:"x",
    67:"c",
    86:"v",
    66:"b",
    78:"n",
    77:"m",
    188:",",
    190:".",
    191:"/",
    32:" "
};

module.exports = {
    files: files,
    KeyCodes: KeyCodes,
    Info: Info
}