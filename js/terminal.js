/*global KeyCodes*/

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

let commands = {
    "ls":()=>{
        displayOutput("about.txt education.txt  experience.txt languages.txt");
    }
}

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
}
    

function errorMessage(x){
    displayOutput("bash: "+x.innerHTML+": command not found");
}

document.addEventListener('keydown', function(event) {
     let x = document.getElementById("input");
     key = event.keyCode;
     if(key == 13){
         if (commands[x.innerHTML]!=undefined){
             commands[x.innerHTML]();
         }else{
             errorMessage(x);
         }
         
     }
     if(key == 8){
         x.innerHTML = x.innerHTML.slice(0,x.innerHTML.length-1);
     }else if(KeyCodes[key]!= undefined){
         x.innerHTML = x.innerHTML + KeyCodes[key];
     }
     
});

