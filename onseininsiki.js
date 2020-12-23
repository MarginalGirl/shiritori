const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');
const resultDiv = document.querySelector('#result-div');
const meisi = document.querySelector('#meisi')

SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();

recognition.lang = 'ja-JP';
recognition.interimResults = true;
recognition.continuous = false;

recognition.onresult = (event) => {
	let transcript = event.results[0][0].transcript;
	if (event.results[0].isFinal) {

		resultDiv.innerHTML = transcript;

		

	} else {
		resultDiv.innerHTML = '<div style="color:#ddd;">' + transcript + '</div>';
	}
}



startBtn.onclick = () => {
	recognition.start();
}
stopBtn.onclick = () => {
	recognition.stop();
}
