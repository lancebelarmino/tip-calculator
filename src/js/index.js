import '../scss/main.scss';

const formValidator = (function () {
  let fields = [];

  let isFieldValid = {
    bill: null,
    custom: true,
    people: null,
  };

  const regex = {
    currency: /^([1-9]{1}[\d]{0,2}(\,[\d]{3})*(\.[\d]{0,2})?|[1-9]{1}[\d]{0,}(\.[\d]{0,2})?|0(\.[\d]{0,2})?|(\.[\d]{1,2})?)$/,
    percentage: /^(100(\.00?)?|[1-9]?\d(\.\d\d?)?)?%$/,
    population: /^[1-9]{1,3}((,[0-9]{3})*|([0-9])*)$/,
  };

  const getFields = (selector) => {
    const fieldArr = Array.from(document.querySelectorAll(selector));
    fields = [...fieldArr];
  };

  const validateOnBlur = () => {
    fields.forEach((field) => {
      field.addEventListener('blur', (e) => {
        validateField(field);
      });
    });
  };

  const validateField = (field) => {
    let error;

    switch (field.id) {
      case 'bill':
        if (field.value === '') {
          setFieldStatus(field, {
            isValid: false,
            error: `Can't be blank`,
          });
          return;
        } else if (field.value == 0) {
          error = `Can't be zero`;
        }

        setFieldStatus(field, {
          isValid: regex.currency.test(field.value),
          error,
        });
        break;

      case 'custom':
        if (field.value.includes('.')) {
          error = `No decimals`;
        } else if (field.value > 100) {
          error = `< 100 only`;
        }

        setFieldStatus(field, {
          isValid: regex.currency.test(field.value),
          error,
        });
        break;

      case 'people':
        if (field.value === '') {
          setFieldStatus(field, {
            isValid: false,
            error: `Can't be blank`,
          });
          return;
        } else if (field.value == 0) {
          error = `Can't be zero`;
        } else if (field.value.includes('.')) {
          error = `No decimals`;
        }

        setFieldStatus(field, {
          isValid: regex.population.test(field.value),
          error,
        });
        break;
    }
  };

  const setFieldStatus = (field, status) => {
    const formBlock = field.parentElement;
    const fieldMessage = document.createElement('span');

    fieldMessage.className = 'form__message';

    if (field.id === 'custom') {
      fieldMessage.classList.add('form__radio-message');
    }

    if (status.isValid) {
      clearFieldStatus(field);
      isFieldValid = { ...isFieldValid, [`${field.id}`]: true };
    } else {
      clearFieldStatus(field);
      fieldMessage.innerText = `${status.error}`;
      field.classList.add('form__input--error');
      isFieldValid = { ...isFieldValid, [`${field.id}`]: false };
    }

    formBlock.insertBefore(fieldMessage, field.nextSibling);
  };

  const clearFieldStatus = (field) => {
    const fieldMessage = field.nextElementSibling;

    if (fieldMessage !== null) {
      fieldMessage.remove();
    }

    field.classList.remove('form__input--error');
  };

  return {
    init(form, fieldSelector) {
      getFields(fieldSelector);
      validateOnBlur();
    },
    getFormStatus() {
      if (Object.values(isFieldValid).every((input) => input === true)) {
        return true;
      }
      return false;
    },
  };
})();

const tipForm = document.querySelector('#tipForm');

formValidator.init(tipForm, '.js-formInput');

const calculator = (function () {
  let tip;

  const calculatorHandler = () => {
    const radio = document.querySelector('.js-formRadio');
    const billInput = document.querySelector('#bill');
    const peopleInput = document.querySelector('#people');
    const radioInput = document.querySelector('.js-radioInput');

    billInput.addEventListener('blur', () => {
      getResult();
    });

    peopleInput.addEventListener('blur', () => {
      getResult();
    });

    radio.addEventListener('click', (e) => {
      if (e.target.classList.contains('form__radio-label')) {
        tip = parseInt(e.target.dataset.amount);
        getResult();
      }
    });

    radioInput.addEventListener('blur', (e) => {
      resetRadioBtn(e.target.value);
      tip = parseInt(e.target.value);
      getResult();
    });
  };

  const resetRadioBtn = (enteredValue) => {
    const radioBtnArr = document.querySelectorAll('.js-radioBtn');

    if (enteredValue !== '') {
      radioBtnArr.forEach((btn) => {
        btn.checked = false;
      });
    }
  };

  const getResult = () => {
    const isFormValid = formValidator.getFormStatus();

    const bill = parseInt(document.querySelector('#bill').value);
    const people = parseInt(document.querySelector('#people').value);

    const tipPerPerson = (bill * tip) / 100 / people;
    const billPerPerson = bill + tipPerPerson;

    if (isFormValid) {
      console.log(tipPerPerson, billPerPerson);
      return {
        tipPerPerson,
        billPerPerson,
      };
    }
  };

  return {
    init() {
      calculatorHandler();
    },
    tipPerPerson: getResult.tipPerPerson,
    billPerPerson: getResult.billPerPerson,
  };
})();

calculator.init();
