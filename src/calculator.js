#!/usr/bin/env node
// calculator.js - Node.js CLI Calculator
// Supports: addition, subtraction, multiplication, division

const [,, operation, ...numbers] = process.argv;

const operationsWithTwoOrMore = ['add', 'subtract', 'multiply', 'divide', 'mod', 'exp', 'modulo', 'power'];
const operationsWithOne = ['sqrt', 'squareRoot'];
// Function: modulo(a, b) - returns the remainder of a divided by b
function modulo(a, b) {
  if (b === 0) {
    console.log('Error: Modulo by zero is not allowed.');
    process.exit(1);
  }
  return a % b;
}

// Function: power(base, exponent) - returns base raised to the exponent
function power(base, exponent) {
  return Math.pow(base, exponent);
}

// Function: squareRoot(n) - returns the square root of n with error handling for negative numbers
function squareRoot(n) {
  if (n < 0) {
    console.log('Error: Square root of negative number is not allowed.');
    process.exit(1);
  }
  return Math.sqrt(n);
}

if (!operation || (
  operationsWithTwoOrMore.includes(operation) && numbers.length < 2
) || (
  operationsWithOne.includes(operation) && numbers.length !== 1
)) {
  console.log('Usage: calculator <add|subtract|multiply|divide|mod|exp> <num1> <num2> [num3 ...]');
  console.log('Usage: calculator sqrt <num>');
  process.exit(1);
}

const parsedNumbers = numbers.map(Number);
if (parsedNumbers.some(isNaN)) {
  console.log('Error: All arguments after the operation must be numbers.');
  process.exit(1);
}

let result;
switch (operation) {
  case 'add':
    // Addition: Sums all numbers
    result = parsedNumbers.reduce((a, b) => a + b);
    break;
  case 'subtract':
    // Subtraction: Subtracts subsequent numbers from the first
    result = parsedNumbers.reduce((a, b) => a - b);
    break;
  case 'multiply':
    // Multiplication: Multiplies all numbers
    result = parsedNumbers.reduce((a, b) => a * b);
    break;
  case 'divide':
    // Division: Divides the first number by each subsequent number
    if (parsedNumbers.slice(1).includes(0)) {
      console.log('Error: Division by zero is not allowed.');
      process.exit(1);
    }
    result = parsedNumbers.reduce((a, b) => a / b);
    break;
  case 'mod':
    // Modulo: Returns the remainder of the first number divided by the second
    if (parsedNumbers.length !== 2) {
      console.log('Error: Modulo operation requires exactly two numbers.');
      process.exit(1);
    }
    result = modulo(parsedNumbers[0], parsedNumbers[1]);
    break;
  case 'modulo':
    // Modulo: Returns the remainder of the first number divided by the second
    if (parsedNumbers.length !== 2) {
      console.log('Error: Modulo operation requires exactly two numbers.');
      process.exit(1);
    }
    result = modulo(parsedNumbers[0], parsedNumbers[1]);
    break;
  case 'exp':
    // Exponentiation: Raises the first number to the power of the second
    if (parsedNumbers.length !== 2) {
      console.log('Error: Exponentiation operation requires exactly two numbers.');
      process.exit(1);
    }
    result = power(parsedNumbers[0], parsedNumbers[1]);
    break;
  case 'power':
    // Exponentiation: Raises the first number to the power of the second
    if (parsedNumbers.length !== 2) {
      console.log('Error: Exponentiation operation requires exactly two numbers.');
      process.exit(1);
    }
    result = power(parsedNumbers[0], parsedNumbers[1]);
    break;
  case 'sqrt':
    // Square Root: Returns the square root of the number
    result = squareRoot(parsedNumbers[0]);
    break;
  case 'squareRoot':
    // Square Root: Returns the square root of the number
    result = squareRoot(parsedNumbers[0]);
    break;
  default:
    console.log('Error: Unsupported operation. Use add, subtract, multiply, divide, mod, modulo, exp, power, sqrt, or squareRoot.');
    process.exit(1);
}

console.log('Result:', result);