let firstNumber = null;
let operator = null;
let secondNumber = null;
let displayValue = '0';

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
    return "Can't divide by 0";
  }
  return a / b;
}

function operate(operator, a, b) {
  console.log(`Operating: ${a} ${operator} ${b}`);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

function updateDisplay() {
  const display = document.querySelector(".display");
  display.textContent = displayValue;
}

//handle number input
function handleNumberInput(number) {
  if (displayValue === "0") {
    displayValue = number;
  } else {
    displayValue += number;
  }
  updateDisplay();
}

function handleOperatorInput(op){
    if (firstNumber === null){
        firstNumber = parseFloat(displayValue);
        operator = op;
        displayValue = "0";
    }
    else 
    {
        calculate();
        operator = op;
    }  
}

function calculate() {
  if (firstNumber !== null && operator !== null) {
    secondNumber = parseFloat(displayValue);
    let result = operate(operator, firstNumber, secondNumber);
    if (typeof result === "number") {
      result = Math.round(result * 1000000) / 1000000; 
    }
    displayValue = result.toString();
    updateDisplay();
    firstNumber = result;
    secondNumber = null;
    operator = null;
  }
}

function clearCalculator() {
  firstNumber = null;
  operator = null;
  secondNumber = null;
  displayValue = "0";
  updateDisplay();
}

//event listeners
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".buttons button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;
      if ("0123456789.".includes(value)) {
        handleNumberInput(value);
      } else if ("+-*/".includes(value)) {
        handleOperatorInput(value);
      } else if (value === "=") {
        calculate();
      } else if (value === "C") {
        clearCalculator();
      }
    });
  });
});
