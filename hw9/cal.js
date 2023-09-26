document.addEventListener("DOMContentLoaded", function() {
    // Get the calculator table and result label1+1
    const calculatorTable = document.getElementById("myTable");
    const resultLabel = document.getElementById("result");

    // Initialize the current calculation
    let currentCalculation = "";
    let memmory = 0;

    // Helper function to update the result label
    function updateResult() {
        resultLabel.textContent = currentCalculation;
    }

    // Add event listeners to table cells
    calculatorTable.addEventListener("click", function(event) {
        console.log(event.target);

        if (event.target.tagName === "TD") {
            const cellValue = event.target.textContent;
            
            if (cellValue === "=") {
                try {
                    currentCalculation = eval(currentCalculation);
                    updateResult();
                } catch (error) {
                    currentCalculation = "Error";
                    updateResult();
                }
            }
            else if (cellValue === "<") {
                console.log("backspace");
                currentCalculation = currentCalculation.slice(0, -1);
                updateResult();
            } else if (cellValue === "C") {
                currentCalculation = "";
                updateResult();
            } else if (cellValue === "Scientific") {} 
            else if (cellValue === "sin") {
                currentCalculation = Math.sin(currentCalculation);
                updateResult();
            } else if (cellValue === "cos") {
                currentCalculation = Math.cos(currentCalculation);
                updateResult();
            } else if (cellValue === "tan") {
                currentCalculation = Math.tan(currentCalculation);
                updateResult();
            }  else if (cellValue === "π") {
                currentCalculation = Math.PI;
                updateResult();
            } else if (cellValue === "√x") {
                currentCalculation = Math.sqrt(currentCalculation);
                updateResult();
            } else if (cellValue === "x²") {
                currentCalculation = Math.pow(currentCalculation, 2);
                updateResult();
            } else if (cellValue === "1/x") {
                currentCalculation = 1/currentCalculation;
                updateResult();
            } else if (cellValue === "x!") {
                currentCalculation = factorial(currentCalculation);
                updateResult();
            } else if (cellValue === "mc") {
                memmory = 0;
            } else if (cellValue === "m+") {  
                memmory += currentCalculation;
            } else if ( cellValue === "m-") {   
                memmory -= currentCalculation;
            } else if (cellValue === "mr") {
                currentCalculation = memmory;
                updateResult();
            }
            else {
                currentCalculation += cellValue;
                updateResult();
            }
        }
    });

    // Add event listener for key presses
    document.addEventListener("keypress", function(event) {
        const keyValue = event.key;
    
        if (!isNaN(keyValue) || "+-*/".includes(keyValue)) {
            currentCalculation += keyValue;
            updateResult();
        } else if (keyValue === "=" || event.key === "Enter") {
            try {
                currentCalculation = eval(currentCalculation);
                updateResult();
            } catch (error) {
                currentCalculation = "Error";
                updateResult();
            }
        } else if (keyValue === "c" || keyValue === "C") {
            currentCalculation = "";
            updateResult();
        }
    });
});



