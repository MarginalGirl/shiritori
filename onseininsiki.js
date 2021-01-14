const startBtn = document.getElementById('#start-btn');
const stopBtn = document.getElementById('#stop-btn');
const resultDiv = document.getElementById('#result-div');
const meisi = document.getElementById('#meisi')

SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();

recognition.lang = 'ja-JP';
recognition.interimResults = true;
recognition.continuous = false;

recognition.onresult = (event) => {
	let transcript = event.results[0][0].transcript;
	if (event.results[0].isFinal) {

		resultDiv.innerHTML = transcript;

		kuromoji.builder({ dicpath: "dict/"}).build(function(err, tokenizer){
			if(err){
				console.log(err);
			}else{
				var tokens = tokenizer.tokenize(transcript);
				
			}
		}

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
