var electron= require('electron');

function redirto(k){
    electron.ipcRenderer.send("redirection",k);        
}

