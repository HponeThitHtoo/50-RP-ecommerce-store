import { createContext, useContext, useEffect, useReducer } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import axios from 'axios';

import { categoriesUrl as url } from '../utils/constants';

import {
  GET_CATEGORIES_BEGIN,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
  GET_SINGLE_CATEGORY_BEGIN,
  GET_SINGLE_CATEGORY_SUCCESS,
  GET_SINGLE_CATEGORY_ERROR,
} from '../actions';
import categoriesReducer from '../reducers/categoriesReducer';

const initialState = {
  categoriesLoading: false,
  categoriesError: false,
  categories: [],
  singleCategoryLoading: false,
  singleCategoryError: false,
  singleCategory: null,
};

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
  const [state, dispatch] = useReducer(categoriesReducer, initialState);

  // eslint-disable-next-line no-shadow
  const fetchCategories = async (url) => {
    dispatch({ type: GET_CATEGORIES_BEGIN });
    try {
      const response = await axios.get(url);
      const categories = response.data;
      dispatch({ type: GET_CATEGORIES_SUCCESS, payload: categories });
    } catch (error) {
      dispatch({ type: GET_CATEGORIES_ERROR });
    }
  };

  // eslint-disable-next-line no-shadow
  const fetchSingleCategory = async (url, params) => {
    dispatch({ type: GET_SINGLE_CATEGORY_BEGIN });
    try {
      const response = await axios.get(url, { params });
      const [singleCategory] = response.data;
      dispatch({ type: GET_SINGLE_CATEGORY_SUCCESS, payload: singleCategory });
    } catch (error) {
      dispatch({ type: GET_SINGLE_CATEGORY_ERROR });
    }
  };

  useEffect(() => {
    fetchCategories(url);
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <CategoriesContext.Provider value={{ ...state, fetchSingleCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
}

CategoriesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useCategoriesContext = () => {
  return useContext(CategoriesContext);
};
