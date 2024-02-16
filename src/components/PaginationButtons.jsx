/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import { returnPaginationRange } from '../utils/helpers';

function PaginationButtons({ totalPage, page, limit, siblings, onPageChange }) {
  const array = returnPaginationRange(totalPage, page, limit, siblings);
  let count = 1;

  return (
    <div className="flex justify-start">
      <ul className="flex justify-center border border-primaryOne rounded">
        <li
          onClick={() => onPageChange('&laquo;')}
          className="px-1 md:px-2 md:py-1 border-r border-primaryOne cursor-pointer"
        >
          <span className="page-link">&laquo;</span>
        </li>
        <li
          onClick={() => onPageChange('&lsaquo;')}
          className="px-1 md:px-2 md:py-1 border-r border-primaryOne cursor-pointer"
        >
          <span className="page-link">&lsaquo;</span>
        </li>
        {array.map((value, index) => {
          if (value === '...' && count === 1 && index === 1) {
            count = 2;
            return (
              <li
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                onClick={() => onPageChange('prev-group')}
                className={`px-1 md:px-2 md:py-1 border-r border-primaryOne cursor-pointer ${
                  value === page ? 'bg-primaryOne text-white' : ''
                }`}
                data-group="prev-group"
              >
                <span className="page-link">{value}</span>
              </li>
            );
          }
          if (
            (value === '...' && count === 1 && index === 5) ||
            (value === '...' && count === 2)
          ) {
            count = 1;
            return (
              <li
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                onClick={() => onPageChange('next-group')}
                className={`px-1 md:px-2 md:py-1 border-r border-primaryOne cursor-pointer ${
                  value === page ? 'bg-primaryOne text-white' : ''
                }`}
                data-group="next-group"
              >
                <span className="page-link">{value}</span>
              </li>
            );
          }
          return (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={() => onPageChange(value)}
              className={`px-1 md:px-2 md:py-1 border-r border-primaryOne cursor-pointer ${
                value === page ? 'bg-primaryOne text-white' : ''
              }`}
            >
              <span className="page-link">{value}</span>
            </li>
          );
        })}
        <li
          onClick={() => onPageChange('&rsaquo;')}
          className="px-1 md:px-2 md:py-1 border-r border-primaryOne cursor-pointer"
        >
          <span className="page-link">&rsaquo;</span>
        </li>
        <li
          onClick={() => onPageChange('&raquo;')}
          className="px-1 md:px-2 md:py-1 cursor-pointer"
        >
          <span className="page-link">&raquo;</span>
        </li>
      </ul>
    </div>
  );
}

PaginationButtons.propTypes = {
  totalPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  siblings: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationButtons;
