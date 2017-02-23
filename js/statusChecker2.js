const notifier = require('node-notifier');
const path = require('path');

//streamer's data
var person = 'madziajapko';

var status = 'N/A';
var lastStatus = status;
var title = 'N/A';
var game = 'N/A'; //wargame *joke*

//checkIsRunning/Done variables (mostly bools)
var stage = 0;
var isWorking = false;

var updateNumber = -100000000;
var lastCheckUpdate = updateNumber;

//other public values
var InitInterval;
var updateFreq = 5;
var safeLoop;

var liveStatusJson;
var liveDescriptionJson;

//HOMEWORK:

// https://github.com/mikaelbr/node-notifier

// https://github.com/hokein/electron-sample-apps/tree/master/notifications

// https://api.hitbox.tv/media/status/madziajapko

// https://api.hitbox.tv/media/live/madziajapko


//TO DO:
/*
	- Kontrola czasu w jakim się te skrypty będą wykonywać! (???)
	- Optymalizacja(?)
	- Powiadomienia
	- Ustawienia (low prio)
	- stworzyć z tego "moduł node'owy"
	- nowocześniejszy wygląd
	- może wreszcie zrobić bez ramki? :v
	- więcej w README.md
 */

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/* Usage!
	sleep(500).then(() => {
		Do something after the sleep!
	});
*/

///Functions:

function testNotification() {
	/*

		Problem! For now it's working only on Linux ; ___;

	*/

	notifier.notify({
		title: 'Madzia Japko jest Online :D',
		sound: true,
		wait: true,
		message: 'Tytuł: ' + title + '\n Aktualna gra to: ' + game,
		icon: path.join(__dirname, 'rsc/madzia.jpg')
	});
	
	var options = [{
		title: "Basic Notification",
		body: "Short message part"
	},
	{
		title: "Content-Image Notification",
		body: "Short message plus a custom content image",
		icon: path.join(__dirname, 'rsc/madzia.jpg')
	}];

	// function doNotify(evt) {
	// 	if (evt.srcElement.id == "basic") {
	// 		new Notification(options[0].title, options[0]);
	// 	}
	// 	else if (evt.srcElement.id == "image") {
	// 		new Notification(options[1].title, options[1]);
	// 	}
	// }

	function doNotify() {
		new Notification(options[1].title, options[1]);
	}

	doNotify();
}

function changeInitInterval(uf) {
	updateFreq = uf;
	try {
		clearInterval(InitInterval);
	} catch (err) {
		console.log("Error! InitInterval prawdopodobnie nie istnieje! Tworzymy nowy!");
	}
	InitInterval = setInterval(checkStatus, updateFreq * 1000);
}

function universalUpdate() {
	$('#status').html(status);
	if(status === 'Online') {
		$('#status').css('color', 'green');
		$('#statusBg').css('background-color', 'darkgreen');
		if(lastStatus !== status) {
			notifier.notify({
				title: 'Madzia Japko jest Online :D',
				sound: true,
				wait: true,
				message: 'Tytuł: ' + title + '\n Aktualna gra to: ' + game,
				icon: path.join(__dirname, 'rsc/madzia.jpg')
			});
		}
	}
	else if(status === 'Offline') {
		$('#status').css('color', 'red');
		$('#statusBg').css('background-color', 'red');
	}
	else {
		$('#status').css('color', 'gray');
		$('#statusBg').css('background-color', 'darkgray');
	}
	$('#tytul').html(title);
	$('#gra').html(game);

	lastStatus = status;
}

function updateSite() {
	isWorking = true;
	if(updateNumber === -100000000) {
		changeInitInterval(30);
	}
		
	updateNumber++;

	universalUpdate();

	stage = 0;
	isWorking = false;
}

function updateData() {
	isWorking = true;

	if(liveStatusJson.media_is_live === "1")
		status = 'Online';
	else
		status = 'Offline';

	if(liveDescriptionJson) {
		title = liveDescriptionJson.livestream[0].media_status;
		game = liveDescriptionJson.livestream[0].category_seo_key;
	} else {
		title = 'N/A';
		game = 'N/A';
	}

	stage = 4;
	isWorking = false;
}

function getLiveDescription() {
	isWorking = true;
	var link = 'https://api.hitbox.tv/media/live/' + person;

	try {
		$.getJSON(link, function(tmpJson) {
				safeLoop = 0;
				var getLiveDescriptionInterval = setInterval(() => {
					safeLoop++;
					liveDescriptionJson = tmpJson;

					if(liveDescriptionJson){
						clearInterval(getLiveDescriptionInterval);
						stage = 3;
						isWorking = false;
						return;
					}
					if(safeLoop > 25) {
						console.log("Error inside getLiveDescription(). Shutting down....");
						clearInterval(getLiveDescriptionInterval);
						return;
					}
				}, 1000 * 3);
		});
	} catch (error) {
		// other stuff must be here than after clearInterval (cause it may cause errors)
		console.log("Catched!");
		isWorking = false;
		clearInterval(getLiveDescriptionInterval);
	}
}

function getLiveStatus() {
	isWorking = true;
	var link = 'https://api.hitbox.tv/media/status/' + person;

	try {
		$.getJSON(link, function(tmpJson) {
			safeLoop = 0;
			var getLiveStatusInterval = setInterval(() => {
				safeLoop++;
				liveStatusJson = tmpJson;

				if(liveStatusJson){
					clearInterval(getLiveStatusInterval);
					if(liveStatusJson.media_is_live === "1")
						stage = 2;
					else
						stage = 3;
					isWorking = false;
					return;
				}
				if(safeLoop > 25) {
					console.log("Error inside getLiveStatus(). Shutting down....");
					clearInterval(getLiveStatusInterval);
					return;
				}
			}, 1000 * 3);
		});
	} catch (error) {
		// other stuff must be here than after clearInterval (cause it may cause errors)
		console.log("Catched!");
		isWorking = false;
		clearInterval(getLiveStatusInterval);
	}
}

function cleaner() {
	isWorking = true;

	liveStatusJson = 0;
	liveDescriptionJson = 0;
	status = 'N/A';
	title = 'N/A';
	game = 'N/A';
	
	stage = 1;
	isWorking = false;
}

function refreshData() {
	if(updateNumber <= lastCheckUpdate) {
		status = 'N/A';
		title = 'N/A';
		game = 'N/A';
	}

	universalUpdate();
}

//Run that:

function checkStatus() {
	console.log("checkStatus(): Tick!");
	if(isWorking)
		return;

	console.log("Starting stage: " + stage);

	switch (stage) {
		case 0:
			cleaner();
		break;
		case 1:
			getLiveStatus();
		break;
		case 2:
			getLiveDescription();
		break;
		case 3:
			updateData();
		break;
		case 4:
			updateSite();
		break;
		default:
			console.log("There is an error! state is bigger than 4 (and it's " + stage + ")! Reseting to 0.");
			state = 0;
		break;
	}
	//
}

var dontRun = false; // debugMode
// person = ''

$(document).ready(function(){
	if(dontRun)
		return;

	sleep(4700).then(() => {
		console.log("Starting init script!");
	});
	InitInterval = setInterval(checkStatus, updateFreq * 1000);
	var refreshInterval = setInterval(refreshData, 300000); // 5 minut
});