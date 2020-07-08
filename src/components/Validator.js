export default class Validate {
  static ssn(value) {
    let ssnRgx = /^((19)|(20))(\d{2})((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{4}$/;
    return ssnRgx.test(value);
  }
  static phoneNumber(value) {
    let phoneNumberRgx = /^(([+]\d{2}[ ][1-9]\d{0,2}[ ])|([0]\d{1,3}[-]))((\d{2}([ ]\d{2}){2})|(\d{3}([ ]\d{3})*([ ]\d{2})+))$/;
    return phoneNumberRgx.test(value);
  }
}
