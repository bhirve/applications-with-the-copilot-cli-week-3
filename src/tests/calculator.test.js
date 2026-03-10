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

  describe('Edge Cases', () => {
    it('handles invalid operation', () => {
      assert.strictEqual(runCalc('mod', 10, 2), 'Error: Unsupported operation. Use add, subtract, multiply, or divide.');
    });
    it('handles non-numeric input', () => {
      assert.strictEqual(runCalc('add', 'a', 2), 'Error: All arguments after the operation must be numbers.');
    });
    it('requires at least two numbers', () => {
      assert.strictEqual(runCalc('add', 2), 'Usage: calculator <add|subtract|multiply|divide> <num1> <num2> [num3 ...]');
    });
  });
});
