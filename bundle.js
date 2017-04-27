(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let func = require("./functions");
let dStore = require("./dataStore");


let commands = {
    "ls":(x)=>{
        if(x.replace(" ","")=="ls"){
            func.displayOutput(`about.txt education.txt  experience.txt languages.txt frameworks.txt
        vcs.txt aws.txt contact.txt`);
        }else{
            func.errorMessage(x);
        }
        
    },
    "clear":(x)=>{
        let terminal = document.getElementById("terminal");
        let bash = document.getElementById("bash");
        terminal.innerHTML = "";
        terminal.appendChild(bash);
        document.getElementById("input").innerHTML = "";
    },
    "cat":(x)=>{
        let info = x.replace("cat ","");
        func.displayOutput(dStore.Info[info]);
    },
    "echo":(x)=>{
        let data = x.replace("echo ","");
        func.displayOutput(data);
    },
    "help":(x)=>{
        let commandList = Object.keys(commands);
        let data = "Try these commands to find out more about me: ";
        for(let i=0;i<commandList.length;i++){
            data += commandList[i] + ", "
        }
        func.displayOutput(data.slice(0,data.length-2));
    }
    
}

module.exports = {
    commands: commands
}

},{"./dataStore":2,"./functions":3}],2:[function(require,module,exports){
//files
let files = ["about.txt" ,"education.txt"  ,"experience.txt", "languages.txt", "frameworks.txt",
        "vcs.txt", "aws.txt", "contact.txt"];

//Info
let Info = {
    "about.txt":`I am Prithaj, a CS student at SUNY Plattsburgh. I love web development and dank
    memes`,
    "education.txt":"Computer Science,BS, SUNY Plattsburgh",
    "experience.txt":"Jr. Web Developer, End Point Corp: May - Aug 2016",
    "languages.txt":"Python,Ruby,HTML,CSS and JavaScript",
    "frameworks.txt":"Ruby on Rails,Django,Bootstrap,JQuery,ReactJS,NodeJS,paper.js",
    "aws.txt":"Lambda,Certificate Manager,Route53",
    "vcs.txt":"Git",
    "contact.txt":"Email: prithajnath@gmail.com, Twitter:@prithajnath"
}

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
},{}],3:[function(require,module,exports){
function IfPrefix(a,b){
    let isPrefix=true;
    for(let i=0;i<a.length;i++){
        if(a[i]!=b[i]){
            isPrefix=false;
            break;
        }
        
    }
     return isPrefix;
};


function displayOutput(output){
    let elem = document.createElement("P");
    let text = document.createTextNode(output);
    let terminal = document.getElementById("terminal");
    let bash = document.getElementById("bash");
    let NewTerminal = bash.cloneNode(true);
    document.getElementById("blinker").innerHTML = "";
    document.getElementById("blinker").setAttribute("id","");
    document.getElementById("input").setAttribute("id","");
    bash.setAttribute("id","");
    elem.appendChild(text);
    terminal.appendChild(elem);
    terminal.appendChild(NewTerminal);
    document.getElementById("input").innerHTML = "";
};
    

function errorMessage(x){
    displayOutput("bash: "+x.innerHTML+": command not found");
};

module.exports = {
    errorMessage: errorMessage,
    displayOutput: displayOutput,
    IfPrefix: IfPrefix
}
},{}],4:[function(require,module,exports){
let dStore = require("./dataStore.js");
let func = require("./functions.js");
let cmds = require("./commands.js");

//command caching
let commandStack = [];
let commandIndex = 0;

//AUto completetion
let autoCompleteCache = [];
let autoCompleteCount = 0;

document.addEventListener('keydown', function(event) {
     let x = document.getElementById("input");
     let key = event.keyCode;
     if(key == 13){
         if (cmds.commands[x.innerHTML.split(" ")[0]]!=undefined){
             cmds.commands[x.innerHTML.split(" ")[0]](x.innerHTML);
             if(x.innerHTML!=""){
                 commandStack.push(x.innerHTML);
             }else{
                 commandStack.push("clear");
             }
             commandIndex = commandStack.length;
         }else if(x.innerHTML.split(" ")[0]==""){
             func.displayOutput("");
         }
         else{
             func.errorMessage(x);
         }
         
         autoCompleteCache = [];
         autoCompleteCount = 0;
         
     }
     
     if(key == 38){
         if(commandIndex-1>=0){
             commandIndex -=1;
             x.innerHTML = commandStack[commandIndex];
         }
     }
     if(key == 40){
         if(commandIndex+1<commandStack.length){
             commandIndex +=1;
             x.innerHTML = commandStack[commandIndex];
         }else if(commandIndex==commandStack.length-1){
             x.innerHTML = "";
             commandIndex +=1;
         }
     }
     if(key == 8){
         event.preventDefault();
         x.innerHTML = x.innerHTML.slice(0,x.innerHTML.length-1);
     }else if(dStore.KeyCodes[key]!= undefined){
         x.innerHTML = x.innerHTML + dStore.KeyCodes[key];
     }
     if(key == 9){
         event.preventDefault();
         let command = x.innerHTML.split(" ")[0];
         let file = x.innerHTML.split(" ")[1];
         if (autoCompleteCache.length==0){
            for(let i=0;i<dStore.files.length;i++){
                if(func.IfPrefix(file,dStore.files[i])){
                 //x.innerHTML = command +" "+files[i];
                 //break;
                 autoCompleteCache.push(dStore.files[i])
                }
            }
         }
         
         x.innerHTML = command+" "+autoCompleteCache[autoCompleteCount];
         autoCompleteCount = (autoCompleteCount + 1)%autoCompleteCache.length;
             
         
     }
     
});

},{"./commands.js":1,"./dataStore.js":2,"./functions.js":3}]},{},[4]);
