document.addEventListener("DOMContentLoaded", function() {
    // Get the calculator table and result label
    const calculatorTable = document.getElementById("myTable");
    const resultLabel = document.getElementById("result");
    
    // Initialize the current calculation
    let currentCalculation = "";
    
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
            } else {
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
