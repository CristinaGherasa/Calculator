class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.equalWasPressed = false
        this.previousOperandElement = previousOperandElement
        this.currentOperandElement = currentOperandElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''              
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    clearCurrentOperand() {
        this.currentOperand = ''
    }

    appendNumber(number) {
        if(this.equalWasPressed === true) {
            this.currentOperand = ''
            this.equalWasPressed = false
        }
        if (number === '.' && this.currentOperand === '') {
            this.currentOperand = '0'
        }

        if (number === '.' && String(this.currentOperand).includes('.')) {
            return
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString()
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return
        }
        if (this.currentOperand !== '') {
            this.compute()
        }

        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    directChooseOperation(operation) {
        if (this.currentOperand === '') {
            return
        }

        this.operation = operation
        this.previousOperand = this.currentOperand

        if (this.currentOperand !== '') {
            this.directCompute()
        }
    }

    compute() {
        let computation
        let prev = parseFloat(this.previousOperand)       
        let current = parseFloat(this.currentOperand)    

        if (isNaN(prev) || isNaN(current)) {
            return
        }

        switch (this.operation) {
            case '÷':
                computation = prev / current
                break
            case '*':
                computation = prev * current
                break
            case '-':
                computation = prev - current
                break
            case '+':
                computation = prev + current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = ''
        this.previousOperand = ''
    }

    directCompute() {
        let computation
        let current = parseFloat(this.currentOperand)

        if (this.operation === '√') {
            computation = Math.sqrt(current)
        }
        if (this.operation === '1/x') {
            computation = 1 / current
        }
        if (this.operation === 'x²') {
            computation = current * current
        }
        if (this.operation === '%') {
            computation = current / 100
        }

        this.currentOperand = computation

    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay

        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })     
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`              
        } else {
            return integerDisplay
        }
    }

    plusMinusHandler() {
        if (this.currentOperand === '') return

        this.currentOperand *= -1
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand)

        if (this.operation != null) {
            this.previousOperandElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`      
        } else {
            this.previousOperandElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('.data-number');
const operationButtons = document.querySelectorAll('.data-operation');
const directOperationButtons = document.querySelectorAll('.direct-operation');
const clearButton = document.querySelector('.clear-current-operand');
const allClearButton = document.querySelector('.all-clear');
const deleteButton = document.querySelector('.delete');
const minusPlusButton = document.querySelector('.minus-or-plus');
const equalsButton = document.querySelector('.data-equals');
const previousOperandElement = document.querySelector('.previous-operand');
const currentOperandElement = document.querySelector('.current-operand');

const calculator = new Calculator(previousOperandElement, currentOperandElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

directOperationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.directChooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
    calculator.equalWasPressed = true
})

minusPlusButton.addEventListener('click', () => {         
    calculator.plusMinusHandler()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', () => {
    calculator.clearCurrentOperand()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete(currentOperandElement)
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})



