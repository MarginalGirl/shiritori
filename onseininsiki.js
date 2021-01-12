const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');
const resultDiv = document.querySelector('#result-div');
const meisi = document.querySelector('#meisi')
const last_word = document.querySelector('#last_word');

SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();

recognition.lang = 'ja-JP';
recognition.interimResults = true;
recognition.continuous = false;

recognition.onresult = (event) => {
	let transcript = event.results[0][0].transcript;
	if (event.results[0].isFinal) {

		resultDiv.innerHTML = transcript;
		
		kuromoji.builder({ dicPath: "dict/" }).build(function(err, tokenizer){
			if(err){
				console.log(err);
			} else {
				var tokens = tokenizer.tokenize(transcript);
				console.log(tokens);
				for (var item in tokens){
					if(tokens[item]["pos"] == "名詞"){
						var subject = tokens[item]["surface_form"];
						var last = tokens[item]["reading"].substr(tokens[item]["reading"].length - 1 , 1);
						break;
					}
				}
				meisi.innerHTML = subject;
				last_word.innerHTML = last;

			}
		});
		

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
