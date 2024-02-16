import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import { useGamesFilterContext } from '../context/gamesFilterContext';
import { paginateTwo } from '../utils/helpers';

import GridView from './GridView';
import ListView from './ListView';

function GameList({ page, limit }) {
  const [paginatedGames, setPaginatedGames] = useState([]);
  const { filteredGames: games, gridView } = useGamesFilterContext();

  useEffect(() => {
    setPaginatedGames(paginateTwo(games, page, limit));
  }, [games, page, limit]);

  if (games.length < 1) {
    return (
      <h5 className="font-sourceSansPro">
        Sorry, no games matched your search...
      </h5>
    );
  }

  if (gridView === false) return <ListView games={paginatedGames} />;

  return <GridView games={paginatedGames} />;
}

GameList.propTypes = {
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
};

export default GameList;
