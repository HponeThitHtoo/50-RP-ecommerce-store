import { createContext, useContext, useEffect, useReducer } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import axios from 'axios';

import { gearsUrl } from '../utils/constants';
import {
  GET_GEARS_BEGIN,
  GET_GEARS_SUCCESS,
  GET_GEARS_ERROR,
  GET_SINGLE_GEAR_BEGIN,
  GET_SINGLE_GEAR_SUCCESS,
  GET_SINGLE_GEAR_ERROR,
} from '../actions';
import gearsReducer from '../reducers/gearsReducer';

const initialState = {
  gearsLoading: false,
  gearsError: false,
  gears: [],
  featuredGears: [],
  singleGearLoading: false,
  singleGearError: false,
  singleGear: null,
};

const GearsContext = createContext();

export function GearsProvider({ children }) {
  const [state, dispatch] = useReducer(gearsReducer, initialState);

  // eslint-disable-next-line no-shadow
  const fetchGears = async (url) => {
    dispatch({ type: GET_GEARS_BEGIN });
    try {
      const response = await axios.get(url);
      const gears = response.data;
      dispatch({ type: GET_GEARS_SUCCESS, payload: gears });
    } catch (error) {
      dispatch({ type: GET_GEARS_ERROR });
    }
  };

  const fetchSingleGear = async (url) => {
    dispatch({ type: GET_SINGLE_GEAR_BEGIN });
    try {
      const response = await axios.get(url);
      const singleGear = response.data;
      dispatch({ type: GET_SINGLE_GEAR_SUCCESS, payload: singleGear });
    } catch (error) {
      dispatch({ type: GET_SINGLE_GEAR_ERROR });
    }
  };

  useEffect(() => {
    fetchGears(gearsUrl);
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <GearsContext.Provider value={{ ...state, fetchSingleGear }}>
      {children}
    </GearsContext.Provider>
  );
}

GearsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useGearsContext = () => {
  return useContext(GearsContext);
};
