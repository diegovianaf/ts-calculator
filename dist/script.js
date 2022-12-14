"use strict";
const calculatorElement = document.getElementById('calculator');
const resultElement = document.getElementById('result');
function evaluate(expression) {
    // not so safe, used only for learning
    try {
        if (expression.match(/[a-zA-Z&#$<>{}]/g))
            throw new Error();
        return new Function(`return (${expression})`)();
    }
    catch (error) {
        return null;
    }
}
function isNumber(value) {
    if (typeof value === 'number') {
        return !isNaN(value) && isFinite(value);
    }
    else
        return false;
}
function round(value) {
    return Math.round(value * 1000) / 1000;
}
function calculate() {
    localStorage.setItem('calculadora', calculatorElement.value);
    const lines = calculatorElement.value.split(/\r?\n/).map(evaluate);
    resultElement.innerHTML = `<div>${lines
        .map((line) => `<div>${isNumber(line) ? round(line) : '---'}</div>`)
        .join('')}</div>`;
    const total = round(lines.filter(isNumber).reduce((acc, cur) => acc + cur, 0));
    resultElement.innerHTML += `<div id="total">${total}</div>`;
    const totalElement = document.getElementById('total');
    totalElement.addEventListener('click', () => {
        navigator.clipboard.writeText(total.toString());
    });
}
calculatorElement.value = localStorage.getItem('calculator') || '';
calculatorElement.addEventListener('input', calculate);
calculate();
//# sourceMappingURL=script.js.map