// Firebase ref
let fb = require('./firebase');
module.exports = fb.firebase.database().ref().once('value');