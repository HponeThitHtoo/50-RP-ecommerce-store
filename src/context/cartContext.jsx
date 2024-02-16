import React, { createContext, useContext, useEffect, useReducer } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTAL,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';
import cartReducer from '../reducers/cartReducer';

const getLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'));
  }
  return { games: [], gears: [] };
};

const initialState = {
  cart: getLocalStorage(),
  totalItems: 0,
  totalAmount: 0,
};

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // add to cart
  /* const addToCart = (game = {}, gear = {}) => {
    dispatch({ type: ADD_TO_CART, payload: { game, gear } });
  }; */

  const addToCart = (type, item) => {
    dispatch({ type: ADD_TO_CART, payload: { type, item } });
  };

  // remove item from cart
  const removeItem = (id, type) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: { id, type } });
  };

  // toggle quantity
  const toggleQuantity = (id, value, type) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value, type } });
  };

  // clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTAL });
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ ...state, addToCart, toggleQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useCartContext = () => {
  return useContext(CartContext);
};
