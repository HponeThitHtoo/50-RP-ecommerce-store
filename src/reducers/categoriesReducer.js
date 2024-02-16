import {
  GET_CATEGORIES_BEGIN,
  GET_CATEGORIES_ERROR,
  GET_CATEGORIES_SUCCESS,
  GET_SINGLE_CATEGORY_BEGIN,
  GET_SINGLE_CATEGORY_SUCCESS,
  GET_SINGLE_CATEGORY_ERROR,
} from '../actions';

const categoriesReducer = (state, action) => {
  if (action.type === GET_CATEGORIES_BEGIN) {
    return { ...state, categoriesLoading: true, categoriesError: false };
  }

  if (action.type === GET_CATEGORIES_SUCCESS) {
    return { ...state, categoriesLoading: false, categories: action.payload };
  }

  if (action.type === GET_CATEGORIES_ERROR) {
    return { ...state, categoriesLoading: false, categoriesError: true };
  }

  if (action.type === GET_SINGLE_CATEGORY_BEGIN) {
    return {
      ...state,
      singleCategoryLoading: true,
      singleCategoryError: false,
    };
  }

  if (action.type === GET_SINGLE_CATEGORY_SUCCESS) {
    return {
      ...state,
      singleCategoryLoading: false,
      singleCategory: action.payload,
    };
  }

  if (action.type === GET_SINGLE_CATEGORY_ERROR) {
    return {
      ...state,
      singleCategoryLoading: false,
      singleCategoryError: true,
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default categoriesReducer;
