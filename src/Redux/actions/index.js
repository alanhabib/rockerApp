import {CONSTANTS} from '../constants';

export const addUser = (userDetails) => ({
  type: CONSTANTS.ADD_USER,
  user: {
    country: userDetails.country,
    ssn: userDetails.ssn,
    phoneNumber: userDetails.phoneNumber,
    email: userDetails.email,
  },
});
