const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");

inputBox.onkeyup = (e) => {
	let userData = e.target.value;
	let emptyArray = [];
	if (userData) {
		emptyArray = suggestions.filter((data) => {
			return data.toLocaleLowerCase().startsWith(
				userData.toLocaleLowerCase()
			);
		});
		emptyArray = emptyArray.map((data) => {
			return data = `<li onclick='setValue(this)' class='auto-list'>${data}</li>`;
		});
		searchWrapper.classList.add("active");
		showSuggestions(emptyArray);
		// let allList = suggBox.querySelectorAll("li");
	} else {
		searchWrapper.classList.remove("active");
	}
}

function setValue(value) {
	inputBox.value = value.innerHTML
	console.log((value.innerHTML).toUpperCase())
	sendSearch((value.innerHTML).toUpperCase())
	searchWrapper.classList.remove("active");
}

function showSuggestions(list) {
	let listData;
	if (!list.length) {
		let userValue = inputBox.value;
		listData = `<li>${userValue}</li>`;
	} else {
		listData = list.join('');
	}
	suggBox.innerHTML = listData;
}

async function sendSearch(item) {

	let headersList = {
		"Access-Control-Allow-Origin": "*"
	}

	let endpoint = sessionStorage.getItem("Endpoint")
	console.log("https" + endpoint.split("http")[1] + "/pred/" + item);

	let response = fetch("https" + endpoint.split("http")[1] + "/pred/" + item, {
		method: "GET",
		mode: "no-cors",
		headers: headersList
	});

	response.then(res => res.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
}