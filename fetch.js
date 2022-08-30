console.log(`jpm: ${jpm} <Line:1 fetch.js>`);
console.log(`url: ${url} <Line:2 fetch.js>`);

async function send(base64_str) {

	let headersList = {
		"Access-Control-Allow-Origin": "*"
	}
	// const endpoint = document.getElementById('endpoint').value;
	let endpoint = sessionStorage.getItem("Endpoint")

	let bodyContent = new FormData();
	bodyContent.append("base64_str",
		base64_str.split('data:image/jpeg;base64,')[1]);
	bodyContent.append("filename", 'testing_correct_filename');

	let response = fetch("https" + endpoint.split("http")[1] + "/predictbase64/", {
		method: "POST",
		mode: "no-cors",
		body: bodyContent,
		headers: headersList
	});

	response.then((a) => { console.log(a, a.text()) });
}

function showPreview(event) {
	if (event.target.files.length > 0) {
		var reader = new FileReader();
		reader.onload = function() {
			var preview = document.getElementById("file-ip-1-preview");
			preview.src = reader.result;
			preview.style.display = "block";
			preview.style.minWidth = `${21}rem`;
			preview.style.minHeight = `${21}rem`;
			preview.style.maxWidth = `${21}rem`;
			preview.style.maxHeight = `${21}rem`;
			preview.style.objectFit = "cover";
			res = reader.result;

			let bool = sessionStorage.getItem("gotEndpoint");
			if (bool) {
				send(res);
			} else {
				sessionStorage.setItem("gotEndpoint", false);
				alert("Try Again!")
			}
		};
		reader.readAsDataURL(event.target.files[0]);
	} else {
		console.log(false)
	}
}
