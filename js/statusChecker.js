var link = 'https://api.hitbox.tv/';
//ending between them
var sname = '/madziajapko';

var status = 'N/A';
var title = 'N/A';
var game = 'N/A'; //wargame *joke*

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function getJson(ending) {
	if(typeof(ending) !== 'string') {
		console.log("Error! Json - podany odnośnik nie jest stringiem! (typeof = " + typeof(ending) +")");
		return;
	}
}

function getData() {
}

function applyChanges() {
	$("#status").html(status);
	if(status === 'Online')
		$("#status").css("color", "green");
	else if(status === 'Offline')
		$("#status").css("color", "red");
	else
		$("#status").css("color", "gray");
	$("#tytul").html(title);
	$("#gra").html(game);
}


//main function!!!
function checkStatus() {
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
