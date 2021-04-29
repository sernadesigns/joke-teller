const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
	button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
	// Call Text-To-Speech
	VoiceRSS.speech({
		key: '93a57344ed68496baeb4bc1d1ddbb387',
		src: joke,
		hl: 'en-us',
		r: 0,
		c: 'mp3',
		f: '44khz_16bit_stereo',
		ssml: false
	});
}

// Get Jokes from Joke API
async function getJokes() {
	// Disable Button
	toggleButton();
	const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		tellMe(data.setup ? `${data.setup} ... ${data.delivery}` : data.joke);
	} catch (error) {
		// Catch Errors Here
		console.log('whoops', error);
	}
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
