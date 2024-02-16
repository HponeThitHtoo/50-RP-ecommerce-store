import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import { formatPrice } from '../utils/helpers';

function Gear({ gear }) {
  return (
    <div>
      <Link to={`/gear/${gear.id}`} className="group">
        <div className="w-full relative">
          <img
            src={gear.images[0].image}
            alt="gear"
            className="w-[277px] h-[204px] object-contain object-center"
          />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700/50 duration-500 group-hover:bg-gray-700/20">
            <FaSearch className="text-primaryTwo text-6xl opacity-0 duration-300 group-hover:opacity-100" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-2 py-2 bg-darkBackGroundTwo duration-500 group-hover:bg-darkBackGround">
          <p className="font-sourceSansPro text-lg font-semibold duration-300 group-hover:text-primaryOne">
            {gear.name}
          </p>
          <p className="font-sourceSansPro text-sm text-primaryOne duration-300 group-hover:text-white">
            {formatPrice(gear.price)}
          </p>
        </div>
      </Link>
    </div>
  );
}

Gear.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  gear: PropTypes.object.isRequired,
};

export default Gear;
