const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const { resolve } = require("path");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

//Execute Javascript inside given window
function javascript(window, command) {
	return new Promise((resolve, reject) => {
		let response;
		window.webContents.executeJavaScript(command, function(result) {
			try {
				response = JSON.parse(result);
				resolve(response);
			} catch (e) {
				reject(e);
			}
		});
	});
}

function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({ width: 1024, height: 674, resizable: false });

	// and load the index.html of the app.
	win.loadFile(resolve(__dirname, "dist/index.html"));

	// Open the DevTools.
	win.webContents.openDevTools();

	// Emitted when the window is closed.
	win.on("closed", () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null;
	});

	//React devtools
	const {
		default: installExtension,
		REACT_DEVELOPER_TOOLS,
	} = require("electron-devtools-installer");

	installExtension(REACT_DEVELOPER_TOOLS)
		.then(name => {
			console.log(`Added Extension:  ${name}`);
		})
		.catch(err => {
			console.log("An error occurred: ", err);
		});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//Authentication handler
ipcMain.on("auth", function(event) {
	authWindow = new BrowserWindow({ width: 400, height: 300 });
	authWindow.loadURL("http://localhost:3000/auth/bnet");
	javascript(authWindow, `document.querySelector('body').textContent`)
		.then(response => {
			event.sender.send("auth-complete", response);
		})
		.catch(error => {
			dialog.showMessageBox(authWindow, {
				type: "info",
				message:
					"Please log in to the battle.net service and try again",
				title: "Login required",
				buttons: ["OK"],
			});
		});
	authWindow = null;
});
