	var canvas = document.getElementById('canvas');
	var c = canvas.getContext('2d');

	//--------------=fnex massive=-------------------------------------



	var fnum = [];//source массив, который задается пользователем
	var rsource = [];//2d source массив, который задется пользователем

	var leng;//длинна(ширина) массива=-
	var iter;//колличество итераций=-
	var size = 1;//величина точки=-


	var num = [];//первичный массив для вычислений
	var bufer = [];//массив буфер для вычислений
	var fnexm = [];//результатирующий массив для закраски

	var fnexmask = [];//массив маска

	//-------------------------------------------colors
	

	//------------------------------------------
	


var inlenga = document.getElementById('le').value;//получение ширины массива(длинна начального массива)

for (var i = 0; i < inlenga; i++) {//fnum заполняется нулями
	fnum[i] = 0;	
}
//document.getElementById("infolog").innerHTML = fnum;//masive state

var cfnum;
function manfill(){
	cfnum = fnum;
	var elnumber = document.getElementById('element').value;//ввод номера элемента
	var val = document.getElementById('vl').value;//ввод значения элемента
	cfnum[elnumber] = val;
	//document.getElementById("infolog").innerHTML = cfnum;//masive state
}

var st;//структура, калейдоскопическая форма отображения ковра
var in_leng;//длинна ряда, шинрина width матрицы
var in_iter;//высота матрицы или колличество итераций-рядов
//var canvas.width;//задаем ширину канваса
//var canvas.height;//задаем высоту канваса

var dm;

function loading(){
	//var ctx = document.getElementById('canvas').getContext('2d');
  	c.font = '48px serif';
  	c.fillText('Wait', 10, 50);
	
}

//loading();



