let func = require("./functions");
let dStore = require("./dataStore");


let commands = {
    "ls":(x)=>{
        if(x.replace(/  */,"")=="ls"){
            func.displayOutput(dStore.files.join(" "));
        }else{
            func.errorMessage(x);
        }
        
    },
    "clear":(x)=>{
        if(x.replace(/  */,"")=="clear"){
        let terminal = document.getElementById("terminal");
        let bash = document.getElementById("bash");
        terminal.innerHTML = "";
        terminal.appendChild(bash);
        document.getElementById("input").innerHTML = "";
        }else{
            func.errorMessage(x);
        }
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
        if(x.replace(/  */,"")=="help"){
        let commandList = Object.keys(commands);
        let data = "Try these commands to find out more about me: ";
        for(let i=0;i<commandList.length;i++){
            data += commandList[i] + ", "
        }
        func.displayOutput(data.slice(0,data.length-2));
        }else{
            func.errorMessage(x);
        }
    }
    
}

module.exports = {
    commands: commands
}
