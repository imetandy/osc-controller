const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  sendOSCMessage: () => ipcRenderer.invoke('sendOSCMessage', '/start', 1)
    
  // we can also expose variables, not just functions
})