//command caching
let commandStack = [];
let commandIndex = 0;

//AUto completetion
let autoCompleteCache = [];
let autoCompleteCount = 0;

document.addEventListener('keydown', function(event) {
     let x = document.getElementById("input");
     key = event.keyCode;
     if(key == 13){
         if (commands[x.innerHTML.split(" ")[0]]!=undefined){
             commands[x.innerHTML.split(" ")[0]](x.innerHTML);
             if(x.innerHTML!=""){
                 commandStack.push(x.innerHTML);
             }else{
                 commandStack.push("clear");
             }
             commandIndex = commandStack.length;
         }else if(x.innerHTML.split(" ")[0]==""){
             displayOutput("");
         }
         else{
             errorMessage(x);
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
     }else if(KeyCodes[key]!= undefined){
         x.innerHTML = x.innerHTML + KeyCodes[key];
     }
     if(key == 9){
         event.preventDefault();
         let command = x.innerHTML.split(" ")[0];
         let file = x.innerHTML.split(" ")[1];
         if (autoCompleteCache.length==0){
            for(let i=0;i<files.length;i++){
                if(IfPrefix(file,files[i])){
                 //x.innerHTML = command +" "+files[i];
                 //break;
                 autoCompleteCache.push(files[i])
                }
            }
         }
         
         x.innerHTML = command+" "+autoCompleteCache[autoCompleteCount];
         autoCompleteCount = (autoCompleteCount + 1)%autoCompleteCache.length;
             
         
     }
     
});
