var status = 'N/A';
var title = 'N/A';
var game = 'N/A'; //wargame *joke*

var liveStatusJson;
var liveDescriptionJson;

//checkIsRunning/Done variables (mostly bools)

var stage = 0;
var isWorking = false;


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


function updateSite() {
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

function updateData() {
	//
}

function getLiveStatus() {
	isWorking = true;
	var link = 'https://api.hitbox.tv/media/status/madziajapko';

	try {
		$.getJSON(link, function(tmpJson) {
			var tmpInt = setInterval(() => {
				liveStatusJson = tmpJson;

				if(liveStatusJson){
					clearInterval(tmpInt);
					stage = 1;
					isWorking = false;
				}
			}, 1000 * 5);
		});
	} catch (error) {
		// other stuff must be here than after clearInterval (cause it may cause errors)
		clearInterval(tmpInt); //====================================== <= finished working here
	}
}

function getLiveDescription() {
	var link = 'https://api.hitbox.tv/media/live/madziajapko';

	$.getJSON(link, function(tmpJson) {
	});
}

//Run that:

function checkStatus() {
	if(isWorking)
		return;

	switch (stage) {
		case 0:
			
		break;
		case 1:
		break;
		case 3:
		break;
		case 4:
		break;
	}
	//
}