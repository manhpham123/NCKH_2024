import validator from "validator";

export const isValidEmail = (email: string) => {
  return validator.isEmail(email);
};

export const isValidPhoneNumber = ( phone: string) =>{
  return validator.isMobilePhone(phone,'vi-VN');
}

export const isValidPassWord  = (pass: string) =>{
  return validator.isStrongPassword(pass);
}