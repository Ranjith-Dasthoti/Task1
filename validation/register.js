const Validator = require("Validator");
const isEmpty = require("./isEmpty");

const validateRegisterInput = data => {
  let errors = {};
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  if (!Validator.isLength(data.firstName, { min: 2, max: 20 })) {
    errors.firstName = "First name must be between 2 nd 20 characters";
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name is required";
  }

  if (!Validator.isLength(data.lastName, { min: 2, max: 20 })) {
    errors.lastName = "Last name must be between 2 nd 20 characters";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastname = "Last Name is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }
  if (Validator.isEmpty(data.email)) {
    errors.name = "Email is required";
  }

  //returns an object with errors and isValid property
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
