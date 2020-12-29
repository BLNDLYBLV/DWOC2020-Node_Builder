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
  mainWindow.loadURL(`file://${__dirname}/views/index.html`);
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

// Takes care of redirecting

ipcMain.on('redirection',(event,k)=>{
  if(k=="Details"){
    mainWindow.loadURL(`file://${__dirname}/views/details.html`);
  }
});

app.on("ready", createWindow);
app.on("browser-window-created", function(e, window) {
  window.setMenu(null);
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