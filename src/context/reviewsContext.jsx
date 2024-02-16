import { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import {
  GET_REVIEWS_BY_GAME_BEGIN,
  GET_REVIEWS_BY_GAME_SUCCESS,
  GET_REVIEWS_BY_GAME_ERROR,
} from '../actions';
import reviewsReducer from '../reducers/reviewsReducer';

const initialState = {
  reviewsByGameLoading: false,
  reviewsByGameError: false,
  reviewsByGame: [],
};

const ReviewsContext = createContext();

export function ReviewsProvider({ children }) {
  const [state, dispatch] = useReducer(reviewsReducer, initialState);

  const fetchReviewsByGame = async (url) => {
    dispatch({ type: GET_REVIEWS_BY_GAME_BEGIN });
    try {
      const response = await axios.get(url);
      const reviews = response.data;
      dispatch({ type: GET_REVIEWS_BY_GAME_SUCCESS, payload: reviews });
    } catch (error) {
      dispatch({ type: GET_REVIEWS_BY_GAME_ERROR });
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ReviewsContext.Provider value={{ ...state, fetchReviewsByGame }}>
      {children}
    </ReviewsContext.Provider>
  );
}

ReviewsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useReviewsContext = () => {
  return useContext(ReviewsContext);
};
