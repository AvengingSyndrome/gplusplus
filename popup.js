
var req = new XMLHttpRequest();
req.open("GET", "https://plus.google.com", true);
req.onload = getAvailableEmails;
req.send(null);

function getAvailableEmails(e) {
	var doc = new DOMParser().parseFromString(e.target.response,"text/html");
	var users = doc.getElementsByClassName("gb_ba");
	for (var i = 0; i < users.length; i++) {
		var email = users[i].innerText.split(" ")[0];
		document.getElementById("choices").appendChild(createRadio(email));
		document.getElementById("choices").appendChild(document.createTextNode(email));
		document.getElementById("choices").appendChild(document.createElement('br'));
	}
	document.getElementById("choices").appendChild(createRadio("Other"));
	document.getElementById("choices").appendChild(document.createTextNode("Other"));
	document.getElementById("choices").appendChild(document.createElement('br'));
	document.body.style.visibility = "visible";
}
function createRadio(choice) {
	var radio = document.createElement("input");
	radio.type = "radio";
	radio.name = "1";
	radio.value = choice;
	radio.id = choice;
	return radio;
}
document.getElementById("userInput").onfocus = function() {
	document.getElementById("Other").checked = true;
}
document.getElementById("save").onclick = function () {
	var email;
	if (document.getElementById("Other").checked == true) {
		email = document.getElementById("userInput").value;
	} else {
		var possible = document.getElementsByName("1");
		for (var i = 0; i < possible.length; i++) {
			if(possible[i].checked == true) {
				email = possible[i].value;
			}
		}
	}
	chrome.storage.local.set({"email":email});
}
