sessionStorage.setItem("gotEndpoint", false)
sessionStorage.setItem("Endpoint", "")

firebase.initializeApp(firebaseConfig);

var database = firebase.database()

function end() {
	var url_ref = database.ref().child('name')
	url_ref.on('value', (snapshot) => {
		const endpoint = snapshot.val()
		var url = endpoint;
		sessionStorage.setItem("gotEndpoint", true)
		sessionStorage.setItem("Endpoint", endpoint)
		console.log(endpoint)
	})
}

let jpm = "John Pierpont Morgan Sr.";

end()