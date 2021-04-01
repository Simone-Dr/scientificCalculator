var pressedEnter = false; 
var save = ""; 
var numbers = []; 

function number(inp){
	if (pressedEnter == false){ 
		input.innerHTML += inp; 
		save += inp;  
	}
}

function ArithSym(inp){
	if (pressedEnter == false){ 
		input.innerHTML += inp; 
		if (save != ""){
		numbers.push(save);
		}
		save = ""; 
		numbers.push(inp)
	}


} 

function clr() {
	input.innerHTML = " "; 

}

function solve() {

	if (save != ""){
		numbers.push(save);
	}
	if (pressedEnter == false){ 
		input.innerHTML += " = "; 
	}

	pressedEnter = true; 
	InfixToPostfix(); 
}

function InfixToPostfix() {
	for (let i = 0; i < numbers.length; i++) {
		console.log(numbers[i]);
		if (isNaN(numbers[i]) == false) {
			
		}
	}

}
