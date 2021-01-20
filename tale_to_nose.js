const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const enter = document.getElementById('enter-btn');
const resultDiv = document.getElementById('result-div');
const enemy_word = document.getElementById('enemy_word');
const enemy_read = document.getElementById('enemy_read');
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
	attention.innerHTML = "ファイル読み込み中";
	
	req.onload = function(){
	convertCSVtoArray(req.responseText);
	}
}

function convertCSVtoArray(str){
	var tmp = str.split("\n");
	for(var i = 0; i < tmp.length; i++) dict[i] = tmp[i].split(',');
	attention.innerHTML = "";
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

function search_n_disp(){
	var rand = Math.floor(Math.random() * 1130528);
	var word = shiri_letter.textContent;
	if(rand % 2 == 0){
		for(var i = rand; i < dict.length; i = Math.floor(i * 1.001)){
			if(word == dict[i][1].substr(0 , 1) && dict[i][1].substr(dict[i][1].length - 2 , 1) != 'ン'){
				console.log(dict[i][1]);
				if(check_letter(extraction_word(dict[i][1]) , 1) == true){
					enemy_word.innerHTML = dict[i][0];
					enemy_read.innerHTML = dict[i][1];
					const uttr = new SpeechSynthesisUtterance(dict[i][0]);
					speechSynthesis.speak(uttr);
					shiri_letter.innerHTML = extraction_word(dict[i][1]).substr(dict[i][1].length - 2 , 1);
					return;
				}
			}
		}
	}else{
		for(var i = rand; i > 0; i = Math.floor(i / 1.001)){
			if(word == dict[i][1].substr(0 , 1) && dict[i][1].substr(dict[i][1].length - 2 , 1) != 'ン'){
				console.log(i);
				if(check_letter(extraction_word(dict[i][1]) , 1) == true){
					enemy_word.innerHTML = dict[i][0];
					enemy_read.innerHTML = dict[i][1];
					const uttr = new SpeechSynthesisUtterance(dict[i][0]);
					speechSynthesis.speak(uttr);
					shiri_letter.innerHTML = extraction_word(dict[i][1]).substr(dict[i][1].length - 2 , 1);
					return;
				}
			}
		}
	}
	search_n_disp(word);
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
	if(word.substr(0 , 1) != shiri_letter.textContent || word.substr((word.length - 2) , 1) == "ン"){
		attention.innerHTML = "有効な単語を入力してください!!";
		enter.disabled = true;
	}else{
		if(check_letter(word , 0) == true){
			console.log(word.length);
			shiri_letter.innerHTML = word.substr((word.length - 2) , 1);
			search_n_disp();
		}
	}
}

function check_letter(word , option){
	if(option == 0){
		console.log(word);
		var tmp = player.slice();
		for(var i = 1; i < word.length - 1; i++){
			for(var j = 0; j < 45; j++){
				if(word.substr(i , 1) == tmp[j]){
					tmp[j] = "　";
					break;
				}
				if(j == 44){
					console.log(i);
					attention.innerHTML = "もう使えない文字が含まれています";
					disp_fifty();
					return false;
				}
			}
		}
		for(var j = 0; j < 45; j++){
			player[j] = tmp[j];
		}
		console.log(player);
		disp_fifty();
		return true;
	}else{
		var tmp = enemy.slice();
		for(var i = 1; i < word.length - 1; i++){
			for(var j = 0; j < 45; j++){
				if(word.substr(i , 1) == tmp[j]){
					tmp[j] = "　";
					break;
				}
				if(j == 44){
					return false;
				}
			}
		}
		console.log(tmp);
		for(var j = 0; j < 45; j++){
			enemy[j] = tmp[j];
		}
		disp_fifty();
		return true;
	}
	
}

function disp_fifty(){
	var p_fif = "";
	var e_fif = "";
	var p = 0;
	var e = 0;

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
	for(var i = 0; i < 45; i++){
		if(player[i] != "　") p++;
		if(enemy[i] != "　") e++;
	}
	if(p == 0){
		attention.innerHTML = "あなたの勝ちです!!!!";
	}
	if(e == 0){
		attention.innerHTML = "あなたの負けです!!!!";
	}
}

startBtn.onclick = function(){
	attention.innerHTML = "";
	recognition.start();
}
stopBtn.onclick = function(){
	recognition.stop();
}

enter.onclick = function(){
	judge();
}
