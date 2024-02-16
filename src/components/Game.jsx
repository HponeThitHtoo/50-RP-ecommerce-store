import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import { formatPrice } from '../utils/helpers';

function Game({ game }) {
  return (
    <div>
      <Link to={`/game/${game.id}`} className="group">
        <div className="w-full relative">
          <img
            src={game.image}
            alt="game"
            className="w-full object-cover object-center"
          />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700/50 duration-500 group-hover:bg-gray-700/20">
            <FaSearch className="text-primaryTwo text-6xl opacity-0 duration-300 group-hover:opacity-100" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-2 py-2 bg-darkBackGroundTwo duration-500 group-hover:bg-darkBackGround">
          <p className="font-sourceSansPro text-lg font-semibold duration-300 group-hover:text-primaryOne">
            {game.name}
          </p>
          <p className="font-sourceSansPro text-sm text-primaryOne duration-300 group-hover:text-white">
            {formatPrice(game.price)}
          </p>
        </div>
      </Link>
    </div>
  );
}

Game.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  game: PropTypes.object.isRequired,
};

export default Game;
