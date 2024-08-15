function add(num1,num2) {
    return num1+num2;
};

function subtract(num1,num2) {
    return num1-num2;
};

function multiply(num1,num2) {
    return num1*num2;
};

function divide(num1,num2) {
    return num1/num2;
};

function operate(num1,operator,num2) {
    switch (operator) {
        case "+":
            return add(num1,num2);
        case "-":
            return subtract(num1,num2);  
        case "*":
            return multiply(num1,num2);   
        case "/":    
            return divide(num1,num2);   
        default:
            return "Unknown symbol";
    };
};

/* Key Press Options:
If key is number, and an operator pressed, it clears the screen and puts the new number on the screen, 
storing the previous two values the number and the operator and waiting for another number, = 
or an operator to be hit
If the key is a number and the current value is a number, the number is added to the previous number

If the key is an operator like +, -, /, *, it will store the operation 
If a special operation like CE, +/-, or % is hit, it will immediatly do its thing; clearing the screen,
changing positive/negative symbol, or changing to a percent by diving 100.
If an operator is hit but there is already an operator stored (an operator was hit previously 
and it has not been cleared or equaled yet), it will do the operation then store the result as 
displayVal 1
If = is hit it performs the operation if there is one and stores the result as displayVal2

There are two numbers stored divided by the operator (+, -, /, *)
*/
const keypad = document.querySelector("#keypad-container");
let displayVal1;
let displayVal2;
let operator;
keypad.addEventListener("click", (event,displayVal1,displayVal2,operator) => {
    const target=event.target;
    if (target.classList.contains("num-btn")) {
        if (!operator) {
            displayVal1 += target.textContent;
        }
        else {
            displayVal2 += target.textContent;
        };
            
    }
    else if (target.classList.contains("operator")) {
        if(operator) {
            operate(displayVal1,operator,displayVal2)
        }
        operator = target.textContent;
    }
    else {
        return;
    };
});


//console.log(operate(firstNum,operator,secondNum));