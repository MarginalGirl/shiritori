import re

tango = open("tango.txt", "r", encoding="utf_8")
yomigana = open("yomigana.txt", "r", encoding="utf_8")
tangojs = open("tango.js", "w", encoding="utf_8")

head_kana = ['ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ'
			,'タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ'
			,'マ','ミ','ム','メ','モ','ヤ','ユ','ヨ','ラ','リ','ル','レ','ロ','ワ']


def write_js(tate,yoko,tango):
	str_i = str(tate)
	str_j = str(yoko)
	tangojs.write("tango[" + str_i + "][" + str_j + "] = \"" + tango + "\";\n")


i = 0

for kana in head_kana:
	j = 0
	tangojs.write("var tango" + str(j) +  " = [\n")
	while True:
		line1 = tango.readline()
		if line1:
			line2 = yomigana.readline()
			m = re.search('ン',line2)
			n = re.search('[a-z]|[あ-ん]|[ａ-ｚ]',line1)
			if(n == None):
				if(m == None):
					if(line2.find(kana) == 0):
						write_js(i,j,line1.replace('\n',''))
						j = j + 1
				elif(m.start() != line2.find('ン')):
					if(line2.find(kana) == 0):
						write_js(i,j,line1.replace('\n',''))
						j = j + 1

		else:
			tango.seek(0,0)
			yomigana.seek(0,0)
			break
	i = i + 1

tango.close()
yomigana.close()
tangojs.close()