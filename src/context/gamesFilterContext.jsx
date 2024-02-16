import React, { createContext, useContext, useEffect, useReducer } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import {
  LOAD_GAMES,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_GAMES,
  UPDATE_FILTERS,
  FILTER_GAMES,
  CLEAR_FILTERS,
} from '../actions';
import gamesFilterReducer from '../reducers/gamesFilterReducer';
import { useGamesContext } from './gamesContext';

const initialState = {
  filteredGames: [],
  allGames: [],
  gridView: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    category: 'all',
    minPrice: 0,
    maxPrice: 0,
    price: 0,
  },
};

const GamesFilterContext = createContext();

export function GameFilterProvider({ children }) {
  const { games } = useGamesContext();
  const [state, dispatch] = useReducer(gamesFilterReducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_GAMES, payload: games });
  }, [games]);

  useEffect(() => {
    dispatch({ type: FILTER_GAMES });
    dispatch({ type: SORT_GAMES });
  }, [games, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (e) => {
    const { value } = e.target;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const updateFilters = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === 'category') value = e.target.textContent;
    if (name === 'price') value = Number(value);
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <GamesFilterContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </GamesFilterContext.Provider>
  );
}

GameFilterProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useGamesFilterContext = () => {
  return useContext(GamesFilterContext);
};
