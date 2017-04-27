"use strict";

var func = require("./functions");
var dStore = require("./dataStore");

var commands = {
    "ls": function ls(x) {
        if (x.replace(" ", "") == "ls") {
            func.displayOutput("about.txt education.txt  experience.txt languages.txt frameworks.txt\n        vcs.txt aws.txt contact.txt");
        } else {
            func.errorMessage(x);
        }
    },
    "clear": function clear(x) {
        var terminal = document.getElementById("terminal");
        var bash = document.getElementById("bash");
        terminal.innerHTML = "";
        terminal.appendChild(bash);
        document.getElementById("input").innerHTML = "";
    },
    "cat": function cat(x) {
        var info = x.replace("cat ", "");
        func.displayOutput(dStore.Info[info]);
    },
    "echo": function echo(x) {
        var data = x.replace("echo ", "");
        func.displayOutput(data);
    },
    "help": function help(x) {
        var commandList = Object.keys(commands);
        var data = "Try these commands to find out more about me: ";
        for (var i = 0; i < commandList.length; i++) {
            data += commandList[i] + ", ";
        }
        func.displayOutput(data.slice(0, data.length - 2));
    }

};

module.exports = {
    commands: commands
};