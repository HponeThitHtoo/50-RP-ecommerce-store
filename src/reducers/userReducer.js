import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_BEGIN,
  LOGOUT_SUCCESS,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from '../actions';

const userReducer = (state, action) => {
  if (action.type === LOGIN_BEGIN) {
    return { ...state, userLoading: true, userError: false };
  }

  if (action.type === LOGIN_SUCCESS) {
    return { ...state, userLoading: false, user: action.payload };
  }

  if (action.type === LOGIN_ERROR) {
    return { ...state, userLoading: false, userError: true };
  }

  if (action.type === LOGOUT_BEGIN) {
    return { ...state, userLoading: true, userError: false };
  }

  if (action.type === LOGOUT_SUCCESS) {
    return { ...state, userLoading: false, user: action.payload };
  }

  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, userLoading: true, userError: false };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return { ...state, userLoading: false, user: action.payload };
  }

  if (action.type === REGISTER_USER_ERROR) {
    return { ...state, userLoading: false, userError: true };
  }

  throw new Error(`No Matching ${action.type} - action type`);
};

export default userReducer;
