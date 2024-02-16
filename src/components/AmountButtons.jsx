import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { FaPlus, FaMinus } from 'react-icons/fa';

function AmountButtons({ quantity, increase, decrease }) {
  return (
    <div className="flex items-center">
      <button type="button" className="p-1" onClick={decrease}>
        <FaMinus className="text-xs md:text-base" />
      </button>
      <span className="md:m-2 text-xs md:text-base text-center font-sourceSansPro">
        {quantity}
      </span>
      <button type="button" className="p-1" onClick={increase}>
        <FaPlus className="text-xs md:text-base" />
      </button>
    </div>
  );
}

AmountButtons.propTypes = {
  quantity: PropTypes.number.isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
};

export default AmountButtons;
