import { getFormStatus } from './form-validator.js';

const getResult = ({ bill = 0, tip = 0, people = 0 }) => {
  const tipPerPerson = (bill * tip) / 100 / people;
  const billPerPerson = bill + tipPerPerson;

  updateResults(tipPerPerson, billPerPerson);
};

const updateResults = (tip, total) => {
  results = { tip, total };
};

export const calculate = (enteredValue) => {
  const isFormValid = getFormStatus();

  if (isFormValid) {
    getResult(enteredValue);
  }
};

export let results = {
  tip: 0,
  total: 0,
};
