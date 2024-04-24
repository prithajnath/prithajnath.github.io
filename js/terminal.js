require("babel-core/register");
require("babel-polyfill");

// loading data with Promise
var dStore = {};
require("./dataStore.js").then((x) => {
  dStore = x.val();
  dStore["files"] = Object.keys(dStore["Info"]).map((x) => x.replace("_", "."));
});

let func = require("./functions.js");
let cmds = require("./commands.js");
let $ = require("jquery");

// global path variable
path = "/"; /*global path*/
current_dir = "/"; /*global current_dir*/

// Command caching
let commandStack = [];
let commandIndex = 0;

// Auto completetion
let autoCompleteCache = [];
let autoCompleteCount = 0;

document.addEventListener("keydown", function (event) {
  let x = document.getElementById("input");
  let key = event.keyCode;
  // Enter key
  if (key === 13) {
    if (cmds.commands[x.innerHTML.split(" ")[0]] != undefined) {
      cmds.commands[x.innerHTML.split(" ")[0]](x.innerHTML);
      if (x.innerHTML != "") {
        commandStack.push(x.innerHTML);
      } else {
        commandStack.push("clear");
      }
      commandIndex = commandStack.length;
    } else if (x.innerHTML.split(" ")[0] === "") {
      func.displayOutput("");
    } else {
      func.errorMessage(x);
    }
    autoCompleteCache = [];
    autoCompleteCount = 0;

    // scrolling
    if (
      document.body.scrollHeight -
        document.getElementById("terminal").offsetHeight <
      300
    ) {
      $("html, body").animate(
        { scrollTop: $(document).height() - $(window).height() },
        60
      );
    }

    func.saveCurrentTerminal();
  }

  // Up arrow key
  if (key === 38) {
    event.preventDefault();
    if (commandIndex - 1 >= 0) {
      commandIndex -= 1;
      x.innerHTML = commandStack[commandIndex];
    }
  }
  // Down arrow key
  if (key === 40) {
    if (commandIndex + 1 < commandStack.length) {
      commandIndex += 1;
      x.innerHTML = commandStack[commandIndex];
    } else if (commandIndex === commandStack.length - 1) {
      x.innerHTML = "";
      commandIndex += 1;
    }
  }
  // Backspace key
  if (key === 8) {
    event.preventDefault();
    x.innerHTML = x.innerHTML.slice(0, x.innerHTML.length - 1);
  } else if (dStore.KeyCodes[key] != undefined) {
    x.innerHTML = x.innerHTML + dStore.KeyCodes[key];
  }
  // Tab key
  if (key === 9) {
    event.preventDefault();
    let inputArray = x.innerHTML.split(" ");
    console.log(inputArray);
    console.log(func.checkIfArgs(inputArray));
    if (func.checkIfArgs(inputArray)) {
      var [command, arg, file] = inputArray;
    } else {
      var [command, file] = inputArray;
      var arg = "";
    }
    console.log(file);
    //let command = x.innerHTML.split(" ")[0];
    //let file = x.innerHTML.split(" ").slice(-1)[0];
    let files = Object.keys(func.getContext(dStore["Info"])).map((x) =>
      x.replace("_", ".")
    );
    if (autoCompleteCache.length === 0) {
      for (let i = 0; i < files.length; i++) {
        if (func.IfPrefix(file, files[i])) {
          autoCompleteCache.push(files[i]);
        }
      }
    }
    if (autoCompleteCache[autoCompleteCount]) {
      x.innerHTML = arg
        ? command + " " + arg + " " + autoCompleteCache[autoCompleteCount]
        : command + " " + autoCompleteCache[autoCompleteCount];
      autoCompleteCount = (autoCompleteCount + 1) % autoCompleteCache.length;
    }
  }
});

document.getElementById("bulb").addEventListener("click", func.changeColor);
document.addEventListener("DOMContentLoaded", function (e) {
  // Check LS for dark mode settings
  const btnColor = localStorage.getItem("bulb");
  const bgColor = localStorage.getItem("bgColor");
  const bg = localStorage.getItem("bg");
  func.changeColor(bg, bgColor, btnColor);

  // Check LS for previous state
  const lastTerminalState = localStorage.getItem("lastTerminalState");
  if (lastTerminalState !== null) {
    document.querySelector("#terminal").innerHTML = lastTerminalState;
  }
  const lastTerminalPath = localStorage.getItem("lastTerminalPath");
  if (lastTerminalPath !== null) {
    path = lastTerminalPath;
  }
  const lastTerminalCurrentDir = localStorage.getItem("lastTerminalCurrentDir");
  if (lastTerminalCurrentDir !== null) {
    current_dir = lastTerminalCurrentDir;
  }
});
