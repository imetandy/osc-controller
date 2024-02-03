const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const osc = require('osc')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  ipcMain.handle('ping', () => 'pong')

  ipcMain.handle('sendOSCMessage', (address, ip) => {
    console.log("Sending message:" + address + "to op:" + ip)
    udpPort.send({
      address: "/start",
      args: [
          {
              type: "s",
              value: "default"
          },
          {
              type: "i",
              value: 1
          }
      ]
  }, "127.0.0.1", 57110);
})


  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Create an osc.js UDP Port listening on port 57121.
var udpPort = new osc.UDPPort({
  localAddress: "0.0.0.0",
  localPort: 57121,
  metadata: true
});

// Listen for incoming OSC messages.
udpPort.on("message", function (oscMsg, timeTag, info) {
  console.log("An OSC message just arrived!", oscMsg);
  console.log("Remote info is: ", info);
});

// Open the socket.
udpPort.open();

// When the port is read, send an OSC message to, say, SuperCollider
udpPort.on("ready", function () {
  udpPort.send({
      address: "/s_new",
      args: [
          {
              type: "s",
              value: "default"
          },
          {
              type: "i",
              value: 100
          }
      ]
  }, "127.0.0.1", 57110);
});