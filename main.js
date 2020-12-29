const { dialog } = require('electron');
var electron = require('electron');
const { ipcMain } = require('electron/main');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

let mainWindow;

// Global variables

var projectPath;
var projectName;

// Window Init 

function createWindow() {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1100,
    height: 820,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(`file://${__dirname}/views/first.html`);
  mainWindow.webContents.openDevTools();
  mainWindow.on("close", () => {
    mainWindow.webContents.send("stop-server");
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// IPC comms start here

// Choose Btn in details page

ipcMain.on('choose-folder',async (event)=>{
  var data = await dialog.showOpenDialog(mainWindow,{properties:['openDirectory']});
  event.sender.send('open-dialog-reply',data);  
  projectPath=data.filePaths[0];
});

// Next btn in details page

ipcMain.on('init-details',(event,data)=>{
  projectName=data.projectName;
  mainWindow.loadURL(`file://${__dirname}/views/first.html`);
})


app.on("ready", createWindow);
app.on("browser-window-created", function(e, window) {
  window.setMenu(null);
});

ipcMain.on('redirection',(event,k)=>{
    if(k=="f_crt"){
      console.log("Inga vanchu")
      mainWindow.loadURL(`file://${__dirname}/views/first.html`);
      // var data=dialog.showOpenDialog(mainWindow,{properties:['openDirectory']});
      // ipcMain.once('fileDialogReply',data);
    }
    else if(k=="m_crt"){
      mainWindow.loadURL(`file://${__dirname}/views/second.html`);
    }
    else if(k=="r_mgr"){
      mainWindow.loadURL(`file://${__dirname}/views/third.html`);
    }
    else if(k=="p_mgr"){
      mainWindow.loadURL(`file://${__dirname}/views/fourth.html`);
    }
    else if(k=="Details"){
      mainWindow.loadURL(`file://${__dirname}/views/details.html`);
    }
   
  });


app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});