function myFunction(sp){


	st = document.getElementById('structure').value;//структура, калейдоскопическая форма отображения ковра
	in_leng = document.getElementById('le').value;//длинна ряда, шинрина width матрицы
	in_iter = document.getElementById('it').value;//высота матрицы или колличество итераций-рядов
	canvas.width = in_leng;//задаем ширину канваса значение копируем из размера массива
	canvas.height = in_iter;//задаем высоту канваса, так же
	
	

	
	if (st === "mr"){
		dm = 2;
	}else if (st === "mr45"){
		dm = 1;
	}else if (st === "mstar"){
		dm = 2;
		canvas.width = in_leng-1;
		canvas.height = in_iter-1;
	}else if (st === "mr2"){
		dm =2;
	}else if (st === "mstar2"){
		dm = 2;
		canvas.width = in_leng-1;
		canvas.height = in_iter-1;
	}else if (st === "mstar3"){
		dm = 2;
		canvas.width = in_leng-1;
		canvas.height = in_iter-1;
	}else if (st === "carpetx"){
		dm = 2;
	}else if (st === "cx_star"){
		dm = 4;
		canvas.width = in_leng-3;
		canvas.height = in_iter-3;
	}else if (st === "cx_flower"){
		dm = 4;
		canvas.width = in_leng-3;
		canvas.height = in_iter-3;
	}else if (st === "cx_rose"){
		dm = 4
		canvas.width = in_leng-3;
		canvas.height = in_iter-3;
	}else{
		dm = 1;//for original
	}

	//коррекция бага нечетности
	var cr = 0;//0-коррекция отключена,1-включена.
	if (in_leng % 2 == 0){
		leng = in_leng/dm;//если стоковая ширина чётная, то в leng передается без изменений
	}else{
		leng = (in_leng-cr)/dm;//если стоковая ширина нечетная, leng уменьшается на cr до четного значения
	}
	iter = in_iter/dm;

	var last_element = leng-1;
	document.getElementById("max_element").innerHTML = "Last element #: "+last_element;
	

	function getRandomInt(min, max) { //генератор случайных чисел
   		return Math.floor(Math.random() * (max - min)) + min;
	}

	//ф. для чтения числового массива из файла
	function readfrom(textfile){	
			var amp = document.getElementById('amp').value;
			function getXmlHttp() {
			    var xmlhttp;
			    try {
			        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
			    } catch (e) {
			        try {
			            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			        } catch (E) {
			            xmlhttp = false;
			        }
			    }
			    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
			        xmlhttp = new XMLHttpRequest();
			    }
			    return xmlhttp;
			}

			(function () {
				
			    var xmlhttp = getXmlHttp();
			    xmlhttp.open('GET', textfile, false);
			    xmlhttp.send(null);
			    if (xmlhttp.status == 200) {
			        var response = xmlhttp.responseText;
			        //alert(response);
			        //var via = document.getElementById("mv").value;
			        for (var i = 0; i < leng; i++) {
			        	
						fnum[i] = Math.pow(response[i],amp);

					}
			    }
			    //document.getElementById("info").innerHTML = response;
			})();
	}



	//-=заполнение fnum числами=-"random"101,"pii"110,etc
		
		var sp;

		if (sp === 101) {//random

			var strange = document.getElementById('stg').value;
			var mn = document.getElementById('min').value;
			var mx = document.getElementById('max').value;
			for (var i = 0; i < leng; i++) {
				fnum[i] = getRandomInt(mn,mx)/strange;//fill fnum with random things
			}
			//document.getElementById("infolog").innerHTML = fnum;//masive state

		}else if(sp === 012){//custom
			fnum = cfnum;
			//document.getElementById("infolog").innerHTML = fnum;//masive state
			//manfill();
			
			
		}else if(sp === 110){//digits of pi
			readfrom('pi3n.txt');//читаем массив числа "пи" из файла
			//document.getElementById("infolog").innerHTML = fnum;//masive state

			
		}else if(sp === 011){//second massive
			var nj = document.getElementById('njj').value;
			fnum = fnexm[nj];
			//
			//fnexmask = fnexm;

		}else if(sp === 210){//second mask
			
			
				fnexmask = fnexm;	
			
		}

	//=======================RESEARCH======
	//console.log(fnum+"-входной массив");
	//=====================================

	//-=массивы для вычисления=-
	
	//var num = [];
	//var bufer = [];
	//var fnexm = [];

	//-===========================================вычисление=-

	//Classic functions
	function canum_classic(){
		bufer[i] = Math.abs(num[i]-num[i+1]);//разница элемента и следущего элемента num по модулю, результат заносится в элемент буферного массива
		bufer[leng-1] = Math.abs(num[leng-1]-num[0]);//вычисляется разница между последним и первым элементом num массива, результат - последний эл. буф. м.
	}

	function canum_reverse(){
		bufer[i] = Math.abs(num[i]-num[i-1]);
		bufer[0] = Math.abs(num[0]-num[leng-1]);
	}

	function ExTN(){
		bufer[i] = Math.abs(num[i]-num[i+1]);//
		bufer[leng-1] = Math.abs(num[leng-1]-bufer[0]);//
	}	

	//Complex functions

	function cnm_2RComplex(){
		if (i % 2 == 0){
			bufer[i] = Math.abs(num[i]-num[i+2]);
			bufer[leng-2] = Math.abs(num[leng-2]-num[0]);
		}else{
			bufer[i] = Math.abs(num[i]-num[i+2]);//
			bufer[leng-1] = Math.abs(num[0+1]-num[leng-1]);//
		}
	}

	function cnm_2LComplex(){
		if (i % 2 == 0){
			bufer[i] = Math.abs(num[i]-num[i-2]);
			bufer[0] = Math.abs(num[leng-2]-num[0]);
		}else{
			bufer[i] = Math.abs(num[i]-num[i-2]);//
			bufer[0+1] = Math.abs(num[0+1]-num[leng-1]);//
		}
	}

	function cnm_xRLDC(){
		if (i % 2 == 0){
									//2R Complex 0
			bufer[i] = Math.abs(num[i]-num[i+2]);
			bufer[leng-2] = Math.abs(num[leng-2]-num[0]);
		}else{
									//2L Complex 1
			bufer[i] = Math.abs(num[i]-num[i-2]);//
			bufer[0+1] = Math.abs(num[0+1]-num[leng-1]);//
		}
	}

	function cnm_oRLDC(){
		if (i % 2 == 0){
									//from 2R
			bufer[i] = Math.abs(num[i]-num[i-2]);//
			bufer[0] = Math.abs(num[0]-num[leng-2]);//
									
		}else{
									//from 2L
			bufer[i] = Math.abs(num[i]-num[i+2]);
			bufer[leng-1] = Math.abs(num[leng-1]-num[0+1]);
		}
	}

	/*function RandomFnex(){
		//rsource[i] = getRandomInt(0,2);//заполнение rsource ряда рандомными 0 1 числами
		//var dpnmaxcolor = document.getElementById('11c').value;
		

		if (sp === 210){
			rsource[i] = fnexmask[j][i];
			//num[i] = fnexmask[j][i];
		} else {
			rsource[i] = getRandomInt(mn,mx)/strange;//заполнение rsource ряда рандомными числами
		}



		//if( Math.abs(num[i]-num[i+1]) === rsource[i] ){
		if( rsource[i] == Math.abs(num[i]-num[i+1]) ){	
			//bufer[i] = rsource[i];
			//bufer[i] = getRandomInt(mn,dpnmaxcolor);
			bufer[i] = 1;
		}else{
			bufer[i] = 0;
		}


		//if( Math.abs(num[leng-1]-num[0]) === rsource[leng-1] ){
		if( rsource[leng-1] == Math.abs(num[leng-1]-num[0]) ){
			//bufer[leng-1] = rsource[leng-1];
			//bufer[leng-1] = getRandomInt(mn,dpnmaxcolor);
			bufer[leng-1] = 1;

		}else{
			bufer[leng-1] = 0;
		}

		//
		

	}*/

	/*function RandomFnex(){
		//rsource[i] = getRandomInt(0,2);//заполнение rsource ряда рандомными 0 1 числами
		//var dpnmaxcolor = document.getElementById('11c').value;
		

		if (sp === 210){
			rsource[i] = fnexmask[j][i];
			//num[i] = fnexmask[j][i];
		} else {
			rsource[i] = getRandomInt(mn,mx)/strange;//заполнение rsource ряда рандомными числами
		}



		//if( Math.abs(num[i]-num[i+1]) === rsource[i] ){
		if( rsource[i] == Math.abs(num[i]-num[i+1]) ){	
			//bufer[i] = rsource[i];
			//bufer[i] = rsource[i]+1;
			//bufer[i] = getRandomInt(mn,dpnmaxcolor);
			bufer[i] = 1;
		}else{
			bufer[i] = 0;
		}


		//if( Math.abs(num[leng-1]-num[0]) === rsource[leng-1] ){
		if( rsource[leng-1] == Math.abs(num[leng-1]-num[0]) ){
			//bufer[leng-1] = rsource[leng-1];
			//bufer[leng-1] = rsource[leng-1]+1;
			//bufer[leng-1] = getRandomInt(mn,dpnmaxcolor);
			bufer[leng-1] = 1;

		}else{
			bufer[leng-1] = 0;
		}

		//

	}*/

	function RandomFnex(){
		//rsource[i] = getRandomInt(0,2);//заполнение rsource ряда рандомными 0 1 числами
		//var dpnmaxcolor = document.getElementById('11c').value;
		

		if (sp === 210){
			rsource[i] = fnexmask[j][i];
			//num[i] = fnexmask[j][i];
		} else {
			rsource[i] = getRandomInt(mn,mx)/strange;//заполнение rsource ряда рандомными числами
		}



		//if( Math.abs(num[i]-num[i+1]) === rsource[i] ){
		if( rsource[i] == Math.abs(num[i]-num[i+1]) ){	
			//bufer[i] = rsource[i];
			//bufer[i] = rsource[i]+1;
			//bufer[i] = getRandomInt(mn,dpnmaxcolor);
			bufer[i] = 1;
		}else{
			bufer[i] = 0;
		}


		//if( Math.abs(num[leng-1]-num[0]) === rsource[leng-1] ){
		if( rsource[leng-1] == Math.abs(num[leng-1]-num[0]) ){
			//bufer[leng-1] = rsource[leng-1];
			//bufer[leng-1] = rsource[leng-1]+1;
			//bufer[leng-1] = getRandomInt(mn,dpnmaxcolor);
			bufer[leng-1] = 1;

		}else{
			bufer[leng-1] = 0;
		}

		//

	}

	function RandomMassive(){
		bufer[i] = getRandomInt(mn,mx)/strange;
	}





	

	if (sp === 210){
		num = fnexmask[0];
	}else{
		num = fnum;//заносим source массив в num массив для вычислений
	}

	for (var j = 0; j < iter; j++) {

		
			
		for (var i = 0; i < leng; i++) {


				var clfun = document.getElementById('calc_fun').value;//выбор функции развертки
				switch(clfun){
					case 'clf1':
						canum_classic();//обращаемся к классической функции
					break;

					case 'clf1.1':
						ExTN();//
					break;	

					case 'clf2':
						canum_reverse();	
					break;
					//===================================================
					case 'clf3':
					//Dual (classic and reverse)
						if (j % 2 == 0){
							canum_classic();
						}else{
							canum_reverse();
						}
					break;

					case 'clf4':
					//Dynamic
						if (num[i] % 2 == 0){
							canum_reverse();
						}else if(num[i] % 3 == 0){
							bufer[0] = Math.abs((num[0]+num[leng-1])-num[0]);//
							bufer[i] = Math.abs((num[i]+num[i-1])-num[i+1]);//
							bufer[leng-1] = Math.abs((num[leng-1]+num[leng-2])-num[0]);//
						}else{
							canum_classic();	
						}
					break;

					case 'clf5':
						//dual+
						if (j % 2 == 0){
							canum_classic();
						}else{
							//Reverse+
							bufer[i] = Math.abs(num[i]+num[i-1]);//
							bufer[0] = Math.abs(num[0]+num[leng-1]);//
						}
					break;

					case 'clf6':
						cnm_2RComplex();
					break;

					case 'clf7':
						cnm_2LComplex();
					break;

					case 'clf8':
						//RL-Complex (2R and 2L)
						if (j % 2 == 0){
							cnm_2RComplex();
						}else{
							cnm_2LComplex();
						}
					break;

					case 'clf9':
						cnm_xRLDC();
					break;

					case 'clf10':
						cnm_oRLDC();
					break;

					case 'clf11':
					//xoRLDCj
						if (j % 2 == 0){
							cnm_xRLDC();	
						}else{					
							cnm_oRLDC();
						}

					break;

					case 'clf12':
					//Dynamic xoRLDC(x1o0)
						if (num[i] % 2 != 0){
							cnm_xRLDC();
						}else if (num[i] % 2 == 0){
							cnm_oRLDC();
						}
					break;

					case 'clf13':
					//Dynamic xoRLDC
						if (num[i] % 2 == 0){
							cnm_xRLDC();
						}else if (num[i] % 2 != 0){
							cnm_oRLDC();
						}

					break;

					

					case 'clf15':
						//3c
						if (j % 2 == 0){
							bufer[i] = Math.abs(num[i]-num[i+3]);
							bufer[leng-2] = Math.abs(num[leng-2]-num[0+1]);
						}else{
							bufer[i] = Math.abs(num[i]-num[i-3]);
							bufer[0+1] = Math.abs(num[0+1]-num[leng-2]);

						}
						
							
						
					break;

					case 'clf16':
						if (j % 2 == 0){
							//===============
								if (num[i] % 2 != 0){
									cnm_xRLDC();
								}else if (num[i] % 2 == 0){
									cnm_oRLDC();
								}

							
							//===============
						}else if (j % 2 != 0){
							//===============
								if (num[i] % 2 == 0){
									cnm_xRLDC();
								}else if (num[i] % 2 != 0){
									cnm_oRLDC();
								}

							//===============
							

						}

					break;

					case 'clf17':
						RandomFnex();
					break;

					case 'clf18':
						RandomMassive();
					break;							
				}
			

			
				
			


		}	

			
			// console.log("num:"+num);
			// console.log(".............");
			// console.log("bufer:"+bufer);
			// console.log("rsource:"+rsource);
			// console.log(".............");

			fnexm[j] = bufer;//сохраняем данные из буфера в результатирующий массив
			bufer = [];//очищаем буфер
			rsource = [];//очищаем rsource
			num = fnexm[j];//заносим результатирующий массив в первичный массив num для последующего вычисления

			//======================================RESEARCH
			//var str = fnexm[j].join('');
			//var dec_view = parseInt(str, 2);//десятичный вид строки

			//console.log(fnexm[j]+"   "+dec_view);
			console.log("new num:"+num);
			console.log("fnexm jayyyyyy:"+fnexm[j]);//
			console.log("___________________________________________");

			//console.log(dec_view);
			//===============================================
	};
	/*console.log("_____________");
	console.log("fnexmask0:"+fnexmask[0]);
	console.log("_____________");*/

	fnexmask = [];//clear fnexmask
	//======================вывод информации======================================
	///document.getElementById("fnumt").innerHTML = "Top row: "+fnum;
	//document.getElementById("info").innerHTML = iv;
	//============================================================================

};//end of myfunction




