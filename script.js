//js
var pressedEnter = false; //will disable typing after equal sign is pressed
var save = "";
var numbers = new Array(); //saves input
var answer; //saves last answer


function generalInput(){

	if (pressedEnter == true) { //typing after pressing the equal sign    
		clr(); 					// creates new input
	}
}



function number(inp){	
		input.innerHTML += inp; //display input
		save += inp;  			//add single digit inputs together temporary to 
								//create the whole multi-digit number 		
	 				
}

function NotNumber(inp){
		input.innerHTML += inp; 

		if (save != ""){	//if a number was typed before an operator
		numbers.push(save); //save it in array 
		}
		save = ""; //reset the number-save

		if ((inp == "(") && (numbers[numbers.length-1] == ")")) {
			numbers.push("*"); // transforms (3+2)(2+3) to (3+2)*(2+3)
		} 

		numbers.push(inp); //push operator to array

} 

function dot(){
	if (save == "") {
		number('0');  // if dot is pressed without a number right before 
		number('.');  // add zero (.34 to 0.34)
	} else {
		number('.');	
	}
}

function negate(){	
	input.innerHTML+= "-("; // -3 transformed to -1 * ( 3
	numbers.push("-1");		
	numbers.push("*"); 
	numbers.push("(");	
}


function constant(inp){ //transform constants to numbers
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

function ans(){
	if (answer == undefined) {
		alert("no answer stored"); 
	} else {
		number(answer); 
	} 
}


function clr() {
	input.innerHTML = " "; 
	pressedEnter = false; 
	numbers = []; 
	save = "";  
}

function equalSign () {

	if (save != ""){
		numbers.push(save);
	}

	if ((pressedEnter == false) && (numbers != undefined)){ 
		input.innerHTML += " = "; 
		pressedEnter = true; 
		let temp = solve(InfixToPostfix()); 
		input.innerHTML += temp;
		answer = temp; 
	}	
}



const arithFunctions = [ "sin", "cos", "tan", "√", "log", "ln"];
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


function solve(output) {
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
		case "log"   : return (Math.log10(x));
		break; 
		case "√"   : return (Math.sqrt(x)); 
		break; 
	}
}

