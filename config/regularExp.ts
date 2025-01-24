export const regularExp = {
  birthdayRegex:
    /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
  emailRegex:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
  passwordRegex: /^[a-zA-Z0-9]{8,20}$/,
  phoneNumberRegex: /^(01\d{1})-([0-9]{3,4})-([0-9]{4})$/,
};
