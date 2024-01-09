let calculatorState = {
    firstNumber: [],
    operator: undefined,
    secondNumber: [],
    displayValue: '',
    isResultDisplayed: false,
};

const displayNumber = document.getElementById('display');
const buttons = document.getElementsByTagName('button');
const buttonsArray = [...buttons];
const calculationText = document.getElementById('calculation-text');

function updateDisplay(button) {
    const buttonType = getButtonType(button.value);

    if (buttonType == 'clear') {
        clearDisplay();
        return;
    } 

    if (buttonType === 'number') {
        calculatorState.displayValue += parseFloat(button.value);
        displayNumber.innerText = calculatorState.displayValue;
        console.log(calculatorState.displayValue);
    }

    if(buttonType === 'decimal') {
        if(!calculatorState.displayValue.includes('.')) {
            calculatorState.displayValue += '.';
            displayNumber.innerText = calculatorState.displayValue;
        }
    }

    if (buttonType === 'operator' && calculatorState.firstNumber.length === 0) { //store the first number when operator is pressed
        calculatorState.firstNumber = parseFloat(calculatorState.displayValue);
        calculatorState.operator = button.value;
        calculatorState.displayValue = '';
        calculationText.textContent = `${calculatorState.firstNumber} ${calculatorState.operator}`;
        console.log(`First Number: ${calculatorState.firstNumber}`);
        console.log(`operator: ${calculatorState.operator}`);
    }

    if (buttonType === 'number' && calculatorState.firstNumber.length != 0 && calculatorState.operator != undefined) { //store the second number
        calculatorState.secondNumber = parseFloat(calculatorState.displayValue);
        calculationText.textContent = `${calculatorState.firstNumber} ${calculatorState.operator} ${calculatorState.secondNumber}`;
        console.log(`second Number: ${calculatorState.secondNumber}`);
    }

    if (buttonType === 'operator' && calculatorState.firstNumber.length != 0) {
        calculatorState.operator = button.value;
        calculatorState.displayValue = '';
        calculationText.textContent = `${calculatorState.firstNumber} ${calculatorState.operator}`;
    }

    if ((buttonType === 'operator' || buttonType === 'equals') && calculatorState.firstNumber.length != 0 && calculatorState.secondNumber.length != 0) { //operate
        calculatorState.firstNumber = operate(calculatorState.firstNumber, calculatorState.secondNumber, calculatorState.operator);
        calculatorState.displayValue = calculatorState.firstNumber;
        
        if(buttonType === 'equals') {
            calculatorState.operator = undefined;
            calculationText.textContent = `${calculatorState.firstNumber}`;
        } else {
            calculatorState.operator = button.value;
            calculationText.textContent = `${calculatorState.firstNumber} ${calculatorState.operator}`;
        }

        displayNumber.innerText = calculatorState.displayValue;
        calculatorState.secondNumber = [];
        calculatorState.displayValue = '';
        // calculationText.textContent = `${calculatorState.firstNumber} ${calculatorState.operator}`;
        console.log(`result is ${calculatorState.firstNumber}`);
        console.log(calculatorState);
    }

    if (buttonType === 'delete') {
        calculatorState.displayValue = calculatorState.displayValue.slice(0, -1);
        displayNumber.innerText = calculatorState.displayValue;
        console.log("yolodelete");
    }   
}

buttonsArray.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        updateDisplay(button);
    });
});

function getButtonType(buttonValue) {
    if (/[0-9]/.test(buttonValue)) {
        return 'number';
    } else if (['+', '-', '*', '/'].includes(buttonValue)) {
        return 'operator';
    } else if (['='].includes(buttonValue)) {
        return 'equals';
    } else if (buttonValue === 'clear') {
        return 'clear';
    } else if (buttonValue === '.') {
        return 'decimal';
    } else if (buttonValue === 'delete') {
        return 'delete';
    } else {
        return 'other'; // replace
    }
}
function clearDisplay() {
    calculatorState = {
        firstNumber: [],
        operator: undefined,
        secondNumber: [],
        displayValue: '',
        isResultDisplayed: false,
    };
    displayNumber.innerText = '0';
    calculationText.textContent = '';
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
    if (b === 0) {
        return 'Cannot divide by zero';
    }
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
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;

    
    const buttonValue = mapKeyboardKeyToButtonValue(key);

    if (buttonValue) {
       
        const mockButton = { value: buttonValue };
        updateDisplay(mockButton);
    }
});

function mapKeyboardKeyToButtonValue(key) {
    switch (key) {
        case 'Enter':
            return '=';
        case 'Escape':
            return 'clear';
        case '+':
        case '-':
        case '*':
        case '/':
            return key;
        case '.':
            return '.';
        case 'Backspace':
            return 'delete';
        default:
            return /[0-9]/.test(key) ? key : null;
    }
}


document.addEventListener('keydown', function (event) {
    console.log('Pressed key:', event.key);
});

