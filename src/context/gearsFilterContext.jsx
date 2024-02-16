import { createContext, useContext, useEffect, useReducer } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import {
  LOAD_GEARS,
  SET_GEARS_GRIDVIEW,
  SET_GEARS_LISTVIEW,
  UPDATE_GEARS_SORT,
  SORT_GEARS,
  UPDATE_GEARS_FILTERS,
  FILTER_GEARS,
  CLEAR_GEARS_FILTERS,
} from '../actions';
import { useGearsContext } from './gearsContext';
import gearsFilterReducer from '../reducers/gearsFilterReducer';

const initialState = {
  filteredGears: [],
  allGears: [],
  gridView: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    category: 'all',
    brand: 'all',
    color: 'all',
    minPrice: 0,
    maxPrice: 0,
    price: 0,
  },
};

const GearsFilterContext = createContext();

export function GearsFilterProvider({ children }) {
  const { gears } = useGearsContext();
  const [state, dispatch] = useReducer(gearsFilterReducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_GEARS, payload: gears });
  }, [gears]);

  useEffect(() => {
    dispatch({ type: SORT_GEARS });
    dispatch({ type: FILTER_GEARS });
  }, [gears, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: SET_GEARS_GRIDVIEW });
  };

  const setListView = () => {
    dispatch({ type: SET_GEARS_LISTVIEW });
  };

  const updateSort = (e) => {
    const { value } = e.target;
    dispatch({ type: UPDATE_GEARS_SORT, payload: value });
  };

  const updateFilters = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === 'category') value = e.target.textContent;
    if (name === 'color') value = e.target.dataset.color;
    if (name === 'price') value = Number(value);
    dispatch({ type: UPDATE_GEARS_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_GEARS_FILTERS });
  };

  return (
    <GearsFilterContext.Provider
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
    </GearsFilterContext.Provider>
  );
}

GearsFilterProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useGearsFilterContext = () => {
  return useContext(GearsFilterContext);
};
