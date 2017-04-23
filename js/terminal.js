/*global KeyCodes*/
let x = document.getElementById("input");
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
    191:"/"
};

document.addEventListener('keydown', function(event) {
     key = event.keyCode;
     if(KeyCodes[key]!= undefined){
         x.innerHTML = x.innerHTML + KeyCodes[key];
     }
     
});