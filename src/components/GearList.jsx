import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import { useGearsFilterContext } from '../context/gearsFilterContext';
import { paginateTwo } from '../utils/helpers';
import GearsListView from './GearsListView';
import GearsGridView from './GearsGridView';

function GearList({ page, limit }) {
  const [paginatedGears, setPaginatedGears] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const { filteredGears: gears, gridView } = useGearsFilterContext();

  useEffect(() => {
    setPaginatedGears(paginateTwo(gears, page, limit));
  }, [gears, page, limit]);

  if (gears.length < 1) {
    return (
      <h5 className="font-sourceSansPro">
        Sorry, no games matched your search...
      </h5>
    );
  }

  if (gridView === false) return <GearsListView gears={paginatedGears} />;

  return <GearsGridView gears={paginatedGears} />;
}

GearList.propTypes = {
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
};

export default GearList;
