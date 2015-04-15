var shouldRedirect = false;
var correctUserNumber;
var primaryAccount;
function main() {
	shouldRedirect = checkUrl();
	if (shouldRedirect) {
		correctUserNumber = correctUserNumber ();
		document.location.pathname = "/u/" + correctUserNumber + document.location.pathname
	}
}
function checkUrl () {
	var href = document.location.toString();
	return href.toLowerCase().search("plus.google.com/u/") < 0 &&href.toLowerCase().search("plus.google.com/hangouts/") < 0 ;
}
function correctUserNumber () {
	//probably quicker than searching each text element but it might change!
	var users = document.getElementsByClassName("gb_ba");
	for (var i = 0; i < users.length; i++) {
		if (users[i].innerText.search(primaryAccount) != -1) {
			return i;
		}		
	}
}
chrome.storage.local.get("email",function(data) {primaryAccount=data.email;main();});