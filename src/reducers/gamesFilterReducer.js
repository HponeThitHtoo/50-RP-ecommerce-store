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

const gamesFilterReducer = (state, action) => {
  if (action.type === LOAD_GAMES) {
    let maxPrice = action.payload.map((g) => g.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      allGames: [...action.payload],
      filteredGames: [...action.payload],
      filters: { ...state.filters, maxPrice, price: maxPrice },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, gridView: true };
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, gridView: false };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_GAMES) {
    const { sort, filteredGames } = state;
    let tempGames = [...filteredGames];
    if (sort === 'price-lowest') {
      // short form
      tempGames = tempGames.sort((a, b) => a.price - b.price);
      // long form
      /* tempGames = tempGames.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      }) */
    }

    if (sort === 'price-highest') {
      tempGames = tempGames.sort((a, b) => b.price - a.price);
    }

    if (sort === 'name-a') {
      tempGames = tempGames.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === 'name-z') {
      tempGames = tempGames.sort((a, b) => b.name.localeCompare(a.name));
    }

    return { ...state, filteredGames: tempGames };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_GAMES) {
    const { allGames } = state;
    const { text, category, price } = state.filters;

    let tempGames = [...allGames];

    // filtering
    // text
    if (text) {
      tempGames = tempGames.filter((game) =>
        game.name.toLowerCase().startsWith(text)
      );
    }

    // category
    if (category !== 'all') {
      tempGames = tempGames.filter((game) => game.category.name === category);
    }

    // price
    tempGames = tempGames.filter((game) => game.price <= price);

    return { ...state, filteredGames: tempGames };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        category: 'all',
        price: state.filters.maxPrice,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default gamesFilterReducer;
