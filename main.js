const { dialog } = require('electron');
var electron = require('electron');
const { ipcMain } = require('electron/main');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

let mainWindow;

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

// ipcMain.on('redirection',(event,k)=>{
//   if(k==2){
//     mainWindow.loadURL(`file://${__dirname}/views/second.html`);
//     var data=dialog.showOpenDialog(mainWindow,{properties:['openDirectory']});
//     ipcMain.once('fileDialogReply',data);
//   }
// });

app.on("ready", createWindow);
// app.on("browser-window-created", function(e, window) {
//   window.setMenu(null);
// });

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