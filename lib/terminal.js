"use strict";

var dStore = require("./dataStore.js");
var func = require("./functions.js");
var cmds = require("./commands.js");

//command caching
var commandStack = [];
var commandIndex = 0;

//AUto completetion
var autoCompleteCache = [];
var autoCompleteCount = 0;

document.addEventListener('keydown', function (event) {
    var x = document.getElementById("input");
    var key = event.keyCode;
    if (key == 13) {
        if (cmds.commands[x.innerHTML.split(" ")[0]] != undefined) {
            cmds.commands[x.innerHTML.split(" ")[0]](x.innerHTML);
            if (x.innerHTML != "") {
                commandStack.push(x.innerHTML);
            } else {
                commandStack.push("clear");
            }
            commandIndex = commandStack.length;
        } else if (x.innerHTML.split(" ")[0] == "") {
            func.displayOutput("");
        } else {
            func.errorMessage(x);
        }

        autoCompleteCache = [];
        autoCompleteCount = 0;
    }

    if (key == 38) {
        if (commandIndex - 1 >= 0) {
            commandIndex -= 1;
            x.innerHTML = commandStack[commandIndex];
        }
    }
    if (key == 40) {
        if (commandIndex + 1 < commandStack.length) {
            commandIndex += 1;
            x.innerHTML = commandStack[commandIndex];
        } else if (commandIndex == commandStack.length - 1) {
            x.innerHTML = "";
            commandIndex += 1;
        }
    }
    if (key == 8) {
        event.preventDefault();
        x.innerHTML = x.innerHTML.slice(0, x.innerHTML.length - 1);
    } else if (dStore.KeyCodes[key] != undefined) {
        x.innerHTML = x.innerHTML + dStore.KeyCodes[key];
    }
    if (key == 9) {
        event.preventDefault();
        var command = x.innerHTML.split(" ")[0];
        var file = x.innerHTML.split(" ")[1];
        if (autoCompleteCache.length == 0) {
            for (var i = 0; i < dStore.files.length; i++) {
                if (func.IfPrefix(file, dStore.files[i])) {
                    //x.innerHTML = command +" "+files[i];
                    //break;
                    autoCompleteCache.push(dStore.files[i]);
                }
            }
        }

        x.innerHTML = command + " " + autoCompleteCache[autoCompleteCount];
        autoCompleteCount = (autoCompleteCount + 1) % autoCompleteCache.length;
    }
});