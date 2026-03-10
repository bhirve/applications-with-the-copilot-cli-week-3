const assert = require('assert');
const { spawnSync } = require('child_process');

// Helper to run calculator CLI
function runCalc(operation, ...args) {
  const result = spawnSync('node', ['src/calculator.js', operation, ...args.map(String)], { encoding: 'utf8' });
  return result.stdout.trim();
}

describe('Calculator CLI', () => {
  describe('Addition', () => {
    it('adds 2 + 3 = 5', () => {
      assert.strictEqual(runCalc('add', 2, 3), 'Result: 5');
    });
    it('adds multiple numbers', () => {
      assert.strictEqual(runCalc('add', 1, 2, 3, 4), 'Result: 10');
    });
  });

  describe('Subtraction', () => {
    it('subtracts 5 - 2 = 3', () => {
      assert.strictEqual(runCalc('subtract', 5, 2), 'Result: 3');
    });
    it('subtracts multiple numbers', () => {
      assert.strictEqual(runCalc('subtract', 10, 2, 3), 'Result: 5');
    });
  });

  describe('Multiplication', () => {
    it('multiplies 4 * 6 = 24', () => {
      assert.strictEqual(runCalc('multiply', 4, 6), 'Result: 24');
    });
    it('multiplies multiple numbers', () => {
      assert.strictEqual(runCalc('multiply', 2, 3, 4), 'Result: 24');
    });
  });

  describe('Division', () => {
    it('divides 10 / 2 = 5', () => {
      assert.strictEqual(runCalc('divide', 10, 2), 'Result: 5');
    });
    it('divides multiple numbers', () => {
      assert.strictEqual(runCalc('divide', 100, 2, 5), 'Result: 10');
    });
    it('handles division by zero', () => {
      assert.strictEqual(runCalc('divide', 10, 0), 'Error: Division by zero is not allowed.');
    });
  });

  describe('Modulo', () => {
    it('modulo 10 % 3 = 1', () => {
      assert.strictEqual(runCalc('modulo', 10, 3), 'Result: 1');
    });
    it('modulo 15 % 4 = 3', () => {
      assert.strictEqual(runCalc('modulo', 15, 4), 'Result: 3');
    });
    it('modulo by zero', () => {
      assert.strictEqual(runCalc('modulo', 10, 0), 'Error: Modulo by zero is not allowed.');
    });
    it('modulo with mod alias', () => {
      assert.strictEqual(runCalc('mod', 20, 6), 'Result: 2');
    });
  });

  describe('Exponentiation (Power)', () => {
    it('power 2 ^ 3 = 8', () => {
      assert.strictEqual(runCalc('power', 2, 3), 'Result: 8');
    });
    it('power 5 ^ 0 = 1', () => {
      assert.strictEqual(runCalc('power', 5, 0), 'Result: 1');
    });
    it('power with exp alias', () => {
      assert.strictEqual(runCalc('exp', 3, 2), 'Result: 9');
    });
  });

  describe('Square Root', () => {
    it('squareRoot of 16 = 4', () => {
      assert.strictEqual(runCalc('squareRoot', 16), 'Result: 4');
    });
    it('squareRoot of 25 = 5', () => {
      assert.strictEqual(runCalc('squareRoot', 25), 'Result: 5');
    });
    it('squareRoot with sqrt alias', () => {
      assert.strictEqual(runCalc('sqrt', 9), 'Result: 3');
    });
    it('squareRoot of negative number', () => {
      assert.strictEqual(runCalc('squareRoot', -4), 'Error: Square root of negative number is not allowed.');
    });
  });

  describe('Edge Cases', () => {
    it('handles invalid operation', () => {
      assert.strictEqual(runCalc('foo', 10, 2), 'Error: Unsupported operation. Use add, subtract, multiply, divide, mod, modulo, exp, power, sqrt, or squareRoot.');
    });
    it('handles non-numeric input', () => {
      assert.strictEqual(runCalc('add', 'a', 2), 'Error: All arguments after the operation must be numbers.');
    });
    it('requires at least two numbers', () => {
      assert.strictEqual(runCalc('add', 2), 'Usage: calculator <add|subtract|multiply|divide|mod|exp> <num1> <num2> [num3 ...]\nUsage: calculator sqrt <num>');
    });
    it('requires one number for squareRoot', () => {
      assert.strictEqual(runCalc('squareRoot', 4, 5), 'Usage: calculator <add|subtract|multiply|divide|mod|exp> <num1> <num2> [num3 ...]\nUsage: calculator sqrt <num>');
    });
  });
});
