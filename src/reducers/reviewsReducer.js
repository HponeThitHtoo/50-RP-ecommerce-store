import {
  GET_REVIEWS_BY_GAME_BEGIN,
  GET_REVIEWS_BY_GAME_SUCCESS,
  GET_REVIEWS_BY_GAME_ERROR,
} from '../actions';

const reviewsReducer = (state, action) => {
  if (action.type === GET_REVIEWS_BY_GAME_BEGIN) {
    return { ...state, reviewsByGameLoading: true, reviewsByGameError: false };
  }

  if (action.type === GET_REVIEWS_BY_GAME_SUCCESS) {
    return {
      ...state,
      reviewsByGameLoading: false,
      reviewsByGame: action.payload,
    };
  }

  if (action.type === GET_REVIEWS_BY_GAME_ERROR) {
    return { ...state, reviewsByGameLoading: false, reviewsByGameError: true };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default reviewsReducer;
