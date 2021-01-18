const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const enter = document.getElementById('enter-btn');
const resultDiv = document.getElementById('result-div');
const enemy_word = document.getElementById('enemy_word');
const player_word = document.getElementById('player_word');
const attention = document.getElementById('attention');
const shiri_letter = document.getElementById('shiri_letter');
const player_fif = document.getElementById('player_fif');
const enemy_fif = document.getElementById('enemy_fif');
enter.disabled = true;
var enemy = [];
var player = [];
var log = [];
var dict = [];
getCSV();
log_init();
disp_fifty();

SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();
recognition.lang = 'ja-JP';
recognition.interimResults = true;
recognition.continuous = false;

recognition.onresult = (event) => {
	let transcript = event.results[0][0].transcript;
	if (event.results[0].isFinal) {
		resultDiv.innerHTML = transcript;
		match(transcript);
	} else {
		resultDiv.innerHTML = '<div style="color:#ddd;">' + transcript + '</div>';
	}
}

function getCSV(){
	var req = new XMLHttpRequest();
	req.open("get", "dic.csv", true);
	req.send(null);
	resultDiv.innerHTML = "ファイル読み込み中";
	
	req.onload = function(){
	convertCSVtoArray(req.responseText);
	}
}

function convertCSVtoArray(str){
	var tmp = str.split("\n");
	for(var i = 0; i < tmp.length; i++) dict[i] = tmp[i].split(',');
	resultDiv.innerHTML = "";
}

function log_init(){
	log = [];
	player = ["ン","ワ","ラ","ヤ","マ","ハ","ナ","タ","サ","カ","ア"
			,"リ","ミ","ヒ","ニ","チ","シ","キ","イ"
			,"ル","ユ","ム","フ","ヌ","ツ","ス","ク","ウ"
			,"レ","メ","ヘ","ネ","テ","セ","ケ","エ"
			,"ロ","ヨ","モ","ホ","ノ","ト","ソ","コ","オ"];
	enemy = ["ン","ワ","ラ","ヤ","マ","ハ","ナ","タ","サ","カ","ア"
			,"リ","ミ","ヒ","ニ","チ","シ","キ","イ"
			,"ル","ユ","ム","フ","ヌ","ツ","ス","ク","ウ"
			,"レ","メ","ヘ","ネ","テ","セ","ケ","エ"
			,"ロ","ヨ","モ","ホ","ノ","ト","ソ","コ","オ"];
}

function match(word){
	for(var i = 0; i < dict.length; i++){
		if(word == dict[i][0]){
			player_word.innerHTML = dict[i][1];
			enter.disabled = false;
			return;
		}
	}
	attention.innerHTML = "辞書に無い単語です";
	enter.disabled = true;
}

function search_n_disp(word){
	var rand = Math.floor(Math.random() * 1130528);
	if(rand % 2 == 0){
		for(var i = rand; i < dict.length - rand; i++){
			if(word == dict[i][2] && tale(dict[i][1]) != 'ン'){
				if(check_letter(extraction_word(dict[i][1])) , 1){
					enemy_word.innerHTML = dict[i][0] + "<br />" + dict[i][1];
					shiri_letter.innerHTML = tale(extraction_word(dict[i][1]));
					return;
				}
			}
		}
	}else{
		for(var i = rand; i > 0; i--){
			if(word == dict[i][2] && tale(dict[i][1]) != 'ン'){
				if(check_letter(extraction_word(dict[i][1])) , 1){
					enemy_word.innerHTML = dict[i][0] + "<br />" + dict[i][1];
					shiri_letter.innerHTML = tale(extraction_word(dict[i][1]));
					return;
				}
			}
		}
	}
	//search_n_disp(word);
}

function tale(word){
	return word.substr(word.length - 1 , 1);
}

