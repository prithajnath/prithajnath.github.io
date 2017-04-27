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
