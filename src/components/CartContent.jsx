/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link } from 'react-router-dom';

import { useCartContext } from '../context/cartContext';

import CartColumns from './CartColumns';
import CartItem from './CartItem';
import CartTotal from './CartTotal';

function CartContent() {
  const { cart, clearCart } = useCartContext();

  return (
    <div>
      <CartColumns />
      {cart?.games?.map((item) => {
        return <CartItem key={item.gameId} {...item} />;
      })}
      {cart?.gears?.map((item) => {
        return <CartItem key={item.gearId} {...item} />;
      })}
      <hr />
      <div className="flex justify-between mt-8 font-sourceSansPro">
        <Link
          to="/games"
          className="px-2 py-1 rounded border-transparent bg-primaryOne tracking-wide capitalize cursor-pointer duration-300 hover:bg-primaryTwo hover:text-gray-300"
        >
          continue shopping
        </Link>
        <button
          type="button"
          className="px-2 py-1 rounded border-transparent bg-primaryThree tracking-wide capitalize cursor-pointer duration-300 hover:bg-primaryOne hover:text-gray-200"
          onClick={clearCart}
        >
          clear shopping cart
        </button>
      </div>
      <CartTotal />
    </div>
  );
}

export default CartContent;
