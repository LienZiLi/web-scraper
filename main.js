const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Nightmare = require("nightmare");

async function createWindow() {
  const { default: isDev } = await import("electron-is-dev");

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true, // This is required for `require` to work in renderer process
      contextIsolation: true, // This is required to use `ipcRenderer` directly
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000/");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile("./build/index.html");
  }
}

app.whenReady().then(() => {
  createWindow();
  const nightmare = Nightmare({
    show: true,
    electronPath: require("./node_modules/electron"),
  });

  ipcMain.on("click", (event, arg) => {
    console.log("Received URL:", arg); // Log the received URL
    nightmare
      .goto("https://www.chess.com")
      .wait("body")
      .evaluate(() => document.title)
      .end()
      .then(console.log)
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
