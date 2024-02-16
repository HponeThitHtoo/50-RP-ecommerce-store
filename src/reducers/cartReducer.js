/* eslint-disable no-param-reassign */
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTAL,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cartReducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { type, item } = action.payload;

    if (type === 'game') {
      const tempItem = state.cart?.games?.find((i) => i.gameId === item.id);

      if (tempItem) {
        const tempGameItems = state.cart.games.map((cartItem) => {
          if (cartItem.gameId === item.id) {
            let newQuantity = cartItem.quantity + item.quantity;
            if (newQuantity > cartItem.max) newQuantity = cartItem.max;
            return { ...cartItem, quantity: newQuantity };
          }
          return cartItem;
        });
        return { ...state, cart: { ...state.cart, games: tempGameItems } };
      }
      const newGameItem = {
        gameId: item.id,
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
        max: item.stock,
      };
      return {
        ...state,
        cart: {
          ...state.cart,
          games: [...state.cart.games, { ...newGameItem }],
        },
      };
    }

    if (type === 'gear') {
      const tempItem = state.cart?.gears?.find(
        (i) => i.gearId === item.id + item.color
      );

      if (tempItem) {
        const tempGearItems = state.cart.gears.map((cartItem) => {
          if (cartItem.gearId === item.id + item.color) {
            let newQuantity = cartItem.quantity + item.quantity;
            if (newQuantity > cartItem.max) newQuantity = cartItem.max;
            return { ...cartItem, quantity: newQuantity };
          }
          return cartItem;
        });
        return { ...state, cart: { ...state.cart, gears: tempGearItems } };
      }

      const newGearItem = {
        gearId: item.id + item.color,
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
        color: item.color,
        max: item.stock,
      };

      return {
        ...state,
        cart: {
          ...state.cart,
          gears: [...state.cart.gears, { ...newGearItem }],
        },
      };
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const { id, type } = action.payload;

    if (type === 'game') {
      const tempCart = state.cart.games.filter((item) => item.gameId !== id);
      return { ...state, cart: { ...state.cart, games: tempCart } };
    }

    if (type === 'gear') {
      const tempCart = state.cart.gears.filter((item) => item.gearId !== id);
      return { ...state, cart: { ...state.cart, gears: tempCart } };
    }
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: { games: [], gears: [] } };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value, type } = action.payload;

    if (type === 'game') {
      const tempCart = state.cart.games.map((item) => {
        if (item.gameId === id) {
          if (value === 'inc') {
            let newQuantity = item.quantity + 1;
            if (newQuantity > item.max) newQuantity = item.max;
            return { ...item, quantity: newQuantity };
          }
          if (value === 'dec') {
            let newQuantity = item.quantity - 1;
            if (newQuantity < 1) newQuantity = 1;
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      });
      return { ...state, cart: { ...state.cart, games: tempCart } };
    }

    if (type === 'gear') {
      const tempCart = state.cart.gears.map((item) => {
        if (item.gearId === id) {
          if (value === 'inc') {
            let newQuantity = item.quantity + 1;
            if (newQuantity > item.max) newQuantity = item.max;
            return { ...item, quantity: newQuantity };
          }
          if (value === 'dec') {
            let newQuantity = item.quantity - 1;
            if (newQuantity < 1) newQuantity = 1;
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      });
      return { ...state, cart: { ...state.cart, gears: tempCart } };
    }
  }

  if (action.type === COUNT_CART_TOTAL) {
    let totalItems = 0;
    let totalAmount = 0;
    if (state.cart?.games?.length > 0) {
      const { totalGameItems, totalGameAmount } = state.cart.games.reduce(
        (total, cartItem) => {
          const { quantity, price } = cartItem;
          total.totalGameItems += quantity;
          total.totalGameAmount += price * quantity;
          return total;
        },
        {
          totalGameItems: 0,
          totalGameAmount: 0,
        }
      );
      totalItems += totalGameItems;
      totalAmount += totalGameAmount;
    }

    if (state.cart?.gears?.length > 0) {
      const { totalGearItems, totalGearAmount } = state.cart.gears.reduce(
        (total, cartItem) => {
          const { quantity, price } = cartItem;
          total.totalGearItems += quantity;
          total.totalGearAmount += price * quantity;
          return total;
        },
        {
          totalGearItems: 0,
          totalGearAmount: 0,
        }
      );
      totalItems += totalGearItems;
      totalAmount += totalGearAmount;
    }

    return { ...state, totalItems, totalAmount };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cartReducer;
