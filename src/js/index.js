import '../scss/main.scss';
import { initializeForm, resetForm } from './helpers/form-validator.js';
import { calculate, results, resetResults } from './helpers/calculator.js';

// Form Validation
initializeForm('.js-formInput');

// Calculator UI
const billInput = document.querySelector('#bill');
const peopleInput = document.querySelector('#people');
const radio = document.querySelector('.js-formRadio');
const radioInput = document.querySelector('.js-radioInput');
const resetBtn = document.querySelector('#btnReset');
const resultTip = document.querySelector('#resultTip');
const resultTotal = document.querySelector('#resultTotal');

const updateResults = () => {
  resultTip.innerText = `$${results.tip}`;
  resultTotal.innerText = `$${results.total}`;
};

const resetRadioBtn = (num) => {
  const radioBtnArr = document.querySelectorAll('.js-radioBtn');

  if (num !== '') {
    radioBtnArr.forEach((btn) => {
      btn.checked = false;
    });
  }
};

const setResetBtn = (state) => {
  if (state === 'disabled') {
    resetBtn.disabled = true;
    resetBtn.classList.remove('btn-reset--active');
  } else if (state === 'active') {
    resetBtn.disabled = false;
    resetBtn.classList.add('btn-reset--active');
  }
};

const resetCalculator = () => {
  billInput.value = '';
  peopleInput.value = '';
  radioInput.value = '';
  resultTip.innerText = `$0`;
  resultTotal.innerText = `$0`;

  setResetBtn('disabled');
  resetRadioBtn();
  resetForm();
  resetResults();
};

// Calculator Events
let enteredValue = { bill: null, tip: null, people: null };

billInput.addEventListener('blur', (e) => {
  setResetBtn('active');

  const bill = parseInt(e.target.value);

  enteredValue = { ...enteredValue, bill };

  calculate(enteredValue);

  updateResults();
});

radio.addEventListener('click', (e) => {
  if (e.target.classList.contains('form__radio-label')) {
    setResetBtn('active');

    const tip = parseInt(e.target.dataset.amount);

    enteredValue = { ...enteredValue, tip };

    calculate(enteredValue);

    updateResults();
  }
});

radioInput.addEventListener('blur', (e) => {
  setResetBtn('active');

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

  setResetBtn('active');
});

resetBtn.addEventListener('click', (e) => {
  resetCalculator();
});
