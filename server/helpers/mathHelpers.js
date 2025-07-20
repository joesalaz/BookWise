/**
 * Math Helpers for Handlebars Templates
 * 
 * This file contains simple mathematical operation helpers that can be used
 * in Handlebars templates. These are particularly useful when you need to
 * perform basic calculations directly in your templates.
 */

const hbs = require('hbs');

/**
 * Multiply Helper
 * Multiplies two numbers together.
 * 
 * Usage in template: {{multiply number1 number2}}
 * Example: {{multiply 2 3}} outputs 6
 * 
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} - The product of a and b
 */
hbs.registerHelper('multiply', function(a, b) {
    // Convert inputs to numbers to ensure proper calculation
    const result = Number(a) * Number(b);
    return result;
});

/**
 * Divide Helper
 * Divides first number by second number.
 * Returns 0 if trying to divide by zero to prevent errors.
 * 
 * Usage in template: {{divide number1 number2}}
 * Example: {{divide 6 2}} outputs 3
 * Example: {{divide 5 0}} outputs 0 (prevents divide by zero error)
 * 
 * @param {number} a - Number to be divided (numerator)
 * @param {number} b - Number to divide by (denominator)
 * @returns {number} - The result of a divided by b, or 0 if b is zero
 */
hbs.registerHelper('divide', function(a, b) {
    // Convert inputs to numbers
    const numerator = Number(a);
    const denominator = Number(b);
    
    // Check for division by zero
    if (denominator === 0) {
        return 0;
    }
    
    return numerator / denominator;
});

// Export an empty object since helpers are registered directly with Handlebars
module.exports = {};
