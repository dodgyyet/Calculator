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

//If there is a num2 it will get the number from that if not then num1. 
// Returns to either displayVal1 or displayVal2 depending on if there is an operator
function modify(num1, modifier, num2, isOperator) {
    switch (modifier) {
        case "%":
            if(num2) {
                return toPercent(num2)
            }
            return toPercent(num1);
        case "+/-":
            // If there is no operator (just 1 number) it returns the negative of num1
            // If there is an operator it returns negative of num2 which if num2 is null returns -0
            
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
            // 0 is replaced with the new number
            console.log(typeof(displayVal1))
            //Uses String() to ensure it is equal to the string 0 even if the 0 was changed in some way
            //It must be tested equality to a string so -0 doesn't show up as equal
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
            
            // If -0 replaces the 0 but keeps the -
            else if (displayVal1 === "-0") {
                console.log("-0 ===")
                displayVal1 = `-${target.textContent}`
                console.log(displayVal1+" -0")
            }
            // Else it just adds the new number
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
    //It returns to either num1 or num2 depending on the if there is an operator or not
    //If a 5 then + is entered then % it will make num2 .05 and when equaled be 5.05
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
    //If there is already an operator it does that operation first before adding the new one
    //So if 5 + 5 + is entered it will become 10 + as 10 becomes displayVal1
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