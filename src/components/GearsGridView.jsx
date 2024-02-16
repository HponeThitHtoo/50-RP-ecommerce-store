import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import Gear from './Gear';

function GearsGridView({ gears }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 md:gap-10">
      {gears.map((gear) => (
        <Gear key={gear.id} gear={gear} />
      ))}
    </div>
  );
}

GearsGridView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  gears: PropTypes.array.isRequired,
};

export default GearsGridView;
