window.$ = window.jQuery = require('jquery');
electron = require('electron');

function doMagic() {
	document.getElementById("everything").innerHTML = "Exit();";
}

// $(document).on('page-onload', console.log('Yey!'));

//open External
function oE(link) {
	if(typeof(link) === 'string')
		electron.shell.openExternal(link);
	else
		console.log("Error! Some link! isn't string value! (link is " + typeof(link) + ")");
}

//Main
window.onload = function main() {
	doMagic();
};