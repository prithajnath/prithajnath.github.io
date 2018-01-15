let firebase = require("firebase");
// Initialize Firebase
var config = {
apiKey: "AIzaSyAT4U565uMNqK_m42ytkXrULxEoBus2UnM",
authDomain: "prithajnathgithubio.firebaseapp.com",
databaseURL: "https://prithajnathgithubio.firebaseio.com", /*production*/
//databaseURL:"https://prithajnathgithubio-dev.firebaseio.com", /*development*/
projectId: "prithajnathgithubio",
storageBucket: "prithajnathgithubio.appspot.com",
messagingSenderId: "543835991499"
};
let app = firebase.initializeApp(config);

module.exports = {
    firebase: app
}