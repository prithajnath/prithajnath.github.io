"use strict";

function IfPrefix(a, b) {
    var isPrefix = true;
    for (var i = 0; i < a.length; i++) {
        if (a[i] != b[i]) {
            isPrefix = false;
            break;
        }
    }
    return isPrefix;
};

function displayOutput(output) {
    var elem = document.createElement("P");
    var text = document.createTextNode(output);
    var terminal = document.getElementById("terminal");
    var bash = document.getElementById("bash");
    var NewTerminal = bash.cloneNode(true);
    document.getElementById("blinker").innerHTML = "";
    document.getElementById("blinker").setAttribute("id", "");
    document.getElementById("input").setAttribute("id", "");
    bash.setAttribute("id", "");
    elem.appendChild(text);
    terminal.appendChild(elem);
    terminal.appendChild(NewTerminal);
    document.getElementById("input").innerHTML = "";
};

function errorMessage(x) {
    displayOutput("bash: " + x.innerHTML + ": command not found");
};

module.exports = {
    errorMessage: errorMessage,
    displayOutput: displayOutput,
    IfPrefix: IfPrefix
};