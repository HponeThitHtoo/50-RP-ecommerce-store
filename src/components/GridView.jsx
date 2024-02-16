import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import Game from './Game';

function GridView({ games }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 md:gap-10">
      {games.map((game) => (
        <Game key={game.id} game={game} />
      ))}
    </div>
  );
}

GridView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  games: PropTypes.array.isRequired,
};

export default GridView;
