import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';

import { formatPrice } from '../utils/helpers';
import { useCartContext } from '../context/cartContext';

import AmountButtons from './AmountButtons';

function CartItem({ gameId, gearId, name, image, quantity, price, color }) {
  const { toggleQuantity, removeItem } = useCartContext();

  const increase = () => {
    if (gameId) {
      toggleQuantity(gameId, 'inc', 'game');
    } else if (gearId) {
      toggleQuantity(gearId, 'inc', 'gear');
    }
  };

  const decrease = () => {
    if (gameId) {
      toggleQuantity(gameId, 'dec', 'game');
    } else if (gearId) {
      toggleQuantity(gearId, 'dec', 'gear');
    }
  };

  const handleRemove = () => {
    if (gameId) {
      removeItem(gameId, 'game');
    } else if (gearId) {
      removeItem(gearId, 'gear');
    }
  };

  return (
    <article className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[350px_1fr_1fr_1fr_auto] grid-rows-[75px] gap-x-2 gap-y-12 justify-items-center mb-12 items-center font-sourceSansPro">
      <div className="grid grid-rows-[75px] grid-cols-[70px_110px] md:grid-cols-[75px_1fr] justify-self-start items-center gap-2 text-left">
        <img
          src={image}
          alt="cart item"
          className="w-full h-full block rounded object-cover"
        />
        <div>
          <h5 className="text-[0.75rem] md:text-base mb-0">{name}</h5>
          {color && (
            <p className="color flex justify-start items-center mb-0 text-[0.75rem] tracking-wider capitalize">
              color :{' '}
              <span
                style={{ background: color }}
                className="inline-block w-2 h-2 ml-2 rounded"
              />
            </p>
          )}

          <h5 className="price-small md:hidden text-sm">
            {formatPrice(price)}
          </h5>
        </div>
      </div>
      <h5 className="price hidden md:block">{formatPrice(price)}</h5>
      <AmountButtons
        quantity={quantity}
        increase={increase}
        decrease={decrease}
      />
      <h5 className="subtotal hidden md:block">
        {formatPrice(price * quantity)}
      </h5>
      <button type="button" onClick={handleRemove}>
        <FaTrash />
      </button>
    </article>
  );
}

CartItem.defaultProps = {
  gameId: null,
  gearId: null,
  color: '',
};

CartItem.propTypes = {
  gameId: PropTypes.number,
  gearId: PropTypes.string,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  color: PropTypes.string,
};

export default CartItem;
