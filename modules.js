exports.calculator = function (a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return "error";
    }
};
// exports.add = (a, b) => a + b;
// exports.sub = (a, b) => a - b;
// exports.product = (a, b) => a * b;
// exports.divide = (a, b) => (b !== 0 ? a / b : 'Cannot divide by zero');

