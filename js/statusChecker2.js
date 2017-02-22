var person = 'madziajapko';

var status = 'N/A';
var title = 'N/A';
var game = 'N/A'; //wargame *joke*

var liveStatusJson;
var liveDescriptionJson;

//checkIsRunning/Done variables (mostly bools)

var stage = 0;
var isWorking = false;

var safeLoop;

var updateNumber = -10000000;
var lastCheckUpdate = updateNumber;


//HOMEWORK:

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse

// https://www.w3schools.com/js/js_timing.asp

// https://api.hitbox.tv/media/status/madziajapko

// https://api.hitbox.tv/media/live/madziajapko

// https://www.w3schools.com/js/js_errors.asp


//TO DO:
/*
	- Event based system!
	- try {
		
	} catch (error) {
		
	}

	- Kontrola czasu w jakim się te skrypty będą wykonywać!
	- Sprawdzanie poprawności danych
	- Co zrobić jak internetu zabraknie D: //trycatch 
	- Sprasować dane
	- Resztę działań
	- Zastosowanie tego wszystkiego!
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

function universalUpdate() {
	$('#status').html(status);
	if(status === 'Online') {
		$('#status').css('color', 'green');
		$('#statusBg').css('background-color', 'darkgreen');
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
}

function updateSite() {
	isWorking = true;
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

	sleep(6300 * 1).then(() => {
		console.log("Starting init script!");
	});
	var InitInterval = setInterval(checkStatus, 15000);
	var InitInterval = setInterval(checkStatus, 300000); // 5 minut
});