import React from 'react';
import { Link } from 'react-router-dom';

import { useCartContext } from '../context/cartContext';

import CartContent from '../components/CartContent';

function CartPage() {
  const { cart } = useCartContext();

  return (
    <section className="">
      <div className="bg-darkBackGroundTwo">
        <h1 className="py-14 font-oswald text-center text-3xl uppercase font-bold font-outline-1">
          shopping cart
        </h1>
      </div>
      <div className="min-h-[72vh] px-8 2xl:px-48 py-4 bg-darkBackGround text-white">
        {cart.games.length === 0 && cart.gears.length === 0 ? (
          <div>
            <h2 className="mb-4 text-xl font-sourceSansPro">
              Your cart is empty.
            </h2>
            <Link
              to="/games"
              className="inline-block mt-4 py-1 px-2 bg-primaryOne rounded font-sourceSansPro capitalize duration-500 hover:bg-primaryThree hover:text-gray-300"
            >
              fill it
            </Link>
          </div>
        ) : (
          <CartContent />
        )}
      </div>
    </section>
  );
}

export default CartPage;