//-=========================graphics===============================================-

//================project-spiral================





	
//document.getElementById('1color').value = "green";
//document.getElementById("fnumt").innerHTML = "2color: "+c2+"; "+"3color: "+c3+"; "+"4color: "+c4+"; "+"5color: "+c5+"; "+"6color: "+c6+"; "+"7color: "+c7+"; ";

	var uleng = in_leng/dm;
	function mcVisual() {
		//==============================================colors
		var bground = document.getElementById('bgcolor').value;
		var onecolor = document.getElementById('1color').value;
		var c2 = document.getElementById('2color').value;//orange #ffa500
		var dpn2 = document.getElementById('2c').value;

		var c3 = document.getElementById('3color').value;//purple #800080
		var dpn3 = document.getElementById('3c').value;

		var c4 = document.getElementById('4color').value;//yellow #ffff00
		var dpn4 = document.getElementById('4c').value;

		var c5 = document.getElementById('5color').value;
		var dpn5 = document.getElementById('5c').value;

		var c6 = document.getElementById('6color').value;
		var dpn6 = document.getElementById('6c').value;

		var c7 = document.getElementById('7color').value;
		var dpn7 = document.getElementById('7c').value;

		var c8 = document.getElementById('8color').value;
		var dpn8 = document.getElementById('8c').value;

		var c9 = document.getElementById('9color').value;
		var dpn9 = document.getElementById('9c').value;

		var c10 = document.getElementById('10color').value;
		var dpn10 = document.getElementById('10c').value;

		var c11 = document.getElementById('11color').value;
		var dpn11 = document.getElementById('11c').value;

		
		c.clearRect(0,0,canvas.width,canvas.height);

		

		for(var j=0; j<iter; j++){
			for(var i=0; i<leng; i++) { 
				var dp = fnexm[j][i];

				function cfR(st){
					var mleng = iter-1;
					if (st === "mr"){//mirrors
						var lisizex = leng*2-(1+i*size);
						var ljsy = iter*2-(1+j*size);
						c.fillRect(i*size, j*size, 1*size, 1*size);
						c.fillRect(lisizex, j*size, 1*size, 1*size);
						c.fillRect(lisizex, ljsy, 1*size, 1*size);
						c.fillRect(i*size, ljsy, 1*size, 1*size);
					}else if(st === "mr2"){
						var lisizex2 = leng*1-(1+i*size);
						var ljsy2 = iter*2-(1+j*size);

						c.fillRect(lisizex2, j*size, 1*size, 1*size);
						c.fillRect(leng+i*size, j*size, 1*size, 1*size);
						
						c.fillRect(lisizex2, ljsy2, 1*size, 1*size);
						c.fillRect(leng+i*size, ljsy2, 1*size, 1*size);

					}else if(st === "mr45"){
						
						c.fillRect(mleng-j*size, mleng-i*size, 1*size, 1*size);
						c.fillRect(i*size, j*size, 1*size, 1*size);


					}else if(st === "mstar2"){
						
						
						c.fillRect(mleng-j*size, i*size, 1*size, 1*size);//A1
						c.fillRect(mleng+j*size, i*size, 1*size, 1*size);//B1
						c.fillRect(i*size, mleng-j*size, 1*size, 1*size);//A2
						c.fillRect(i*size, mleng+j*size, 1*size, 1*size);//D2
						c.fillRect(mleng*2-(mleng+j*size), mleng*2-(i*size), 1*size, 1*size);//D1
						c.fillRect(mleng*2-(mleng-j*size), mleng*2-(i*size), 1*size, 1*size);//C1
						c.fillRect(mleng*2-(i*size), (mleng+j*size), 1*size, 1*size);//C2
						c.fillRect(mleng*2-(i*size), (mleng-j*size), 1*size, 1*size);//B2

					}else if(st === "mstar3"){//Flower
						
						c.fillRect(mleng+i*size, j*size, 1*size, 1*size);//B1.1
						c.fillRect(mleng*2-(j*size), (mleng-i*size), 1*size, 1*size);//B2

						
						c.fillRect(mleng-i*size, j*size, 1*size, 1*size);//A1.1
						c.fillRect(j*size, mleng-i*size, 1*size, 1*size);//A2.1/

						
						c.fillRect(mleng-i*size, mleng*2-j*size, 1*size, 1*size);//D2.1
						c.fillRect(j*size, mleng+i*size, 1*size, 1*size);//D1.1

						
						c.fillRect(mleng*2-(mleng-i*size), mleng*2-(j*size), 1*size, 1*size);//C1.1
						c.fillRect(mleng*2-j*size, mleng+(i*size), 1*size, 1*size);//C2.1
					
					}else if (st === "carpetx"){//experimental
						//c.fillRect(j*size, i*size, 1*size, 1*size);//A1
						//c.fillRect(mleng-i*size, mleng-j*size, 1*size, 1*size);//A2

						c.fillRect(mleng-j*size, mleng+i*size, 1*size, 1*size);//A1p
						c.fillRect(mleng-i*size, mleng+j*size, 1*size, 1*size);//A2p

						c.fillRect(mleng*1+i*size, mleng+j*size, 1*size, 1*size);
						c.fillRect(mleng*1+j*size, mleng+i*size, 1*size, 1*size);

						c.fillRect(mleng-j*size, mleng-i*size, 1*size, 1*size);
						c.fillRect(mleng-i*size, mleng-j*size, 1*size, 1*size);

						c.fillRect(mleng+j*size, mleng-i*size, 1*size, 1*size);
						c.fillRect(mleng+i*size, mleng-j*size, 1*size, 1*size);


						c.fillRect(mleng*2-i*size, j*size, 1*size, 1*size);
						c.fillRect(mleng*2-j*size, i*size, 1*size, 1*size);

						c.fillRect(i*size, j*size, 1*size, 1*size);
						c.fillRect(j*size, i*size, 1*size, 1*size);

						c.fillRect(j*size, mleng*2-i*size, 1*size, 1*size);
						c.fillRect(i*size, mleng*2-j*size, 1*size, 1*size);

						c.fillRect(mleng*2-i*size, mleng*2-j*size, 1*size, 1*size);
						c.fillRect(mleng*2-j*size, mleng*2-i*size, 1*size, 1*size);


						
					}else if (st === "cx_star"){

						c.fillRect(j*size, mleng-i*size, 1*size, 1*size);//A1
						c.fillRect(mleng-i*size, j*size, 1*size, 1*size);//A2

						c.fillRect(mleng*2-i*size, mleng-j*size, 1*size, 1*size);//B1
						c.fillRect(mleng+i*size, j*size, 1*size, 1*size);//B2

						c.fillRect(mleng*2+i*size, mleng-j*size, 1*size, 1*size);//C1
						c.fillRect(mleng*3-i*size, j*size, 1*size, 1*size);//C2

						c.fillRect(mleng*3+i*size, j*size, 1*size, 1*size);//D2
						c.fillRect(mleng*4-j*size, mleng-i*size, 1*size, 1*size);//D1

						c.fillRect(mleng*4-j*size, mleng+i*size, 1*size, 1*size);//E1
						c.fillRect(mleng*3+j*size, mleng*2-i*size, 1*size, 1*size);//E2

						c.fillRect(mleng*3+j*size, mleng*2+i*size, 1*size, 1*size);//F2
						c.fillRect(mleng*4-j*size, mleng*3-i*size, 1*size, 1*size);//F1

						c.fillRect(mleng*4-j*size, mleng*3+i*size, 1*size, 1*size);//G1
						c.fillRect(mleng*3+i*size, mleng*4-j*size, 1*size, 1*size);//G2

						c.fillRect(mleng*3-i*size, mleng*4-j*size, 1*size, 1*size);//H2
						c.fillRect(mleng*2+i*size, mleng*3+j*size, 1*size, 1*size);//H1

						c.fillRect(mleng*2-i*size, mleng*3+j*size, 1*size, 1*size);//K1
						c.fillRect(mleng+i*size, mleng*4-j*size, 1*size, 1*size);//K2

						c.fillRect(mleng-i*size, mleng*4-j*size, 1*size, 1*size);//L2
						c.fillRect(j*size, mleng*3+i*size, 1*size, 1*size);//L1

						c.fillRect(j*size, mleng*3-i*size, 1*size, 1*size);//M1
						c.fillRect(mleng-j*size, mleng*2+i*size, 1*size, 1*size);//M2

						c.fillRect(mleng-j*size, mleng*2-i*size, 1*size, 1*size);//N2
						c.fillRect(j*size, mleng+i*size, 1*size, 1*size);//N1
						//
						c.fillRect(mleng*2-j*size, mleng+i*size, 1*size, 1*size);//b
						c.fillRect(mleng+i*size, mleng*2-j*size, 1*size, 1*size);//n
						c.fillRect(mleng+i*size, mleng*2+j*size, 1*size, 1*size);//m
						c.fillRect(mleng*2-j*size, mleng*3-i*size, 1*size, 1*size);//k
						c.fillRect(mleng*2+j*size, mleng*3-i*size, 1*size, 1*size);//h
						c.fillRect(mleng*3-i*size, mleng*2+j*size, 1*size, 1*size);//f
						c.fillRect(mleng*3-i*size, mleng*2-j*size, 1*size, 1*size);//e
						c.fillRect(mleng*2+j*size, mleng+i*size, 1*size, 1*size);//c

					}else if (st === "cx_flower"){

						c.fillRect(j*size, mleng-i*size, 1*size, 1*size);//A1
						c.fillRect(mleng-i*size, j*size, 1*size, 1*size);//A2

						c.fillRect(mleng*2-i*size, mleng-j*size, 1*size, 1*size);//B1
						c.fillRect(mleng+i*size, j*size, 1*size, 1*size);//B2

						//c.fillRect(mleng*2+j*size, mleng-i*size, 1*size, 1*size);//C1
						c.fillRect(mleng*2+i*size, mleng-j*size, 1*size, 1*size);//C1
						c.fillRect(mleng*3-i*size, j*size, 1*size, 1*size);//C2

						c.fillRect(mleng*3+i*size, j*size, 1*size, 1*size);//D2
						c.fillRect(mleng*4-j*size, mleng-i*size, 1*size, 1*size);//D1

						c.fillRect(mleng*4-j*size, mleng+i*size, 1*size, 1*size);//E1
						c.fillRect(mleng*3+j*size, mleng*2-i*size, 1*size, 1*size);//E2

						c.fillRect(mleng*3+j*size, mleng*2+i*size, 1*size, 1*size);//F2
						c.fillRect(mleng*4-j*size, mleng*3-i*size, 1*size, 1*size);//F1

						c.fillRect(mleng*4-j*size, mleng*3+i*size, 1*size, 1*size);//G1
						c.fillRect(mleng*3+i*size, mleng*4-j*size, 1*size, 1*size);//G2

						c.fillRect(mleng*3-i*size, mleng*4-j*size, 1*size, 1*size);//H2
						c.fillRect(mleng*2+i*size, mleng*3+j*size, 1*size, 1*size);//H1

						c.fillRect(mleng*2-i*size, mleng*3+j*size, 1*size, 1*size);//K1
						c.fillRect(mleng+i*size, mleng*4-j*size, 1*size, 1*size);//K2

						c.fillRect(mleng-i*size, mleng*4-j*size, 1*size, 1*size);//L2
						c.fillRect(j*size, mleng*3+i*size, 1*size, 1*size);//L1

						c.fillRect(j*size, mleng*3-i*size, 1*size, 1*size);//M1
						c.fillRect(mleng-j*size, mleng*2+i*size, 1*size, 1*size);//M2

						c.fillRect(mleng-j*size, mleng*2-i*size, 1*size, 1*size);//N2
						c.fillRect(j*size, mleng+i*size, 1*size, 1*size);//N1
						//
						c.fillRect(mleng*2-i*size, mleng+j*size, 1*size, 1*size);//b
						c.fillRect(mleng+j*size, mleng*2-i*size, 1*size, 1*size);//n
						c.fillRect(mleng+j*size, mleng*2+i*size, 1*size, 1*size);//m
						c.fillRect(mleng*2-i*size, mleng*3-j*size, 1*size, 1*size);//k
						c.fillRect(mleng*2+i*size, mleng*3-j*size, 1*size, 1*size);//h
						c.fillRect(mleng*3-j*size, mleng*2+i*size, 1*size, 1*size);//f
						c.fillRect(mleng*3-j*size, mleng*2-i*size, 1*size, 1*size);//e
						c.fillRect(mleng*2+i*size, mleng+j*size, 1*size, 1*size);//c

					}else if (st === "cx_rose"){
						c.fillRect(j*size, mleng-i*size, 1*size, 1*size);//t1
						c.fillRect(mleng-i*size, j*size, 1*size, 1*size);//t2

						c.fillRect(mleng+i*size, mleng-j*size, 1*size, 1*size);//t3
						c.fillRect(mleng*2-j*size, i*size, 1*size, 1*size);//t4
						c.fillRect(mleng*2+j*size, i*size, 1*size, 1*size);//t5
						c.fillRect(mleng*3-i*size, mleng-j*size, 1*size, 1*size);//t6

						c.fillRect(mleng*3+i*size, j*size, 1*size, 1*size);//t7
						c.fillRect(mleng*4-j*size, mleng-i*size, 1*size, 1*size);//t8

						c.fillRect(mleng*3+j*size, mleng+i*size, 1*size, 1*size);//t9
						c.fillRect(mleng*4-i*size, mleng*2-j*size, 1*size, 1*size);//t10
						c.fillRect(mleng*4-i*size, mleng*2+j*size, 1*size, 1*size);//t11
						c.fillRect(mleng*3+j*size, mleng*3-i*size, 1*size, 1*size);//t12

						c.fillRect(mleng*4-j*size, mleng*3+i*size, 1*size, 1*size);//t13
						c.fillRect(mleng*3+i*size, mleng*4-j*size, 1*size, 1*size);//t14

						c.fillRect(mleng*3-i*size, mleng*3+j*size, 1*size, 1*size);//t15
						c.fillRect(mleng*2+j*size, mleng*4-i*size, 1*size, 1*size);//t16
						c.fillRect(mleng*2-j*size, mleng*4-i*size, 1*size, 1*size);//t17
						c.fillRect(mleng+i*size, mleng*3+j*size, 1*size, 1*size);//t18

						c.fillRect(mleng-i*size, mleng*4-j*size, 1*size, 1*size);//t19
						c.fillRect(j*size, mleng*3+i*size, 1*size, 1*size);//t20

						c.fillRect(mleng-j*size, mleng*3-i*size, 1*size, 1*size);//t21
						c.fillRect(i*size, mleng*2+j*size, 1*size, 1*size);//t22
						c.fillRect(i*size, mleng*2-j*size, 1*size, 1*size);//t23
						c.fillRect(mleng-j*size, mleng+i*size, 1*size, 1*size);//t24

						c.fillRect(mleng+j*size, mleng*2-i*size, 1*size, 1*size);//t25
						c.fillRect(mleng*2-i*size, mleng+j*size, 1*size, 1*size);//t26
						c.fillRect(mleng*2+i*size, mleng+j*size, 1*size, 1*size);//t27
						c.fillRect(mleng*3-j*size, mleng*2-i*size, 1*size, 1*size);//t28
						c.fillRect(mleng*3-j*size, mleng*2+i*size, 1*size, 1*size);//t29
						c.fillRect(mleng*2+i*size, mleng*3-j*size, 1*size, 1*size);//t30
						c.fillRect(mleng*2-i*size, mleng*3-j*size, 1*size, 1*size);//t31
						c.fillRect(mleng+j*size, mleng*2+i*size, 1*size, 1*size);//t32


					}else{
						c.fillRect(i*size, j*size, 1*size, 1*size);	//original
					}
					
				}

				if (dp % 2 == 0) {//remain as bground(bgcolor)
					c.fillStyle = bground;//L0
					cfR(st);
					} else if(dp >= dpn11){
						c.fillStyle = c11;
						cfR(st);

					} else if(dp >= dpn10){
						c.fillStyle = c10;
						cfR(st);

					} else if(dp >= dpn9){
						c.fillStyle = c9;//L2
						cfR(st);

					} else if(dp >= dpn8){
						c.fillStyle = c8;//L2
						cfR(st);

					} else if(dp >= dpn7){
						c.fillStyle = c7;//L7
						cfR(st);

					} else if(dp >= dpn6){
						c.fillStyle = c6;//L6
						cfR(st);

					} else if(dp >= dpn5) {
						c.fillStyle = c5;//L5
						cfR(st);

					} else if(dp >= dpn4) {
						c.fillStyle = c4;//L4
						cfR(st);
						
					} else if(dp >= dpn3){
						c.fillStyle = c3;//L3
						cfR(st);
						
					} else if(dp >= dpn2){
						c.fillStyle = c2;//L2
						cfR(st);

					} else {
						c.fillStyle = onecolor;//L1
						cfR(st);
						
					}
			}
			var angle = document.getElementById('angle').value;
			if (st === "mr45") {
				leng = leng-1;
			} else if (st === "mstar"){
				leng = leng-1;
			} else if (st === "mstar3"){
				leng = leng-angle;
			} else if (st === "mstar2"){
				leng = leng-angle;
			} else if (st === "carpetx"){
				leng = leng-angle;
			} else if (st === "cx_star"){
				leng = leng-angle;
			} else if (st === "cx_flower"){
				leng = leng-angle;
			} else if (st === "cx_rose"){
				leng = leng-angle;		
			} else {}
			
		}

	}