function extraction_word(word){
	return word.replace(/ヴァ/g,"バ")
				.replace(/ヴィ/g,"ビ")
				.replace(/ヴェ/g,"ベ")
				.replace(/ヴォ/g,"ボ")
				.replace(/ヴ/g,"ブ")
				.replace(/ァ/g,"ア")
				.replace(/ィ/g,"イ")
				.replace(/ゥ/g,"ウ")
				.replace(/ェ/g,"エ")
				.replace(/ォ/g,"オ")
				.replace(/ヵ/g,"カ")
				.replace(/ヶ/g,"ケ")
				.replace(/ッ/g,"ツ")
				.replace(/ャ/g,"ヤ")
				.replace(/ュ/g,"ユ")
				.replace(/ョ/g,"ヨ")
				.replace(/ヮ/g,"ワ")
				.replace(/(?<=ア|カ|サ|タ|ナ|ハ|マ|ヤ|ラ|ワ|ガ|ザ|ダ|バ|パ)ー/g,"ア")
				.replace(/(?<=イ|キ|シ|チ|ニ|ヒ|ミ|リ|ギ|ジ|ヂ|ビ|ピ)ー/g,"イ")
				.replace(/(?<=ウ|ク|ス|ツ|ヌ|フ|ム|ユ|ル|グ|ズ|ヅ|ブ|プ)ー/g,"ウ")
				.replace(/(?<=エ|ケ|セ|テ|ネ|ヘ|メ|レ|ゲ|ゼ|デ|ベ|ペ)ー/g,"エ")
				.replace(/(?<=オ|コ|ソ|ト|ノ|ホ|モ|ヨ|ロ|ゴ|ゾ|ド|ボ|ポ)ー/g,"オ")
				.replace(/ガ/g,"カ")
				.replace(/ギ/g,"キ")
				.replace(/グ/g,"ク")
				.replace(/ゲ/g,"ケ")
				.replace(/ゴ/g,"コ")
				.replace(/ザ/g,"サ")
				.replace(/ジ/g,"シ")
				.replace(/ズ/g,"ス")
				.replace(/ゼ/g,"セ")
				.replace(/ゾ/g,"ソ")
				.replace(/ダ/g,"タ")
				.replace(/ヂ/g,"チ")
				.replace(/ヅ/g,"ツ")
				.replace(/デ/g,"テ")
				.replace(/ド/g,"ト")
				.replace(/バ|パ/g,"ハ")
				.replace(/ビ|ピ/g,"ヒ")
				.replace(/ブ|プ/g,"フ")
				.replace(/ベ|ペ/g,"ヘ")
				.replace(/ボ|ポ/g,"ホ");
}

function judge(){
	var word = extraction_word(player_word.textContent);
	if(word.substr(0 , 1) != shiri_letter.textContent || tale(word) == "ン"){
		attention.innerHTML = "有効な単語を入力してください!!";
		enter.disabled = true;
	}else{
		if(check_letter(word , 0)){
			search_n_disp(tale(word));
		}
	}
}

function check_letter(word , option){
	var check = 0;
	if(option == 0){
		for(var i = 1; i < word.length; i++){
			for(var j = 0; j < 45; j++){
				if(word.substr(i , 1) == player[j]){
					check++;
					break;
				}
			}
		}
		if(check == word.length - 1){
			for(var i = 0; i < word.length; i++){
				for(var j = 0; j < 45; j++){
					if(word.substr(i , 1) == player[j]){
						player[j] == "　";
						break;
					}
				}
			}
			return true;
		}else{
			attention.innerHTML = "もう使えない文字が含まれています";
			enter.disabled = true;
			return false;
		}
	}else{
		console.log(word);
		for(var i = 1; i < word.length; i++){
			for(var j = 0; j < 45; j++){
				if(word.substr(i , 1) == enemy[j]){
					check++;
					break;
				}
			}
		}
		console.log(check);
		if(check == word.length - 1){
			for(var i = 0; i < word.length; i++){
				for(var j = 0; j < 45; j++){
					if(word.substr(i , 1) == enemy[j]){
						enemy[j] == "　";
						break;
					}
				}
			}
			return true;
		}else{
			return false;
		}
	}
	
}

function disp_fifty(){
	var p_fif = "";
	var e_fif = "";
	for(var i = 0; i < 45; i++){
		if(i == 10){
			p_fif = p_fif + player[i] + "<br>" + "　　";
			e_fif = e_fif + enemy[i] + "<br>" + "　　";
		}else if(i == 11){
			p_fif = p_fif + player[i] + "　";
			e_fif = e_fif + enemy[i] + "　";
		}else if(i == 18){
			p_fif = p_fif + player[i] + "<br>" + "　　";
			e_fif = e_fif + enemy[i] + "<br>" + "　　";
		}else if(i == 27){
			p_fif = p_fif + player[i] + "<br>" + "　　";
			e_fif = e_fif + enemy[i] + "<br>" + "　　";
		}else if(i == 28){
			p_fif = p_fif + player[i] + "　";
			e_fif = e_fif + enemy[i] + "　";
		}else if(i == 35){
			p_fif = p_fif + player[i] + "<br>" + "　　";
			e_fif = e_fif + enemy[i] + "<br>" + "　　";
		}else{
			p_fif = p_fif + player[i];
			e_fif = e_fif + enemy[i];
		}
	}
	player_fif.innerHTML = p_fif;
	enemy_fif.innerHTML = e_fif;
}

startBtn.onclick = function(){
	attention.innerHTML = "<br>";
	recognition.start();
}
stopBtn.onclick = function(){
	recognition.stop();
}

enter.onclick = function(){
	judge();
}
