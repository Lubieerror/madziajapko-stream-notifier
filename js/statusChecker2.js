var status = 'N/A';
var title = 'N/A';
var game = 'N/A'; //wargame *joke*

var liveStatusJson;
var liveDescriptionJson;

//checkIsRunning/Done variables (mostly bools)


//HOMEWORK:

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse

// https://www.w3schools.com/js/js_timing.asp

// https://api.hitbox.tv/media/status/madziajapko


//TO DO:
/*
	- Event based system!

	- Kontrola czasu w jakim się te skrypty będą wykonywać!
	- Sprawdzanie poprawności danych
	- Co zrobić jak internetu zabraknie D:
	- Sprasować dane
	- Resztę działań
	- Zastosowanie tego wszystkiego!
 */

function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* Usage!
	sleep(500).then(() => {
		Do something after the sleep!
	});
*/

///Functions:


function updateStatus() {
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

function getLiveStatus() {
	var link = 'https://api.hitbox.tv/media/status/madziajapko';

	$.getJSON(link, function(tmpJson) {
		var tmpInt = setInterval(() => {
			liveStatusJson = tmpJson;
			if(liveStatusJson)
				clearInterval(tmpInt);
		}, 1000 * 5);
	});
}

function getLiveDescription() {
	var link = 'TODO';

	$.getJSON(link, function(tmpJson) {
	});
}

//Run that:

function checkStatus() {
	//
}