const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { generateSchedules } = require('./timetable'); // 시간표 로직 가져오기

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  mainWindow.loadFile('index.html');
});

// 시간표 조합 요청 처리
ipcMain.handle('generate-schedules', (event, subjects) => {
  return generateSchedules(subjects); // 시간표 조합 반환
});
