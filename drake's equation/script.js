let origDescription = document.getElementById('original-description');
let newDescription = document.getElementById("changed-description");
let multipliers = document.getElementsByClassName('multiplier');
let passsages = document.getElementsByClassName("info");

let origCalculatorVars = document.getElementsByClassName("orig-variable");
let origSubmitButton = document.getElementById('orig-submit-button');
let origClearButton = document.getElementById("orig-clear-button");
let fillActualButton = document.getElementById("fill-with-actual-values");
let origResult = document.getElementById('orig-result');

let changedCalculatorVars = document.getElementsByClassName("changed-variable");
let changedSubmitButton = document.getElementById("changed-submit-button");
let changedClearButton = document.getElementById("changed-clear-button");
let fillNewButton = document.getElementById("fill-with-new-actual-values");
let changedResult = document.getElementById("changed-result");

let origMultDescriptions = {
	"ℵ": "<b>N</b> = Количество цивилизаций в нашей галактике, с которыми возможен потенциальный контакт.",
	"R": "<b>R</b> = Средний годовой темп формирования звёздных систем в нашей галактике.",
	"fp": "<b>f<sub>p</sub></b> = Доля звёзд, имеющих планеты.",
	"ne": "<b>n<sub>e</sub></b> = Количество миров в системе с подходящими для жизни условиями.",
	"fl": "<b>f<sub>l</sub></b> = Доля из этих миров, где развилась жизнь.",
	"fi": "<b>f<sub>i</sub></b> = Вероятность возникновения разума на пригодных для жизни планетах.",
	"fc": "<b>f<sub>c</sub></b> = Доля цивилизаций, развивающие средства связи.",
	"L": "<b>L</b> = Время подачи обнаруживаемого сигнала этими цивилизациями."
};
let newMultDescriptions = {
	"Q": "<b>Q</b> = Количество звёздных систем в нашей галактике. Причина замены множителей <b>R</b> и <b>L</b> состоит в том, что они довольно сложны для получения значений. Вряд ли человечество сможет наверняка знать время подачи сигналов от других цивилизаций или с высокой точностью оценить среднегодовой темп формирования новых систем. Намного удобнее исходить относительно общего числа систем в настоящий момент, так как оно в среднем сильно не меняется на протяжении огромного числа времени.",
	"fs": "Доля звёзд K, G  или F класса. Данный множитель был добавлен, т.к. скорее всего достаточно долгое существование жизни возможно только на звёздах именно этих классов, т.е. звёздах солнечного типа. Так как более-менее большие звёзды вроде синих или красных гигантов могут существовать не более 500 млн лет, поэтому ни о какой разумной жизни речь идти не может. С красными карликами иная проблема. Несмотря на то, что они могут существовать более триллиона лет, их огромная активность делает вероятность постоянной жизни довольно низкой, учитывая также, что из-за небольшой светимости таких звёзд зона обитаемости(т.е. орбита, на которой вода может оставаться жидкой) должна находиться очень близко, из-за чего планета ещё больше подвержена звёздному ветру.",
	"np": "Множитель <b>n<sub>e</sub></b> был разложен на слагаемые <b>n<sub>p</sub></b>(количество планет с подходящими условиями для жизни в звёздной системе) и <b>n<sub>m</sub></b>(количество пригодных для жизни спутников). Сделано это для удобства и лучшего понимания того, что нужно исследовать. На самом деле множителем <b>n<sub>m</sub></b> можно без больших потерь пренебречь, так как вероятность формирования цивилизации на спутнике планеты невелика. Наиболее вероятно появление водной жизни, однако скорее всего посылать сообщения в космос она не сможет.",
	"nm":  "Множитель <b>n<sub>e</sub></b> был разложен на слагаемые <b>n<sub>p</sub></b>(количество планет с подходящими условиями для жизни в звёздной системе) и <b>n<sub>m</sub></b>(количество пригодных для жизни спутников). Сделано это для удобства и лучшего понимания того, что нужно исследовать. На самом деле множителем <b>n<sub>m</sub></b> можно без больших потерь пренебречь, так как вероятность формирования цивилизации на спутнике планеты невелика. Наиболее вероятно появление водной жизни, однако скорее всего посылать сообщения в космос она не сможет.",
	"frc": "Доля цивилизаций, развивающих средства связи в <i>радиодиапазоне</i>. Такое уточнение нужно, т.к. наша цивилизация принимает только такие сигналы и другие человечество просто не заметит.",
	"ft": "Доля цивилизаций, которые посылают сигналы в космос. Цивилизации, которые не посылают сообщений, а только принимают бесполезны для поиска, поэтому необходим этот множитель. Человечество, например, только принимает сигналы, из-за чего оно вряд ли может быть найдено.",
};

