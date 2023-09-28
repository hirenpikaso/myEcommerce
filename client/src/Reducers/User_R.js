const initialState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  // console.log(">>action.payload", action.payload);
  switch (action.type) {
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        msg: action.payload.success_message,
        error: null,
      };
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        user: action.payload.userDetails,
        token: action.payload.token,
        msg: action.payload.msg,
        error: null,
      };
    case "SIGNUP_ERROR":
      console.log("action.payload.err_message", action.payload.err_message);
      return {
        ...state,
        user: null,
        error: action.payload.err_message,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
