var clickSound = new Audio('click.mp3');
var operators = ["+", "-", "*", "/"];
var hasResult = false;

function getCalcOutput() {
    return document.getElementById("output-text").innerText;
}

function printCalcOutput(text) {
    document.getElementById("output-text").innerText = text;
}

function handleButtonClick(buttonId) {
    clickSound.play();
    var output = getCalcOutput();

    if (buttonId == "clear") {
        printCalcOutput("");
    } else if (buttonId == "backspace") {
        if (output) {
            output = output.slice(0, -1);
            printCalcOutput(output);
        }
    } else if (buttonId == "=") {
        try {
            var result = eval(output);

            if (isNaN(result) || result === undefined) {
                result = "error";
                output = "";
            }

            printCalcOutput(result);
        } catch (error) {
            result = "error";
            output = "";
            printCalcOutput(result);
        }
    } else {
        if (output.length === 0 && operators.includes(buttonId)) {
            printCalcOutput("");
        } else {
            output = hasResult || output === "error" ? buttonId : output + buttonId;

            hasResult = false;
            printCalcOutput(output);
        }
    }
}

window.onload = function() {
    var calcButtons = document.querySelectorAll('.calc-button');
    var powerButton = document.querySelector('#power');
    var calculator = document.querySelector('#calculator-container');
    var screen = document.querySelector('#result-container'); 

    // Start with the calculator off
    calculator.classList.add('off');
    screen.classList.add('off');
    for (var i = 0; i < calcButtons.length; i++) {
        calcButtons[i].disabled = true;
    }

    powerButton.addEventListener('click', function() {
        var isOff = calculator.classList.toggle('off');
        screen.classList.toggle('off');

        // Disable or enable the calculator buttons based on the power button state
        for (var i = 0; i < calcButtons.length; i++) {
            calcButtons[i].disabled = isOff;
        }
    });

    for (var i = 0; i < calcButtons.length; i++) {
        calcButtons[i].addEventListener("click", function () {
            if (!this.disabled) {
                handleButtonClick(this.id);
            }
        });
    }
}