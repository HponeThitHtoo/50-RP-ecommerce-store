import { createContext, useContext, useReducer } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

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
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from '../utils/helpers';
import userReducer from '../reducers/userReducer';

const initialState = {
  userLoading: false,
  userError: false,
  user: getUserFromLocalStorage(),
};

const UserContext = createContext();

const url = `http://localhost:5000/users`;

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const loginUser = async (user) => {
    dispatch({ type: LOGIN_BEGIN });
    try {
      const response = await axios.get(url, {
        params: { email: user.email, password: user.password },
      });
      const [loggedInUser] = response.data;
      if (loggedInUser) {
        dispatch({ type: LOGIN_SUCCESS, payload: loggedInUser });
        toast.success(`Welcome Back ${loggedInUser.username}`);
        if (user.rememberedMe) {
          addUserToLocalStorage({
            name: loggedInUser.username,
            loggedInUser: user.email,
          });
        }
      } else {
        toast.error(`Email or Password Wrong!`);
      }
    } catch (error) {
      dispatch({ type: LOGIN_ERROR });
    }
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_BEGIN });
    removeUserFromLocalStorage();
    dispatch({ type: LOGOUT_SUCCESS, payload: null });
    toast.success('You are successfully logged out.');
  };

  const registerUser = async (user) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const existedUserResponse = await axios.get(url, {
        params: {
          email: user.email,
          password: user.password,
        },
      });
      const existedUser = existedUserResponse.data;
      if (existedUser.length === 0) {
        const id = uuidv4();
        const response = await axios.post(url, {
          id,
          username: user.username,
          email: user.email,
          password: user.password,
        });
        const registeredUser = response.data;
        if (
          typeof registeredUser === 'object' &&
          !Array.isArray(registeredUser) &&
          registeredUser !== null
        ) {
          dispatch({ type: REGISTER_USER_SUCCESS, payload: registeredUser });
          toast.success(`Hello There ${user.username}`);
        } else {
          dispatch({ type: REGISTER_USER_ERROR });
          toast.error(registeredUser);
        }
      } else {
        dispatch({ type: REGISTER_USER_SUCCESS, payload: null });
        toast.warn(`${user.email} already existed.`);
      }
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR });
    }
  };

  return (
    <UserContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ ...state, loginUser, logoutUser, registerUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useUserContext = () => {
  return useContext(UserContext);
};
