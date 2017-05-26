let dStore = require("./dataStore.js");
let func = require("./functions.js");
let cmds = require("./commands.js");
let $ = require("jquery");

// Command caching
let commandStack = [];
let commandIndex = 0;

// Auto completetion
let autoCompleteCache = [];
let autoCompleteCount = 0;

document.addEventListener('keydown', function(event) {
     let x = document.getElementById("input");
     let key = event.keyCode;
     // Enter key
     if(key === 13){
         if (cmds.commands[x.innerHTML.split(" ")[0]]!=undefined){
             cmds.commands[x.innerHTML.split(" ")[0]](x.innerHTML);
             if(x.innerHTML!=""){
                 commandStack.push(x.innerHTML);
             }else{
                 commandStack.push("clear");
             }
             commandIndex = commandStack.length;
         }else if(x.innerHTML.split(" ")[0]===""){
             func.displayOutput("");
         }
         else{
             func.errorMessage(x);
         }
         autoCompleteCache = [];
         autoCompleteCount = 0;

         // scrolling
         if(document.body.scrollHeight-document.getElementById("terminal").offsetHeight<300){
             $("html, body").animate({ scrollTop: $(document).height()-$(window).height() }, 60);
         }
     }

     // Up arrow key
     if(key === 38){
         event.preventDefault();
         if(commandIndex-1>=0){
             commandIndex -=1;
             x.innerHTML = commandStack[commandIndex];
         }
     }
     // Down arrow key
     if(key === 40){
         if(commandIndex+1<commandStack.length){
             commandIndex +=1;
             x.innerHTML = commandStack[commandIndex];
         }else if(commandIndex===commandStack.length-1){
             x.innerHTML = "";
             commandIndex +=1;
         }
     }
     // Backspace key
     if(key === 8){
         event.preventDefault();
         x.innerHTML = x.innerHTML.slice(0,x.innerHTML.length-1);
     }else if(dStore.KeyCodes[key]!= undefined){
         x.innerHTML = x.innerHTML + dStore.KeyCodes[key];
     }
     // Tab key
     if(key === 9){
         event.preventDefault();
         let command = x.innerHTML.split(" ")[0];
         let file = x.innerHTML.split(" ")[1];
         if (autoCompleteCache.length===0){
            for(let i=0;i<dStore.files.length;i++){
                if(func.IfPrefix(file,dStore.files[i])){
                 autoCompleteCache.push(dStore.files[i])
                }
            }
         }
         x.innerHTML = command+" "+autoCompleteCache[autoCompleteCount];
         autoCompleteCount = (autoCompleteCount + 1)%autoCompleteCache.length;
     }
});

document.getElementById("bulb").addEventListener("click",func.changeColor);
