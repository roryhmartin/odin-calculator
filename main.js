// quokka: Cmd/Ctrl + K, Q

let firstNumber;
let operator;
let secondNumber;
let displayValue = '';
const displayNumber = document.getElementById('display');
const buttons = document.getElementsByTagName('button');
const buttonsArray = [...buttons];

function updateDisplay(buttonValue) {
    if (buttonValue === 'clear') {
        displayValue = '0';
    } else if (displayValue === '0') {
        displayValue = buttonValue;
    } else {
        displayValue += buttonValue;
    }
    displayNumber.textContent = displayValue;
}

buttonsArray.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonValue = button.value;

        if (!isNaN(buttonValue) || buttonValue === '.') {
            updateDisplay(buttonValue);
        } else if (buttonValue === 'clear') {
            updateDisplay(buttonValue);
        }
    });
});

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(firstNumber, secondNumber, operator) {
    switch (operator) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case '/':
            return divide(firstNumber, secondNumber);
        default:
            'Invalid Number';
            break;
    }
}

console.log('here!!!');