let isActivated = false;
let type = "";

let numberInputs = document.getElementsByTagName("input");

for (let i = 0; i < passsages.length; i++) {
	let text = passsages[i].innerText;
	passsages[i].innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp; " + text;
}

for (let i = 0; i < multipliers.length; i++) {
	multipliers[i].onclick = function(e) {
		if (type != multipliers[i].innerText) {
			setTimeout(function() {
                origDescription.style.webkitAnimationName = '';
                newDescription.style.webkitAnimationName = "";

            }, 1000);

			if (origDescription.style.webkitAnimationName != "show-display") {
				origDescription.style = "display: block; animation-duration: 1s;";
				origDescription.style.webkitAnimationName = "show-display";
			}

			if (newDescription.style.webkitAnimationName != "show-display") {
				newDescription.style = "display: block; animation-duration: 1s;";
				newDescription.style.webkitAnimationName = "show-display";
			}

			newDescription.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp; &#10144;";
			origDescription.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp; &#10144;";
			type = multipliers[i].innerText;

			if (origMultDescriptions[type] != undefined) {
				origDescription.innerHTML += origMultDescriptions[type];
				newDescription.style.display = "none";
			} else {
				newDescription.innerHTML += newMultDescriptions[type];
				origDescription.style.display = "none";
			}

		} else {
			newDescription.style = "display: none";
			newDescription.innerHTML = "";

			origDescription.style = "display: none";
			origDescription.innerHTML = "";
			type = ""
		}
	};
}


function clearInputs(type) {
	let calculatorVars;
	if (type == "changed") {
		calculatorVars = changedCalculatorVars;
		changedResult.innerHTML = "ℵ";
	} else if (type = "original") {
		calculatorVars = origCalculatorVars;
		origResult.innerHTML = "ℵ";
	}

	for (let i = 0; i < calculatorVars.length; i++) {
		calculatorVars[i].value = '';
	}
}

origSubmitButton.onclick = function(e) {
	let result = 1;

	for (let i = 0; i < origCalculatorVars.length; i++) {
		let variable = +origCalculatorVars[i].value;

		if (variable != undefined) {
			result *= variable;
		} else {
			result *= 1;
		}
	}

	origResult.innerHTML = Math.round(result) + "";
};

changedSubmitButton.onclick = function(e) {
	let result = 1;

	for (let i = 0; i < changedCalculatorVars.length; i++) {
		let variable = +changedCalculatorVars[i].value;
		console.log(variable);
		console.log(result);

		if (variable != undefined) {
			if (changedCalculatorVars[i].placeholder == "np"){
				result *= (+changedCalculatorVars[i].value + (+changedCalculatorVars[i + 1].value));
				i++;
			} else {
				result *= variable;
			}
		} else {
			result *= 1;
		}
	}

	changedResult.innerHTML = Math.round(result) + "";
};

origClearButton.onclick = function(e) {
	let calculatorVars;

	calculatorVars = origCalculatorVars;
	origResult.innerHTML = "ℵ";

	for (let i = 0; i < calculatorVars.length; i++) {
		calculatorVars[i].value = '';
	}
};

changedClearButton.onclick = function(e) {
	let calculatorVars;

	calculatorVars = changedCalculatorVars;
	changedResult.innerHTML = "ℵ";

	for (let i = 0; i < calculatorVars.length; i++) {
		calculatorVars[i].value = '';
	}
};

fillActualButton.onclick = function(e) {
	vars = origCalculatorVars;
	actualValues = {"R":3, "fp":1, "ne":2, "fl":0.83, "fi":0.12, "fc":1, "L":40000000};

	for (let i = 0; i < vars.length; i++) {
		vars[i].value = actualValues[vars[i].placeholder];
	}
};

fillNewButton.onclick = function(e) {
	vars = changedCalculatorVars;
	actualValues = {"Q":25 * 10 ** 10, "fs":0.1, "np":1, "nm":1, "fl":0.83, "fi":0.12, "fr":0.5, "ft":0.5};

	for (let i = 0; i < vars.length; i++) {
		vars[i].value = actualValues[vars[i].placeholder];
	}
};

function checkInputs() {
	for (let i = 0; i < numberInputs.length; i++) {
		if (numberInputs[i].value.length >= 3) {
			numberInputs[i].style.width = numberInputs[i].value.length + "em";
		} else {
			numberInputs[i].style.width = "3em"
		}
	}
}

let interval = setInterval(checkInputs, 10);
