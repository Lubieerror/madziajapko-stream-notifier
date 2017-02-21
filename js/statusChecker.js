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

//UPDATE! IT'S BROKEN!
// function sleep(ms) {
// 	var currentTime = new Date().getTime();
// 	while (currentTime + ms >= new Date().getTime()) {}
// }

function getJsonData(mid) {
	var link = domena + mid + sname;
	var finalJson;

	$.getJSON(link, function (tempJson) {
		console.log(tempJson);
		finalJson = tempJson;
	});

	console.log(finalJson);

	return finalJson;
}

function getData() {
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

function testF() {
	var printConsoleOutput = setInterval(() => {
		var times = 0;
		console.log("Tick!");
		times++;
		if(times > 10)
			clearInterval(printConsoleOutput);
	}, 1000 * 5);
}


//main function!!!
function checkStatus() {
	console.log("START!");
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
	console.log("outside");

	//===============================================================
	//Old code for port it;;;

	// var sleepDurationSec = 1;
	// var firstData;
	
	// do {
	// 	sleep(1000 * sleepDurationSec).then(() => {
	// 		firstData = getJsonData("media/status");
	// 		sleepDurationSec += 15;
	// 		if(sleepDurationSec > 300)
	// 			sleepDurationSec = 300;
	// 	});
	// } while(!firstData)


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
