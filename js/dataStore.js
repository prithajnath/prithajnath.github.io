// Firebase ref
let fb = require('./firebase');

// Info data structure
let Info = {};
//Files data structure
let files = [];
// Key mappings data structure
let KeyCodes = {};

fb.firebase.database().ref().once('value').then(function(snapshot) {
  let fbaseObj = snapshot.val();
  let infoKeys = Object.keys(fbaseObj['Info']);
  let mapKeys = Object.keys(fbaseObj['KeyCodes']);
  for(let i=0;i<infoKeys.length;i++){
      Info[infoKeys[i].replace("_",".")] = fbaseObj['Info'][infoKeys[i]];
      files.push(infoKeys[i].replace("_","."));
  }
  
  for(let j=0;j<mapKeys.length;j++){
      KeyCodes[mapKeys[j]] = fbaseObj['KeyCodes'][mapKeys[j]];
  }
}, function(error){
    console.log("Error occured",error);
});

module.exports = {
    files: files,
    KeyCodes: KeyCodes,
    Info: Info
}