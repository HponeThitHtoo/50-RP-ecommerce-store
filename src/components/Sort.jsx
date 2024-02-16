// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { BsFillGridFill, BsList } from 'react-icons/bs';

import { useGamesFilterContext } from '../context/gamesFilterContext';

import PaginationButtons from './PaginationButtons';

function Sort({ totalPage, page, limit, onPageChange, onLimitChange }) {
  const {
    filteredGames,
    gridView,
    setGridView,
    setListView,
    sort,
    updateSort,
  } = useGamesFilterContext();

  return (
    <div className="space-y-2 p-2 border border-gray-700 font-sourceSansPro">
      <div className="flex justify-between items-center">
        <form action="" className="space-x-2">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="sort">sort by</label>
          <select
            name="sort"
            id="sort"
            className="bg-gray-700"
            value={sort}
            onChange={updateSort}
          >
            <option value="price-lowest">price (lowest)</option>
            <option value="price-highest">price (highest)</option>
            <option value="name-a">name (a-z)</option>
            <option value="name-z">name (z-a)</option>
          </select>
        </form>
        <div className="flex gap-2">
          <button
            type="button"
            className={`flex justify-center items-center w-6 h-6 rounded bg-transparent cursor-pointer border border-[1px] ${
              gridView ? 'border-primaryOne' : 'border-gray-700'
            }`}
            onClick={setGridView}
          >
            <BsFillGridFill
              className={`text-base ${gridView ? 'text-primaryOne' : ''}`}
            />
          </button>
          <button
            type="button"
            className={`flex justify-center items-center w-6 h-6 rounded bg-transparent cursor-pointer border border-[1px] ${
              !gridView ? 'border-primaryOne' : 'border-gray-700'
            }`}
            onClick={setListView}
          >
            <BsList
              className={`text-base ${!gridView ? 'text-primaryOne' : ''}`}
            />
          </button>
        </div>
      </div>
      <div className="flex justify-start items-center space-y-2 md:space-y-0">
        <p className="mr-2">{filteredGames.length} games found</p>
        <select
          id="item-per-page"
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className=" bg-gray-700 text-white"
          defaultValue={5}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <PaginationButtons
        totalPage={totalPage}
        page={page}
        limit={limit}
        siblings={1}
        onPageChange={onPageChange}
      />
    </div>
  );
}

Sort.propTypes = {
  totalPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onLimitChange: PropTypes.func.isRequired,
};

export default Sort;
