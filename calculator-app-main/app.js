'use strict'

class Operand {
  constructor() {
    this.value = ''
    this.integralCount = 0
    this.fractionalCount = 0
    this.isDecimal = false
  }

  format(final = false) {

    let number = Number.parseFloat(this.value)

    if (final)  number = number.toString().replace(/[,\s]/g, '')
    else  number = number.toFixed(this.fractionalCount).toString()
  
    return  this.isDecimal && this.fractionalCount === 0 ? number + '.' : number
  }
}

class Calculator {
  constructor() {
    this.firstOperand = null
    this.secondOperand = null
    this.currentOperand = null
  }

  addDigit(digit) {
    if (!this.currentOperand) return

    if (digit === '.' && this.currentOperand.isDecimal) return

    this.currentOperand.value += digit
    this.currentOperand.isDecimal ? this.currentOperand.fractionalCount++ : this.currentOperand.integralCount++

    if (digit === '.') {
      this.currentOperand.isDecimal = true
      this.currentOperand.integralCount--

      if (this.currentOperand.integralCount === 0) {
        this.currentOperand.value = '0.'
      }
    }

    if (!this.isFiniteOperand(this.currentOperand)) {
      alert("Invalid Operation - Too large")
      this.deleteDigit()
    } else {
      this.currentOperand.value = this.currentOperand.format()
    }
  }

  deleteDigit() {
    if (!this.currentOperand) return

    if (operation.operationStarted && this.secondOperand === null) {
      operation.operationStarted = false
      operation.operationSelected = ''
      return
    }

    if (this.currentOperand.value.length <= 1) {
      operation.operationStarted ? this.secondOperand = null : this.firstOperand = null
      this.currentOperand = this.firstOperand
      return
    }

    if (this.isDecimal && this.fractionalCount === 0)   this.isDecimal = false
    else  this.isDecimal ? this.fractionalCount-- : this.integralCount-- 

    this.currentOperand.value = this.currentOperand.value.slice(0, -1) || ''
  }

  updateValue(number = this.currentOperand.value) {
    if (!this.currentOperand) return

    this.currentOperand.value = number
    
    let formattedNumber
    this.currentOperand.value = formattedNumber = this.currentOperand.format(true)

    console.log(formattedNumber)
    this.currentOperand.isDecimal = formattedNumber.includes('.');

    const [integral, fractional] = formattedNumber.split('.')

    this.currentOperand.integralCount = integral ? integral.length : 0
    this.currentOperand.fractionalCount = fractional ? fractional.length : 0
  }

  reset() {
    this.firstOperand = this.secondOperand = this.currentOperand = null
    operation.operationStarted = false
    operation.operationSelected = ''
  }

  isFiniteOperand(operand) {
    const number = Number(operand.value)
    return Number.isFinite(number)
  }
}

  class Operation {

    constructor(calculator) {
      this.calculator = calculator
      this.operationStarted = false
      this.operationSelected = ''
    }

  performOperation(operator) {
    const result = this.evaluateOperation()

    if (!Number.isFinite(result)) {
      calculator.reset()
      alert("Invalid Operation - Can't divide by Zero")
      return;
    }

    calculator.currentOperand = calculator.firstOperand
    calculator.secondOperand = null

    calculator.updateValue(result)

    this.operationStarted = operator !== '='
    this.operationStarted ? this.operationSelected = operator : this.operationSelected = ''

  }

  evaluateOperation() {
    const num1 = calculator.firstOperand ? Number(calculator.firstOperand.value) : 0
    const num2 = calculator.secondOperand ? Number(calculator.secondOperand.value) : 0

    switch (this.operationSelected) {
      case '+':
        return num1 + num2
      case '-':
        return num1 - num2
      case '*':
        return num1 * num2
      case '/':
        return num1 / num2
      default:
        return 0
    }
  }
}

// Initialize calculator
const calculator = new Calculator()
const operation = new Operation(calculator)

window.addEventListener('DOMContentLoaded', () => {
  const chosenTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "3" : "2"
  updateTheme(chosenTheme)
});

const themes = Array.from(document.querySelector('.theme-choice').children)
const currentTheme = document.querySelector('.theme-chosen')
const keypad = Array.from(document.getElementById('keypad').children)
const display = document.querySelector('#display input')

themes.forEach(theme => {
  theme.addEventListener('click', () => {
    const chosenTheme = theme.getAttribute('data-theme')
    if (currentTheme.getAttribute('data-theme') !== chosenTheme) updateTheme(chosenTheme)
  });
});

keypad.forEach(key => {
  key.addEventListener('click', () => {
    const keyTypes = new Set(Array.from(key.classList))

    if (keyTypes.has('action')) {
      key.textContent === 'del' ? calculator.deleteDigit() : calculator.reset()
    }

    if (keyTypes.has('operator')) {
      if (!calculator.currentOperand) return

      const operator = key.textContent

      if (calculator.secondOperand === null) {
        if (operator === '=') return;

        operation.operationStarted = true
        calculator.updateValue()
        operation.operationSelected = operator
      }

      calculator.secondOperand && operation.performOperation(operator)
    }

    if (keyTypes.has('number')) {
      if (calculator.firstOperand === null) {
        calculator.firstOperand = new Operand();
        calculator.currentOperand = calculator.firstOperand;
      }

      if (operation.operationStarted && calculator.secondOperand === null) {
        calculator.secondOperand = new Operand()
        calculator.currentOperand = calculator.secondOperand
      }

      calculator.addDigit(key.textContent)
    }

    display.value = `${calculator.firstOperand?.value || ''} ${operation.operationSelected || ''} ${calculator.secondOperand?.value || ''}`
    display.scrollLeft = display.scrollWidth
  });
});

function updateTheme(theme) {
  currentTheme.setAttribute('data-theme', theme)
}