//}//end of myFunction



function myFnexfunction(sp){

	//loading();
	// var itc = 1;
	// var itcc = document.getElementById('itcicle').value;

	// if (spradio_mask.checked){
	// 	itc = itcc;
	// }else{
	// 	itc = 1;
	// }

	var itc = document.getElementById('itcicle').value;
	for(var mfc=0; mfc<itc; mfc++){
		myFunction(sp);
		
	}


	mcVisual();

}



function myFnexSwitch(){
	var spradio_random = document.getElementById('funradio_random');
	var spradio_mask = document.getElementById('funradio_mask');
	var spradio_digofPi = document.getElementById('funradio_digofPi');
	var spradio_custom = document.getElementById('funradio_custom');
	var spradio_secondms = document.getElementById('funradio_secondms');

	//var checkbox = document.getElementById('test');

	if (spradio_random.checked) {
		myFnexfunction(101);
	}else if (spradio_digofPi.checked) {
		myFnexfunction(110);
	}else if (spradio_custom.checked) {
		myFnexfunction(012);
	}else if (spradio_secondms.checked) {
		myFnexfunction(011)
	}else if (spradio_mask.checked) {
		myFnexfunction(210);
	}


	// switch(spradio){
	// 	case '101':
	// 		myFnexfunction(101);				
	// 	break;

	// 	case '110':
	// 		myFnexfunction(110);			
	// 	break;

	// }
}	

		//random:
		//minmax:
		//strangeness:
		//digitsofpi:
	//var ix = infodataRU.width_height;
