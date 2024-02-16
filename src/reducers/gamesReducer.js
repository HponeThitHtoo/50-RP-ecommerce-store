import {
  GET_GAMES_BEGIN,
  GET_GAMES_SUCCESS,
  GET_GAMES_ERROR,
  GET_GAMES_BY_CATEGORY_BEGIN,
  GET_GAMES_BY_CATEGORY_SUCCESS,
  GET_GAMES_BY_CATEGORY_ERROR,
  GET_SINGLE_GAME_BEGIN,
  GET_SINGLE_GAME_SUCCESS,
  GET_SINGLE_GAME_ERROR,
} from '../actions';

const gamesReducer = (state, action) => {
  if (action.type === GET_GAMES_BEGIN) {
    return { ...state, gamesLoading: true, gamesError: false };
  }

  if (action.type === GET_GAMES_SUCCESS) {
    const featuredGames = action.payload.filter(
      (game) => game.featured === true
    );
    return {
      ...state,
      gamesLoading: false,
      games: action.payload,
      featuredGames,
    };
  }

  if (action.type === GET_GAMES_ERROR) {
    return { ...state, gamesLoading: false, gamesError: true };
  }

  if (action.type === GET_GAMES_BY_CATEGORY_BEGIN) {
    return {
      ...state,
      gamesByCategoryLoading: true,
      gamesByCategoryError: false,
    };
  }

  if (action.type === GET_GAMES_BY_CATEGORY_SUCCESS) {
    return {
      ...state,
      gamesByCategoryLoading: false,
      gamesByCategory: action.payload,
    };
  }

  if (action.type === GET_GAMES_BY_CATEGORY_ERROR) {
    return {
      ...state,
      gamesByCategoryLoading: false,
      gamesByCategoryError: true,
    };
  }

  if (action.type === GET_SINGLE_GAME_BEGIN) {
    return { ...state, singleGameLoading: true, singleGameError: false };
  }

  if (action.type === GET_SINGLE_GAME_SUCCESS) {
    return {
      ...state,
      singleGameLoading: false,
      singleGame: action.payload,
    };
  }

  if (action.type === GET_SINGLE_GAME_ERROR) {
    return {
      ...state,
      singleGameLoading: false,
      singleGameError: true,
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default gamesReducer;
