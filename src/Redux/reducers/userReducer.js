const initialState = {
  user: {
    country: '',
    ssn: '',
    phoneNumber: '',
    email: '',
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER': {
      return {
        ...state,
        user: action.user,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
