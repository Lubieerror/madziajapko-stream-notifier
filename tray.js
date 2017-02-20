'use strict';
const electron = require('electron');

const app = electron.app;
let tray = null;
let appIcon = 'rsc/icon3.png';

exports.create = win => {
	if (process.platform === 'darwin' || tray) {
		return;
	}

	const toggleWin = () => {
		if (win.isVisible()) {
			win.hide();
		} else {
			win.show();
		}
	};

	const contextMenu = electron.Menu.buildFromTemplate([
		{
			label: 'Odśwież (WIP)'
		},
		{
			label: 'Ustawienia (WIP)'
		},
		{
			label: 'Przełącz',
			click() {
				toggleWin();
			}
		},
		{
			type: 'separator'
		},
		{
			label: 'Wyjdź!',
			role: 'quit'
		}
	]);

	// tray = new electron.Tray('rsc/icon3.png');
	tray = new electron.Tray(appIcon);
	// tray.setToolTip(`${app.getName()}`);
	tray.setToolTip(`LIVE STATUS\nMadzia: Online`);
	tray.setContextMenu(contextMenu);
	tray.on('click', toggleWin);
};

// exports.setBadge = shouldDisplayUnread => {
// 	if (process.platform === 'darwin' || !tray) {
// 		return;
// 	}

// 	const icon = shouldDisplayUnread ? 'IconTrayUnread.png' : 'IconTray.png';
// 	tray.setImage('rsc/icon3.png');
// };
