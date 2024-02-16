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

const gearsFilterReducer = (state, action) => {
  if (action.type === LOAD_GEARS) {
    let maxPrice = action.payload.map((gear) => gear.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      allGears: [...action.payload],
      filteredGears: [...action.payload],
      filters: { ...state.filters, maxPrice, price: maxPrice },
    };
  }

  if (action.type === SET_GEARS_GRIDVIEW) {
    return { ...state, gridView: true };
  }

  if (action.type === SET_GEARS_LISTVIEW) {
    return { ...state, gridView: false };
  }

  if (action.type === UPDATE_GEARS_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_GEARS) {
    const { sort, filteredGears } = state;
    let tempGears = [...filteredGears];

    if (sort === 'price-lowest') {
      tempGears = tempGears.sort((a, b) => a.price - b.price);
    }

    if (sort === 'price-highest') {
      tempGears = tempGears.sort((a, b) => b.price - a.price);
    }

    if (sort === 'name-a') {
      tempGears = tempGears.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === 'name-z') {
      tempGears = tempGears.sort((a, b) => b.name.localeCompare(a.name));
    }

    return { ...state, filteredGears: tempGears };
  }

  if (action.type === UPDATE_GEARS_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_GEARS) {
    const { allGears } = state;
    const { text, category, brand, color, price } = state.filters;
    
    let tempGears = [...allGears];

    // filtering
    // text
    if (text) {
      tempGears = tempGears.filter((gear) =>
        gear.name.toLowerCase().startsWith(text)
      );
    }

    // category
    if (category !== 'all') {
      tempGears = tempGears.filter((gear) => gear.category === category);
    }

    // company
    if (brand !== 'all') {
      tempGears = tempGears.filter((gear) => gear.brand === brand);
    }

    // colors
    if (color !== 'all') {
      tempGears = tempGears.filter((gear) =>
        gear.colors.find((c) => c === color)
      );
    }

    tempGears = tempGears.filter((gear) => gear.price <= price);

    return { ...state, filteredGears: tempGears };
  }

  if (action.type === CLEAR_GEARS_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        category: 'all',
        brand: 'all',
        color: 'all',
        price: state.filters.maxPrice,
      },
    };
  }

  throw new Error(`No Matching ${action.type} - action type`);
};

export default gearsFilterReducer;
