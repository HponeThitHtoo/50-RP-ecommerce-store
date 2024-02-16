/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useCartContext } from '../context/cartContext';
import AmountButtons from './AmountButtons';

const customColors = {
  volt: '#CCE800',
  lilac: '#8C9BCA',
  kda: '#DEE1E9',
  hellokitty: '#F5A1C5',
};

function AddToCart({ game, gear, setImageIndex }) {
  const { addToCart } = useCartContext();

  const [quantity, setQuantity] = useState(1);
  const [mainColor, setMainColor] = useState(gear?.colors?.[0]);

  const increase = () => {
    setQuantity((oldQuantity) => {
      let tempQuantity = oldQuantity + 1;
      if (game?.id) {
        if (tempQuantity > game.stock) tempQuantity = game.stock;
      }
      if (gear?.id) {
        if (tempQuantity > gear.stock) tempQuantity = gear.stock;
      }
      return tempQuantity;
    });
  };

  const decrease = () => {
    setQuantity((oldQuantity) => {
      let tempQuantity = oldQuantity - 1;
      if (tempQuantity < 1) tempQuantity = 1;
      return tempQuantity;
    });
  };

  const setImageAndColor = (index, color) => {
    setImageIndex(index);
    setMainColor(color);
  };

  const handleClick = () => {
    if (game) {
      addToCart('game', { ...game, quantity });
    } else if (gear) {
      addToCart('gear', {
        ...gear,
        color: mainColor,
        image: gear.images.find((img) => img.color === mainColor).image,
        quantity,
      });
    }
  };

  return (
    <div>
      {gear && (
        <div className="grid grid-cols-[85px_1fr] mb-5">
          <span>colors : </span>
          <div className="flex gap-x-2">
            {gear?.colors?.map((color, index) => {
              let tempColor = color;
              if (color === 'volt') tempColor = customColors.volt;
              if (color === 'lilac') tempColor = customColors.lilac;
              if (color === 'kda') tempColor = customColors.kda;
              if (color === 'hellokitty') tempColor = customColors.hellokitty;

              return (
                <button
                  type="button"
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  style={{ background: tempColor }}
                  className={`flex justify-center items-center w-6 h-6 rounded-full bg-black border-none cursor-pointer ${
                    mainColor === color ? 'opacity-100' : 'opacity-50'
                  }`}
                  onClick={() => setImageAndColor(index, color)}
                >
                  {mainColor === color ? (
                    <FaCheck className="text-red-900" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <AmountButtons
        quantity={quantity}
        increase={increase}
        decrease={decrease}
      />
      {/* <Link
        to="/cart"
        className="inline-block mt-4 py-1 px-2 bg-primaryOne rounded font-sourceSansPro uppercase duration-500 hover:bg-primaryThree hover:text-gray-300"
        onClick={() => addToCart({ ...game, quantity }, { ...gear, quantity })}
      >
        add to cart
      </Link> */}
      <Link
        to="/cart"
        className="inline-block mt-4 py-1 px-2 bg-primaryOne rounded font-sourceSansPro uppercase duration-500 hover:bg-primaryThree hover:text-gray-300"
        onClick={handleClick}
      >
        add to cart
      </Link>
    </div>
  );
}

AddToCart.defaultProps = {
  game: null,
  gear: null,
  setImageIndex: () => {},
};

AddToCart.propTypes = {
  game: PropTypes.object,
  gear: PropTypes.object,
  setImageIndex: PropTypes.func,
};

export default AddToCart;
