//js
var pressedEnter = false; 
var save = ""; 
var numbers = new Array();
var answer; 


function number(inp){
	if (pressedEnter == true) {
		clr(); 
	}
		input.innerHTML += inp; 
		save += inp;  
}

function NotNumber(inp){
	if (pressedEnter == true) {
		clr(); 
	}

		input.innerHTML += inp; 
		if (save != ""){
		numbers.push(save);
		}
		save = ""; 
		numbers.push(inp)

} 

function dot(){
	if (save == "") {
		number('0'); 
		number('.');
	} else {
		number('.');	
	}
}

function negate(){
	//ToDo------------------------------------------------------------------------
}


function constant(inp){
	if (pressedEnter == false){ 
		input.innerHTML += inp; 
		
		switch(inp) {
		case "e" : save += Math.E;  
		break;
		case "π" : save += Math.PI; 
		break;
		}
	}
}


function clr() {
	input.innerHTML = " "; 
	pressedEnter = false; 
	numbers = []; 
	save = "";  
}

function solve() {

	if (save != ""){
		numbers.push(save);
	}
	if (pressedEnter == false){ 
		input.innerHTML += " = "; 
		pressedEnter = true; 
		let temp = rechnen(InfixToPostfix()); 
		input.innerHTML += temp;
		answer = temp; 
	}	
}

function ans(){
	if (answer == undefined) {
		alert("no answer stored"); 
	} else {
		number(answer); 
	} 
}

const arithFunctions = [ "sin", "cos", "tan", "√", "e", "ln"];
const operationCheck = [ "+", "-", "*", "/", "^"];

function precedence(op) {
	switch(op) {
		case "^" : return 4;
		break;
		case "*" : return 3;
		break;
		case "/" : return 3;
		break;
		case "+" : return 2;
		break;
		case "-" : return 2; 
		break;
	} 
}

function associativity(op) {
	if (op != "^") {
		return true
	} else return false

} 


function InfixToPostfix() {
	let Output = new Array();
	let Stack = new Array(); 
	for (let i = 0; i < numbers.length; i++) {
		if (isNaN(numbers[i]) == false) {
			Output.push(numbers[i]);
		} else if (arithFunctions.includes (numbers[i])) {
			Stack.push(numbers[i]);
		} else if (operationCheck.includes (numbers[i])) {
			while 
				(((precedence(numbers[i]) <= precedence(Stack[Stack.length - 1])) ||
				(arithFunctions.includes(Stack[Stack.length - 1]))) && 
				((Stack[Stack.length - 1]) != "(") && 
				([Stack.length - 1] > (-1)) && 
				(associativity(numbers[i]))) 
			{
				Output.push(Stack.pop());	
			}
			Stack.push(numbers[i]);
		} else if (numbers[i] == "(") {
			Stack.push(numbers[i]);	
		} else if (numbers[i] == ")") {
			while ((Stack[Stack.length - 1]) != "(") {
				Output.push(Stack.pop());	
				if (Stack.length < 0) {
					console.log("Es fehlt eine offene Klammer");
					break;	
				}

			}
			Stack.pop();

			if (arithFunctions.includes (Stack[Stack.length - 1])) {
				Output.push(Stack.pop());	
			}		
		}
	} 

	do {
			if ((Stack[Stack.length - 1]) == "(") {
				alert("Fehler! Es fehlt eine offene Klammer");
			}

			Output.push(Stack.pop());	

		} while (Stack.length > 0); 
	return Output;
}


function rechnen(output) {
	let Stack = new Array(); 
	let num1;
	let num2; 
	let temp; 

	for (let i = 0; i < (output.length); i++) { 
		if (isNaN(output[i]) == false) {
			Stack.push(output[i]);  
		} else if (operationCheck.includes(output[i])){
			num1 = Stack.pop();
			num2 = Stack.pop();
			console.log("Rechnen", num1, num2, output[i]);  
			temp = binaryOperation(num1, num2, output[i]);
			Stack.push(temp); 
			console.log("ergebnis", Stack[Stack.length-1]);
		} else if (arithFunctions.includes(output[i])){
			num1 = Stack.pop(); 
			temp = unaryOperation(num1, output[i]); 
			Stack.push(temp); 
		}
	}
	return (Stack[0]); 
}


function binaryOperation(a, b, op) {
let x;

	switch(op) {
		case "+" : x = (parseFloat(a) + parseFloat(b)); 
		break; 
		case "-" : x = b - a; 
		break; 
		case "*" : x = a * b; 
		break; 
		case "/" : x = b / a; 
		break; 
		case "^" : x = (Math.pow(b, a)); 
		break; 
	}

	return x; 
}

function unaryOperation(x, op) {
	switch(op) {
		case "sin" : return (Math.sin(x));
		break; 
		case "cos" : return (Math.cos(x));
		break; 
		case "tan" : return (Math.tan(x));
		break; 
		case "ln"  : return (Math.log(x));
		break; 
		case "e"   : return (Math.exp(x));
		break; 
		case "√"   : return (Math.sqrt(x)); 
		break; 
	}
}

