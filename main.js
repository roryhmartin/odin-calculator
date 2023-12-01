// quokka: Cmd/Ctrl + K, Q

let firstNumber;
let operator;
let secondNumber;
let displayValue = '';
const displayNumber = document.getElementById('display');
const buttons = document.getElementsByTagName('button');
const buttonsArray = [...buttons];

function updateDisplay(button) {
    const buttonValue = button.value;

    if (buttonValue === 'clear') {
        clearDisplay();
    } else if (buttonValue === '.' && displayValue.includes('.')) {
        return;
    } else if (button.classList.contains('operator')) {
        if (firstNumber === undefined) {
            firstNumber = parseFloat(displayValue);
        }
        operator = buttonValue;
        console.log(`First Number is ${firstNumber}`);
        displayValue = operator;
    } else {
        displayValue += buttonValue;
    }
    displayNumber.textContent = displayValue;
    console.log(displayValue);
}

buttonsArray.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        updateDisplay(button);
    });
});

function clearDisplay() {
    displayValue = '';
    firstNumber = undefined;
    secondNumber = undefined;
    operator = undefined;
}

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
clearDisplay();
