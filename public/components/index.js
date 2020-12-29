var electron= require('electron');


function redirto(k){
    electron.ipcRenderer.send("redirection",k);        
}

electron.ipcRenderer.on("fileDialogReply",(data)=>{
    console.log('hi');
});