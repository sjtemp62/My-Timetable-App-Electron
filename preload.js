// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// 안전하게 Node.js 기능 노출
contextBridge.exposeInMainWorld('electronAPI', {
  invokeSchedules: (subjects) => ipcRenderer.invoke('generate-schedules', subjects),
});