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
  for(let i in fbaseObj['Info']){
      if(fbaseObj['Info'].hasOwnProperty(i)){
          Info[i.replace("_",".")] = fbaseObj['Info'][i];
          files.push(i.replace("_","."));
      }
  }
  
  for(let j in fbaseObj['KeyCodes']){
      if(fbaseObj['KeyCodes'].hasOwnProperty(j)){
          KeyCodes[j] = fbaseObj['KeyCodes'][j];
      }
  }
}, function(error){
    console.log("Error occured",error);
});

module.exports = {
    files: files,
    KeyCodes: KeyCodes,
    Info: Info
}