//var ids = {"i_wh","i_angle"};

function ilang(languaga){
	if (languaga === 1){//RU
		//width and height
		document.getElementById("iwh").innerHTML = "Ширина и высота в пикселях. Для форм Mirrors, Mirrors2 и Original можно устанавливать разную ширину и высоту. Для остальных форм желательно чтобы W и H были одинаковы, иначе можете лицезреть некоторые прикольные баги или разрывы.";
		//angle
		document.getElementById("i_angle").innerHTML = "Параметр, который сокращает прямоугольный массив до трапеции или треугольника. Рекомендую использовать числа с точкой (например 0.5, 0.751, 0.001 и т.д.), а так же 0 или 1. Выше единицы наблюдаются разрывы.<br>Этот параметр не влияет на Mirrors, Mirrors2, Mirror45 и Original.<br><br>Ковер состоит из нескольких одинаковых массивов (кусков), кроме формы Original. И с помощью параметра Angle можно изменять форму этого массива.";
		
		document.getElementById("i_rand").innerHTML = "Формирует ковёр на основе массива из случайных чисел. Каждый раз создается новый массив. Для этой функции имеются следующие параметры:<br><br><b>min,max:</b>диапазон для случайных чисел.<br><br><b>strangeness</b>:<br>Эта штука делит каждое число массива на указанную величину. По умолчанию 10. Можете использовать любые числа. Если значение выше или меньше 10, то ковер будет формироваться на основе чисел с точкой. Например, попробуйте значения 8 или 9, и посмотрите что будет.<br>п.с. генератор случайных чисел работал с каким-то багом, пришлось поставить этот делитель на 10. Позднее это оказалось красивой фишкой для ковров.<br>";

		document.getElementById("i_pi").innerHTML = "Формирует ковер на основе постоянного массива цифр из числа Пи. Зависит от ширины ковра (Width).<br>Например, если ширина 720, для формы Original будут переданы первые 720 знаков числа Пи. Для остальных форм массив получится в два или несколько раз меньше.<br>Параметр <b>d</b> увеличивает каждое число массива в степень.";
	
		document.getElementById("i_custom").innerHTML = "Формирует ковер на основе массива, который задается вручную. Пользователь указывает номер элемента массива <b>Element #</b>, и указывает для него значение <b>Value</b>. Затем нажимает <b>set</b>, и значение заносится в определенное место массива. Можно задать несколько значений в разные места массива, потом нажимаем <b>generate</b> и видим результат.<br><br>По умолчанию для функции <b>custom massive</b> массив заполнен нулями. Но если до этого вы использовали одну из функций выше, то массив будет заполнен значениями которые использовались в прошлый раз. Если хотите обнулить массив, перезагрузите страницу.<br><br>Если массив заполнен только чётными числами (2,4,6,...) и нулями, ковра не будет видно. Нужно как минимум одно нечётное число (1,3,5,...).<br><br>Нумерация элементов начинается с 0 и заканчивается номером, который показан над Element #. Если последний номер не показан, просто нажмите set и generate.";
	} else if (languaga === 2){//EN
		//width and height
		document.getElementById("iwh").innerHTML = "The width and height in pixels. For forms Mirrors, Mirrors2 and Original you can set different width and height. For other forms, it is desirable that the W and H are the same, otherwise you can see some funny bugs or breaks in carpet";
		//angle
		document.getElementById("i_angle").innerHTML = "Parameter, which cuts a rectangular pixel array to a trapezoid or triangle. I recommend use numbers with dot (0.5, 0.751, 0.001, and so on), as well as 0 or 1. If this more then 1, you see breaks in carpet. <br>This option does not affect to the Mirrors, Mirrors2, Mirror45 and Original.<br><br>The carpet consists of several identical arrays (pieces), except the form Original. And using the Angle option, you can change shape of this array.";

		document.getElementById("i_rand").innerHTML = "It forms a carpet on the basis of an array of random numbers. Each time a new array is created. This function has the following parameters:<br><br><b>min,max:</b>range of random numbers.<br><br><b>strangeness:</b><br>This thing divide each number of massive on specified value. Default value is 10. You can use any number. If the value is greater than or less than 10, the carpet will be formed on numbers with dot. For example, try a value of 8 or 9, press <b>random</b> and see what happens.<br>The random number generator has worked with some bug, I had to put the divider at 10. Later, it became a beautiful thing for carpets.<br>";

		document.getElementById("i_pi").innerHTML = "It forms a carpet on the basis of an constant array of numbers of Pi. It depends on the Width.<br>For example, if the width 720, first 720 digits of Pi will be transferred to form Original. For other forms array happens in two or more times less. <br><b>d</b> parameter increases each number of array to a degree. If this parameter is 1, there are original digits of Pi.";
	
		document.getElementById("i_custom").innerHTML = "Generates a carpet on the basis of the array, which is set manually. The user specifies the array element number <b> Element # </b>, and indicates a value for it <b> Value </b>. Then press the <b> set </b>, and the value is stored in a specific location of the array. You can specify multiple values ​​in an array of different locations(element numbers), then click <b> generate </b> and see the result. <br> <br> By default, the function <b> custom massive </b> array is filled with zeros. But if you've used one of the functions above, the array will be filled with values ​​that were used the last time. If you want reset the array to zeros reload the page. <br> <br> If the array is filled with only even numbers (2,4,6, ...) and zeros, the carpet will not be visible. We need at least one odd number (1,3,5, ...). <br> <br> Elements numbering starts with 0 and ends with a number, which is shown above the Element # . If the last number is not shown, just press set and generate.";
	}	

}

ilang(2);


function download(){
        var download = document.getElementById("download");
        var image = document.getElementById("canvas").toDataURL("image/png")
                    .replace("image/png", "image/octet-stream");
        download.setAttribute("href", image);

}
	





