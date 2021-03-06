const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.handle = validText(data.handle) ? data.handle : ""
  data.email = validText(data.email) ? data.email : ""
  data.password = validText(data.password) ? data.password : ""
  data.password2 = validText(data.password2) ? data.password2 : ""

  if(!Validator.isLength(data.handle, { min:2, max:30 })){
    errors.handle = "Handle must be between 2 and 30 characters"
  }

  if(Validator.isEmpty(data.handle)){
    errors.handle = "The handle field is required"
  }

  if(Validator.isEmpty(data.email)){
    errors.email= "The email field is required"
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email"
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "The password field is required"
  }

  if (!Validator.isLength(data.password, { min: 2, max: 30 })) {
    errors.password = "Password must be between 2 and 30 characters"
  }

  if(!Validator.equals(data.password, data.password2)) {
    errors.password2 = "The passwords entered must match"
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "This password field is required"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }

}