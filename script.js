function add(num1,num2) {
    return parseFloat(num1)+parseFloat(num2);
};

function subtract(num1,num2) {
    return parseFloat(num1)-parseFloat(num2);
};

function multiply(num1,num2) {
    return num1*num2;
};

function divide(num1,num2) {
    return num1/num2;
};

function operate(num1,operator,num2) {
    if(!num2) {
        return num1
    }
    switch (operator) {
        case "+":
            return add(num1,num2);
        case "-":
            return subtract(num1,num2);  
        case "x":
            return multiply(num1,num2);   
        case "÷":    
            return divide(num1,num2);       
        default:
            return "Unknown Symbol";
    };
};

function toPercent(num) {
    return num/100
};

function switchSigns(num) {

    console.log(`switchSings(${num})`)
    if (!num) {
        return "-0";
    }
    else if (String(num).charAt(0) === "-") {
        return String(num).slice(1);
    }
    else {
        return `-${num}`;
    };
}

// Apply percent or sign switch to the active value.
// If an operator exists, modifiers apply to displayVal2; otherwise displayVal1.
function modify(num1, modifier, num2, isOperator) {
    switch (modifier) {
        case "%":
            if(num2) {
                return toPercent(num2)
            }
            return toPercent(num1);
        case "+/-":
            // No operator -> toggle displayVal1.
            // Operator present -> toggle displayVal2 (null/empty becomes -0).
            
            if (!isOperator) {
                return switchSigns(num1)
            }
            else {
                return switchSigns(num2)
            }
        default:
            return "Unknown Symbol";
    };   

};

/*
Input flow summary:
- Number key -> appends to the active display value.
- Operator key -> stores operator; if one already exists, resolves pending math first.
- Modifier key (+/-, %) -> applies immediately to the active display value.
- Equals key -> resolves current operation and keeps result in displayVal1.
*/
const keypad = document.querySelector("#keypad-container");
let displayVal1 = "0";
let displayVal2 = "0";
let operator = "";
let modifier = "";
let prevOperator = "";
let result = "";
const output = document.querySelector("#output")
keypad.addEventListener("click", (event) => {
    const target=event.target;
    if (target.id === "AC") {
        [displayVal1,displayVal2,operator,result] = ["0",false,"",false]
        output.textContent = "0";
        return
    }
    
    if (target.classList.contains("num-btn")) {
        if (!operator) {
            // Replace 0 with first entered digit.
            console.log(typeof(displayVal1))
            // Use String() so values that started as numbers still compare cleanly to "0".
            // Keep "-0" separate so we do not treat it like "0".
            if (target.textContent === ".") {
                if (!displayVal1.includes(".")) {
                    displayVal1 += "."
                    output.textContent = displayVal1
                }
                return
            }
            if (String(displayVal1) === "0") {
                displayVal1 = target.textContent;
            }
            
            // If value is -0, keep the sign and replace only the digit.
            else if (displayVal1 === "-0") {
                console.log("-0 ===")
                displayVal1 = `-${target.textContent}`
                console.log(displayVal1+" -0")
            }
            // Otherwise append the new digit.
            else {
                displayVal1 += target.textContent;
            }
            console.log(displayVal1);
            output.textContent = displayVal1;
        }
        else {
            if (target.textContent === ".") {
                if (!displayVal2.includes(".")) {
                    displayVal2 += "."
                    output.textContent = displayVal2
                }
                return
            }
            if (String(displayVal2) === "0") {
                displayVal2 = target.textContent;
            }
            else if (displayVal2 === "-0") {
                displayVal2 = `-${target.textContent}`
            }
            else {
                displayVal2 += target.textContent;
            }
            console.log("displayVal1: "+displayVal1);
            console.log("displayVal2: "+displayVal2);
            output.textContent = displayVal2;
        };

    }
    // Modifier actions target displayVal1 or displayVal2 based on operator state.
    // Example: 5 + % sets displayVal2 to .05, so equals becomes 5.05.
    else if (target.classList.contains("modifier")) {
        modifier = target.textContent;
        if (operator) {
            result = modify(displayVal1,modifier,displayVal2,true);
            output.textContent = result
        }
        else {
            result = modify(displayVal1,modifier,displayVal2,false)
            console.log(displayVal1)
            output.textContent = result
        }
    }
    // If an operator is already pending, resolve it before storing the next operator.
    // Example: 5 + 5 + becomes 10 + with 10 saved as displayVal1.
    else if (target.classList.contains("operator")) {     
        if(operator) {
            if (displayVal2) {
                output.textContent=operate(displayVal1,operator,displayVal2);
                console.log(`${displayVal1} ${operator} ${output.textContent}`);
            }
            else {
                output.textContent=operate(displayVal1,operator,result);
            }
            
            result = output.textContent;
        }
        prevOperator = operator
        operator = target.textContent;
    }
    else if (target.id === "=") {
        console.log(operator)
        if (operator) {
            console.log(operator)
            if (displayVal2) {
                console.log(displayVal2)
                output.textContent=operate(displayVal1,operator,displayVal2);
                console.log(output.textContent)
            }
            else {
                console.log(`${displayVal1} ${operator} ${displayVal1}`)
                output.textContent=operate(displayVal1,operator,displayVal1);
            }
            displayVal1 = output.textContent;
            displayVal2 = "0";
        }
        else {
            
        }
    }
    else {
        return;
    };
});


//console.log(operate(firstNum,operator,secondNum));
