// quokka: Cmd/Ctrl + K, Q

let calculatorState = {
    firstNumber: undefined,
    operator: undefined,
    secondNumber: undefined,
    displayValue: '',
};
const displayNumber = document.getElementById('display');
const buttons = document.getElementsByTagName('button');
const buttonsArray = [...buttons];

function updateDisplay(button) {
    const buttonValue = button.value;

    if (buttonValue === 'clear') {
        clearDisplay();
    } else if (buttonValue === '.' && calculatorState.displayValue.includes('.')) {
        return;
    } else if (button.classList.contains('operator')) {
        handleOperatorClick(buttonValue);
    } else if (buttonValue === '=') {
        handleEqualClick();
    } else {
        calculatorState.displayValue += buttonValue;
    }
    displayNumber.textContent = calculatorState.displayValue;
    console.log(calculatorState.displayValue);
}

function handleOperatorClick(operator) {
    if (calculatorState.firstNumber === undefined) {
        calculatorState.firstNumber = parseFloat(calculatorState.displayValue);
        // console.log(`First Number: ${calculatorState.firstNumber}`);
        // console.log(`operator: ${operator}`);
    }
    calculatorState.operator = operator;
    calculatorState.displayValue = '';
}

function handleEqualClick() {
    if (calculatorState.firstNumber !== undefined && calculatorState.operator !== undefined && calculatorState.displayValue !== '') {
        calculatorState.secondNumber = parseFloat(calculatorState.displayValue);
        console.log(`secondNumber : ${calculatorState.secondNumber}`);
        const result = operate(calculatorState.firstNumber, calculatorState.secondNumber, calculatorState.operator);
        calculatorState.displayValue = result.toString();
        calculatorState.firstNumber = result;
        calculatorState.operator = undefined;
        calculatorState.secondNumber = undefined;
    }
}

buttonsArray.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        updateDisplay(button);
    });
});

function clearDisplay() {
    calculatorState = {
        firstNumber: undefined,
        operator: undefined,
        secondNumber: undefined,
        displayValue: '',
    };
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
            return 'Invalid Number';
            break;
    }
}
