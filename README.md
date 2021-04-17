# Scientific Calculator
A work in progress calculator transforming the infix expression `7 * 2` to postfix `7 2 *` and then solving it. 
To do so the Shunting-Yard-Algorithm is used. 

https://simone-dr.github.io/scientificCalculator/

## Shunting-Yard

```

Input: 3+sin(5)/7

Push   3	to Output 				every Number is pushed to output
Push  sin  	to Stack				every unary Op is pushed to Stack
Push   ( 	to Stack				every open parenthesis is pushed to Stack
Push   5 	to Output 
Del    (   	from Stack				closed parenthesis pops every operator ( in this case none) until it reaches open parenthesis, which it deletes
Pop   sin 	from Stack to Output 	 every unary Op on the Stack before an open parenthesis is poped and pushed onto the Output
Push   / 	to Stack				because the precedence of / is higher than the one of + it is pushed onto the Stack 
Push   7	to Output
Pop    / 	from Stack to Output 	 the Stack is emptied onto the Output because every Element of the input has been sorted
Pop	   +	from Stack to Output 

Output: 3 5 sin 7 / +

```

## Solve Postfix

```
Input: 3 5 sin 7 / +

Push  3  to Stack
Push  5  to Stack
Pop   5  of Stack and Push the solution of sin(5) (-0.95..)
Push  7  to Stack 
Pop 7 and (-0.95..) of Stack and Push solution of -0.95.. / 7 (-0.136..) on Stack 
Pop -0.136.. and 3 and Push the solution of -0.136.. + 3 (2,864..)

Output: 2,864..

```

## included operands
unary Operations:
* sin
* cos
* tan
* √
* log
* ln

binary Operations:
* +
* -
* *
* /
* ^

