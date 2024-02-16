import React from 'react';
import { Link } from 'react-router-dom';

import { formatPrice } from '../utils/helpers';
import { useCartContext } from '../context/cartContext';

function CartTotal() {
  const { totalItems, totalAmount } = useCartContext();

  return (
    <section className="flex justify-center md:justify-end mt-12 font-sourceSansPro">
      <div className="flex flex-col gap-y-4">
        <article className="px-12 py-6 rounded border border-primaryThree">
          <h5 className="capitalize">total items: {totalItems}</h5>
          <h5 className="mt-8 capitalize">
            total amount: {formatPrice(totalAmount)}
          </h5>
        </article>
        <Link
          to="/checkout"
          className="px-2 py-1 rounded border-transparent bg-primaryOne tracking-wide capitalize cursor-pointer duration-300 hover:bg-primaryTwo hover:text-gray-300"
        >
          proceed to checkout
        </Link>
      </div>
    </section>
  );
}

export default CartTotal;
