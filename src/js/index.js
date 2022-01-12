import '../scss/main.scss';

const FormValidator = (function () {
  const regex = {
    currency: /^[+-]?[1-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/,
    percentage: /^(100(\.00?)?|[1-9]?\d(\.\d\d?)?)?%$/,
    population: /^[1-9]{1,3}((,[0-9]{3})*|([0-9])*)$/,
  };

  let fields = [];

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
    if (field.value === '') {
      setFieldStatus(field, {
        isValid: false,
        error: `Can't be blank`,
      });
    } else {
      let error;

      switch (field.id) {
        case 'bill':
          if (field.value == 0) {
            error = `Can't be zero`;
          }

          setFieldStatus(field, {
            isValid: regex.currency.test(field.value),
            error,
          });
          break;

        case 'custom':
          if (field.value == 0) {
            error = `Can't be zero`;
          } else if (field.value.includes('.')) {
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
          if (field.value == 0) {
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
    }
  };

  const setFieldStatus = (field, status) => {
    const formBlock = field.parentElement;
    const fieldMessage = document.createElement('span');

    fieldMessage.className = 'form__message';

    if (field.id === 'custom') {
      fieldMessage.classList.add('form__radio-message');
    }

    console.log(status);

    if (status.isValid) {
      clearFieldStatus(field);
    } else {
      clearFieldStatus(field);
      fieldMessage.innerText = `${status.error}`;
      field.classList.add('form__input--error');
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
    initialize(form, fieldSelector) {
      getFields(fieldSelector);
      validateOnBlur();
    },
  };
})();

const debounce = (func, delay) => {
  let timerId;

  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(this, arguments), delay);
  };
};

const tipForm = document.querySelector('#tipForm');

FormValidator.initialize(tipForm, '.form__input');
