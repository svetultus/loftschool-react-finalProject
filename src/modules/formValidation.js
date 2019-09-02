export const required = value => (value ? undefined : "Обязательное поле");

export const mustBeNumber = value =>
  isNaN(value) ? "Должно быть числом" : undefined;

export const mustBeLetters = value => {
  const re = new RegExp(/[^a-zа-я]/im);

  return typeof value === "string" && re.test(value)
    ? "Можно использовать только буквы"
    : undefined;
};

export const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Должно быть больше ${min}`;

export const valueLength = (min = 0, max) => value => {
  const error =
    max === undefined
      ? `Количество знаков должно быть равно ${min}`
      : `Количество знаков должно быть больше ${min} и меньше ${max}`;

  return min &&
    value &&
    (min <= value.length && value.length <= (max === undefined ? min : max))
    ? undefined
    : error;
};

export const composeValidators = (...validators) => value => {
  let errors = validators.reduce(
    (error, validator) =>
      error + (validator(value) ? validator(value) + ". " : ""),
    ""
  );

  return errors.slice(0, -2);
};

export default {
  required,
  mustBeNumber,
  minValue,
  composeValidators,
  valueLength,
  mustBeLetters
};
