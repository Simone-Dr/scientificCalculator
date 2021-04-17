//js
var pressedEqual = false; //will disable typing after equal sign is pressed
var save = "";
var numbers = new Array(); //saves input
var answer; //saves last answer


function generalInput(){

	if (pressedEqual == true) { //typing after pressing the equal sign    
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
	if (pressedEqual == false){ 
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


function clr() { // reset numbers, safe etc. 
	input.innerHTML = " "; 
	pressedEqual = false; 
	numbers = []; 
	save = "";  
}

function equalSign () {

	if (save != ""){ 
		numbers.push(save); // add last number to array
	}

	if ((pressedEqual == false) && (numbers[0] != undefined)){ //prevent writing equal 
		input.innerHTML += " = ";  							  //before Input
		pressedEqual = true; 
		let temp = solve(InfixToPostfix()); // transform Infix to Postfix and Solve 	
		input.innerHTML += temp; 
		answer = temp; //safe last answer in answer var
	}	
}



const checkIfUnaryOperation = [ "sin", "cos", "tan", "√", "log", "ln"]; 
const checkIfBinaryOperation = [ "+", "-", "*", "/", "^"]; 

function precedence(op) { //every operator is assigned a value concidering their precedence 
	switch(op) {		  // 3+4*5^(2)   --> you solve 5^2 then 4*25 then 3+100
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

function isLeftAssociative(op) { //power is right-associative  
	if (op != "^") { //(meaning the operations are grouped from the right) 
		return true
	} else return false

} 


function InfixToPostfix() { //Shunting-Yard-Algorithm 
	let Output = new Array();
	let Stack = new Array(); 
	for (let i = 0; i < numbers.length; i++) {
		if (isNaN(numbers[i]) == false) { //if number -> Output
			Output.push(numbers[i]);
		} else if (checkIfUnaryOperation.includes (numbers[i])) { //if sin() etc. put on Stack
			Stack.push(numbers[i]);
		} else if (checkIfBinaryOperation.includes (numbers[i])) { //if +, * etc put operator on Stack while its
			while 
				(((precedence(numbers[i]) <= precedence(Stack[Stack.length - 1])) || //precedence is higher or equal to Stack top
				(checkIfUnaryOperation.includes(Stack[Stack.length - 1]))) && //or there is an unaryOperation on Stack top
				((Stack[Stack.length - 1]) != "(") && // and the Stacktop isn't "("
				([Stack.length - 1] > (-1)) && //and the Stack isn't empty
				(isLeftAssociative(numbers[i]))) //and op is left-associative
			{
				Output.push(Stack.pop());	
			}

			Stack.push(numbers[i]); // push to stack 

		} else if (numbers[i] == "(") { 
			Stack.push(numbers[i]);	//"(" is always pushed onto the Stack

	//while there is no "(" on Stack, the top of the Stack is addet to Output, if no output is found output alert
		} else if (numbers[i] == ")") {
			while ((Stack[Stack.length - 1]) != "(") { 
				Output.push(Stack.pop());	
				if (Stack.length < 0) {
					console.log("Error! An open parenthesis is missing");
					break;	
				}

			}

			Stack.pop(); //open parenthesis are removed

			if (checkIfUnaryOperation.includes (Stack[Stack.length - 1])) {
				Output.push(Stack.pop());	//if unaryOperation is following it is pushed to output
			}		
		}
	} 

	do { // Stack is emptied (pushed onto Output)
		if ((Stack[Stack.length - 1]) == "(") {
			alert("Error! A closed parenthesis is missing");
		}

		Output.push(Stack.pop());	

	} while (Stack.length > 0); 


	console.log(Output);
	
	return Output; //returns the input transformed from infix to postfix
}


function solve(postix) { //solves the input that is transformed to postfix 
/* The every element of the postfix array, is now sorted one after the other according to their type.
All numbers are immediately put on a stack, when an operator is recognized then the two previous numbers 
are offset against each other depending on the operator. The result pushed on top of the stack. For unary Operations
only one Number is pushed. After calculating all numbers, the last number on the stack is the result. */

	let Stack = new Array(); 
	let num1;
	let num2; 
	let temp; 

	for (let i = 0; i < (postix.length); i++) { 
		if (isNaN(postix[i]) == false) {
			Stack.push(postix[i]);  
		} else if (checkIfBinaryOperation.includes(postix[i])){
			num1 = Stack.pop();
			num2 = Stack.pop();
			console.log("Rechnen", num1, num2, postix[i]);  
			temp = binaryOperation(num1, num2, postix[i]);
			Stack.push(temp); 
			console.log("ergebnis", Stack[Stack.length-1]);
		} else if (checkIfUnaryOperation.includes(postix[i])){
			num1 = Stack.pop(); 
			temp = unaryOperation(num1, postix[i]); 
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

