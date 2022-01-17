import '../scss/main.scss';
import { initializeForm } from './helpers/form-validator.js';
import { calculate, results } from './helpers/calculator.js';

// Form Validation
initializeForm('.js-formInput');

// Calculator
const billInput = document.querySelector('#bill');
const peopleInput = document.querySelector('#people');
const radio = document.querySelector('.js-formRadio');
const radioInput = document.querySelector('.js-radioInput');
let enteredValue = { bill: null, tip: null, people: null };

const resetRadioBtn = (enteredValue) => {
  const radioBtnArr = document.querySelectorAll('.js-radioBtn');

  if (enteredValue !== '') {
    radioBtnArr.forEach((btn) => {
      btn.checked = false;
    });
  }
};

const updateResults = () => {
  const resultTip = document.querySelector('#resultTip');
  const resultTotal = document.querySelector('#resultTotal');

  resultTip.innerText = `$${results.tip}`;
  resultTotal.innerText = `$${results.total}`;
};

billInput.addEventListener('blur', (e) => {
  const bill = parseInt(e.target.value);

  enteredValue = { ...enteredValue, bill };

  calculate(enteredValue);

  updateResults();
});

radio.addEventListener('click', (e) => {
  if (e.target.classList.contains('form__radio-label')) {
    const tip = parseInt(e.target.dataset.amount);

    enteredValue = { ...enteredValue, tip };

    calculate(enteredValue);

    updateResults();
  }
});

radioInput.addEventListener('blur', (e) => {
  const tip = parseInt(e.target.value);

  enteredValue = { ...enteredValue, tip };

  resetRadioBtn(e.target.value);

  calculate(enteredValue);

  updateResults();
});

peopleInput.addEventListener('blur', (e) => {
  const people = parseInt(e.target.value);

  enteredValue = { ...enteredValue, people };

  calculate(enteredValue);

  updateResults();
});
