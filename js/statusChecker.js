var domena = 'https://api.hitbox.tv/';
//ending between them
var sname = '/madziajapko';

var status = 'N/A';
var title = 'N/A';
var game = 'N/A'; //wargame *joke*

function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Usage!
// sleep(500).then(() => {
//     // Do something after the sleep!
// });



//HOMEWORK:

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse

// https://www.w3schools.com/js/js_timing.asp

// https://api.hitbox.tv/media/status/madziajapko

//TO DO:

/*
	- Kontrola czasu w jakim się te skrypty będą wykonywać!
	- Sprawdzanie poprawności danych
	- Co zrobić jak internetu zabraknie D:
	- Sprasować dane
	- Resztę działań
	- Zastosowanie tego wszystkiego!
 */


function getJsonDataOld(mid) {
	var link = domena + mid + sname;
	var finalJson;

	$.getJSON(link, function(tempJson) {
		console.log(tempJson);
		finalJson = tempJson; // ====================== Problem! Wykona się, zanim getJSON zadziała :( 
	});

	console.log(finalJson); // ========= Z tego powodu będzie pusty x_x

	return finalJson; // ======= tutaj też null D:
}

function getJsonData(mid) {
	var link = domena + mid + sname;
	var finalJson;

	$.getJSON(link, function (tempJson) {
		console.log(tempJson);
		var testing = setInterval(() => {
			finalJson = tempJson; // ====================== Problem! Wykona się, zanim getJSON zadziała :( 
				if(finalJson) {
					clearInterval(testing);
					console.log(finalJson); // ========= Z tego powodu będzie pusty x_x
					return finalJson; // ======= tutaj też null D:
				}
		}, 1000 * 3);
	});
}

function applyChanges() {
	$("#status").html(status);
	if(status === 'Online') {
		$("#status").css("color", "green");
		$("#statusBg").css("background-color", "darkgreen");
	}
	else if(status === 'Offline') {
		$("#status").css("color", "red");
		$("#statusBg").css("background-color", "red");
	}
	else {
		$("#status").css("color", "gray");
		$("#statusBg").css("background-color", "darkgray");
	}
	$("#tytul").html(title);
	$("#gra").html(game);
}


// ============================================== Funkcja dla testów!
function testF() {
	var printConsoleOutput = setInterval(() => {
		var times = 0;
		console.log("Tick!");
		times++;
		if(times > 10)
			clearInterval(printConsoleOutput);
	}, 1000 * 5);
}

function checkStatusIdeal() {
	var sleepDurationSec = 10;
	var firstData;
	var illNameItLeater;

	sleepDurationSec = 5; //================================== Przyśpieszone dla szybszego debugowania! Naprawić w wersji finalnej!

	function firstTry() {
		firstData = getJsonData("media/status");
		console.log("First data: ");
		console.log(firstData);
		// sleepDurationSec += 15; //========================= Wyłączyłem dla szybszego debugowania! Naprawić w wersji finalnej!

		if(sleepDurationSec > 300)
			sleepDurationSec = 300;

		console.log(firstData);

		if(firstData) {
			clearTimeout(illNameItLeater);
			console.log("finish it!; true");
		}
		else {
			clearTimeout(illNameItLeater);
			illNameItLeater = setTimeout(firstTry, 1000 * sleepDurationSec);
		}
	}

	illNameItLeater = setTimeout(firstTry, 1000 * sleepDurationSec);
}


//main function!!!
function checkStatus() {
	var sleepDurationSec = 10;
	var firstData;
	var illNameItLeater;

	sleepDurationSec = 5; //================================== Przyśpieszone dla szybszego debugowania! Naprawić w wersji finalnej!

	function firstTry() {
		firstData = getJsonData("media/status");
		// sleepDurationSec += 15; //========================= Wyłączyłem dla szybszego debugowania! Naprawić w wersji finalnej!

		if(sleepDurationSec > 300)
			sleepDurationSec = 300;

		console.log(firstData);

		if(firstData) {
			clearTimeout(illNameItLeater);
			console.log("finish it!; true");
		}
		else {
			clearTimeout(illNameItLeater);
			illNameItLeater = setTimeout(firstTry, 1000 * sleepDurationSec);
		}
	}

	illNameItLeater = setTimeout(firstTry, 1000 * sleepDurationSec);

	//==============================================================
	//Plan
	/*
	get Json data 

	<make that from getJson lvl>
	if download fail - wait few seconds and retry (wait more and more (but until idk... maybe 3 min.))
	if fail > 30 sec. set to N/A
	
	<make it from getData lvl>
	set data 
	if online get more data 

	<??? lvl>
	set to completed, wait for refresh (sometimes forced)
	*/
}
