import { createContext, useContext, useEffect, useReducer } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import axios from 'axios';

import { gamesUrl } from '../utils/constants';
import gamesReducer from '../reducers/gamesReducer';
import {
  GET_GAMES_BEGIN,
  GET_GAMES_SUCCESS,
  GET_GAMES_ERROR,
  GET_GAMES_BY_CATEGORY_BEGIN,
  GET_GAMES_BY_CATEGORY_SUCCESS,
  GET_GAMES_BY_CATEGORY_ERROR,
  GET_SINGLE_GAME_SUCCESS,
  GET_SINGLE_GAME_ERROR,
  GET_SINGLE_GAME_BEGIN,
} from '../actions';

const initialState = {
  gamesLoading: false,
  gamesError: false,
  games: [],
  featuredGames: [],
  gamesByCategoryLoading: false,
  gamesByCategoryError: false,
  gamesByCategory: [],
  singleGameLoading: false,
  singleGameError: false,
  singleGame: null,
};

const GamesContext = createContext();

export function GamesProvider({ children }) {
  const customGamesUrl = `${gamesUrl}?_expand=category&_embed=reviews`;

  const [state, dispatch] = useReducer(gamesReducer, initialState);

  // eslint-disable-next-line no-shadow
  const fetchGames = async (url) => {
    dispatch({ type: GET_GAMES_BEGIN });
    try {
      const response = await axios.get(url);
      const games = response.data;
      dispatch({ type: GET_GAMES_SUCCESS, payload: games });
    } catch (error) {
      dispatch({ type: GET_GAMES_ERROR });
    }
  };

  // eslint-disable-next-line no-shadow
  const fetchGamesByCategory = async (url, params) => {
    dispatch({ type: GET_GAMES_BY_CATEGORY_BEGIN });
    try {
      const response = await axios.get(url, {
        params,
      });
      const games = response.data;
      dispatch({ type: GET_GAMES_BY_CATEGORY_SUCCESS, payload: games });
    } catch (error) {
      dispatch({ type: GET_GAMES_BY_CATEGORY_ERROR });
    }
  };

  // eslint-disable-next-line no-shadow
  const fetchSingleGame = async (url) => {
    dispatch({ type: GET_SINGLE_GAME_BEGIN });
    try {
      const response = await axios.get(url);
      const singleGame = response.data;
      dispatch({ type: GET_SINGLE_GAME_SUCCESS, payload: singleGame });
    } catch (error) {
      dispatch({ type: GET_SINGLE_GAME_ERROR });
    }
  };

  useEffect(() => {
    fetchGames(customGamesUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GamesContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ ...state, fetchGamesByCategory, fetchSingleGame }}
    >
      {children}
    </GamesContext.Provider>
  );
}

GamesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useGamesContext = () => {
  return useContext(GamesContext);
};
