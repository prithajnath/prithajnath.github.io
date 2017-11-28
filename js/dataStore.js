// Firebase ref
let fb = require('./firebase');

// Info data structure
//let Info = {};
//Files data structure
//let files = [];
// Key mappings data structure
//let KeyCodes = {};

let loadData = async () => {
    try{
        let snapshot = await fb.database().ref().once('value');
        return snapshot.val();
    } catch(err){
        console.log(err);
    }
    
}

let data = loadData();
let Info = data['Info'];
let KeyCodes = data['KeyCodes'];
let files = Object.keys(Info).map((x)=>{return x.replace("_",".")});


// fb.firebase.database().ref().once('value').then(function(snapshot) {
//   let fbaseObj = snapshot.val();
//   for(let i in fbaseObj['Info']){
//       if(fbaseObj['Info'].hasOwnProperty(i)){
//           Info[i.replace("_",".")] = fbaseObj['Info'][i];
//           files.push(i.replace("_","."));
//       }
//   }
  
//   for(let j in fbaseObj['KeyCodes']){
//       if(fbaseObj['KeyCodes'].hasOwnProperty(j)){
//           KeyCodes[j] = fbaseObj['KeyCodes'][j];
//       }
//   }
// }, function(error){
//     console.log("Error occured",error);
// });

module.exports = {
    files: files,
    KeyCodes: KeyCodes,
    Info: Info
}