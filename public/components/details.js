var electron= require('electron');

var pathSpan = document.getElementById('Path');

function chooseFolder(){
    electron.ipcRenderer.send('choose-folder');
}

function next(){
    var projName=document.getElementById('projectName').value;
    if(projName==null || projName==''){
        document.getElementById('error').innerHTML="Project name cannot be empty";
    }
    else if(pathSpan.innerHTML=='' || pathSpan.innerHTML=='undefined'){
        document.getElementById('error').innerHTML="Destination folder cannot be empty";
    }
    else{
        electron.ipcRenderer.send('init-details',{projectName: projName});
    }
}

electron.ipcRenderer.on("open-dialog-reply",async (event,data)=>{
    var folderPath = await data.filePaths[0];
    console.log(folderPath);
    pathSpan.innerHTML=folderPath;
});