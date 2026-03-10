#!/usr/bin/env node
// calculator.js - Node.js CLI Calculator
// Supports: addition, subtraction, multiplication, division

const [,, operation, ...numbers] = process.argv;

if (!operation || numbers.length < 2) {
  console.log('Usage: calculator <add|subtract|multiply|divide> <num1> <num2> [num3 ...]');
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
  default:
    console.log('Error: Unsupported operation. Use add, subtract, multiply, or divide.');
    process.exit(1);
}

console.log('Result:', result);