import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import { formatPrice } from '../utils/helpers';

function GearsListView({ gears }) {
  return (
    <div className="space-y-10">
      {gears.map((gear) => {
        const {
          id,
          name,
          price,
          description,
          images: [item],
        } = gear;
        const { image } = item;

        return (
          <article
            key={id}
            className="grid lg:grid-cols-[auto_1fr] font-sourceSansPro"
          >
            <img
              src={image}
              alt="gear"
              className="w-[300px] h-[200px] object-cover object-center rounded mb-4"
            />
            <div className="md:ml-4">
              <h4 className="mb-2 text-xl font-bold">{name}</h4>
              <h5 className="mb-3 text-primaryOne">{formatPrice(price)}</h5>
              <p className="mb-4">{description}</p>
              <Link
                to={`/gear/${id}`}
                className="px-2 py-1 rounded bg-primaryOne font-oswald text-white text-xs capitalize duration-300 hover:bg-primaryThree hover:text-gray-300"
              >
                details
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}

GearsListView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  gears: PropTypes.array.isRequired,
};

export default GearsListView;
