class Calculator{
      constructor(displayScreen) {
            this.displayScreen = displayScreen;
            this.reset()
      }
      delete() {
          this.currentOperand = this.currentOperand.toString().slice(0,-1)  
      }
      reset() {
            this.currentOperand = " ";
            this.previousOperand = " ";
            this.operation = undefined;
            
      }
      appendNumber(number) {
            if(number == "." && this.currentOperand.includes('.')) return
            this.currentOperand =
                  this.currentOperand.toString() + number.toString();
            
      }
      chooseOperation(operation) {
            if (this.currentOperand === ' ') return
            if (this.previousOperand !== ' ') {
                  this.compute()
            }
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = " "
      }
      compute() { 
            let computation
            const prev = parseFloat(this.previousOperand);
            const current = parseFloat(this.currentOperand);
            if (isNaN(prev) || isNaN(current)) return
            switch (this.operation) {
                  
                  case '+':
                        computation = prev + current
                        break
                  case '-':
                        computation = prev - current
                        break
                  case '/':
                        computation = prev / current
                        break
                  case '×':
                        computation = prev * current
                        break
                  default:
                        break
            }
            
            this.currentOperand = computation;
            this.operation = undefined;
            this.previousOperand = '';
      }
      getDisplayNumber(number) {
            const stringNumber = number.toString();
            const integerDigits = parseFloat(stringNumber.split('.')[0]);
            const decimalDigits = stringNumber.split('.')[1];
            let integerDisplay
            if (isNaN(integerDigits)) {
                  integerDisplay = ''
            } else {
                  integerDisplay = integerDigits.toLocaleString('en',
                        { maximumFractionDigits: 0 });
            }
            if (decimalDigits != null) {
               return `${integerDisplay}.${decimalDigits}`   
            } else {
                  return integerDisplay
            }
      }
      updateDisplay() {
             this.displayScreen.innerText =
                  this.getDisplayNumber(this.currentOperand);
            if (this.operation != null) {
                  this.displayScreen.innerText =
                        `${this.getDisplayNumber(this.previousOperand)}${this.operation}${this.getDisplayNumber(this.currentOperand)}`
            }
      }
}



const numberButtons = document.querySelectorAll('[data-number]');
const displayScreen = document.querySelector('[data-operand');
const operationButtons = document.querySelectorAll('[data-operation');
const equalsButton = document.querySelector('[data-equals');
const resetButton = document.querySelector('[data-reset');
const deleteButton = document.querySelector('[data-delete');
const themeChanger = document.querySelectorAll('[name = "theme"]');


const calculator = new Calculator(displayScreen);


numberButtons.forEach(button => {
      button.addEventListener('click', () => {
            calculator.appendNumber(button.innerText);
            calculator.updateDisplay();    
      })
})

operationButtons.forEach(button => {
      button.addEventListener('click', () => {
            calculator.chooseOperation(button.innerText);
            calculator.updateDisplay()
      })
})

equalsButton.addEventListener('click', () => {
      calculator.compute()
      calculator.updateDisplay()
})

resetButton.addEventListener('click', () => {
      calculator.reset()
      calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
      calculator.delete()
      calculator.updateDisplay()
})


const storeTheme = function(theme){
      localStorage.setItem("theme", theme);
};


const getTheme = function () {
      const activeTheme = localStorage.getItem("theme");

      themeChanger.forEach((themeOption) => {
            if (themeOption.id === activeTheme) {
                  themeOption.checked = true
            }
      });
};

themeChanger.forEach((themeOption) => {
      themeOption.addEventListener('click', () => {
            storeTheme(themeOption.id);
      });
});

document.onload = getTheme();