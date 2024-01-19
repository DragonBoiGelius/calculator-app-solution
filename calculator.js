let expression = "";
let lastChar = "";

let isNumberWithPointEnd = true;

let display = $("#display");

$("button").click(HandleButtonValue);

function HandleButtonValue() {
    var buttonValue = $(this).val();
    
    if (buttonValue == "reset") {
        ClearExpression();
        return;
    } else if (buttonValue == "del") {
        RemoveLastFromExpression();
        return;
    } else if (buttonValue == "equal" ) { // && validExpression
        CalcExoression();
        return;
    } 

    AddToExpression(buttonValue);
}

function CalcExoression() {
    let result = eval(expression);
    ShowInDisplay(result);
    expression = result.toString();
    lastChar = expression[expression.length - 1];
}

function AddToExpression(value) {

    if (lastChar == "") {
        if (value == "+" || value == "-" || value == "." || (value.charCodeAt() >= 48 && value.charCodeAt() <= 57)) {
            expression += value;
            lastChar = value;
        }
    } else if (lastChar == "/" || lastChar == "*") {
        if (value == "+" || value == "-" || value == "." || (value.charCodeAt() >= 48 && value.charCodeAt() <= 57)) {
            expression += value;
            lastChar = value;
            isNumberWithPointEnd = true;
        }
    } else if (lastChar == "+" || lastChar == "-") {
        if (value == "." || (value.charCodeAt() >= 48 && value.charCodeAt() <= 57)) {
            expression += value;
            lastChar = value;
            isNumberWithPointEnd = true;
        }
    } else if (lastChar == "." && isNumberWithPointEnd) {
        if (value.charCodeAt() >= 48 && value.charCodeAt() <= 57) {
            expression += value;
            lastChar = value;
            isNumberWithPointEnd = false;
        }
    } else if (lastChar.charCodeAt() >= 48 && lastChar.charCodeAt() <= 57) {
        if (value == "+" || value == "-" || isNumberWithPointEnd || value == "/" || value == "*" || 
            (value.charCodeAt() >= 48 && value.charCodeAt() <= 57)) {
            expression += value;
            lastChar = value;
        }
    } 
    
    ShowInDisplay(expression);
}

function RemoveLastFromExpression() {
    expression = expression.slice(0, -1);
    
    if (expression == "") {
        lastChar = "";
        ShowInDisplay("0");
    } else {
        lastChar = expression[expression.length - 1];
        ShowInDisplay(expression);
    }
}

function ClearExpression() {
    expression = "";
    lastChar = "";
    ShowInDisplay("0");
}

function ShowInDisplay(value) {
    display.text(value);
}