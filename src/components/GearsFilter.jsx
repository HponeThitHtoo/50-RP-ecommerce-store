import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { useGearsFilterContext } from '../context/gearsFilterContext';
import { getUniqueValues, formatPrice } from '../utils/helpers';

const customColors = {
  volt: '#CCE800',
  lilac: '#8C9BCA',
  kda: '#DEE1E9',
  hellokitty: '#F5A1C5',
};

function GearsFilter() {
  const {
    filters: { text, category, brand, color, minPrice, maxPrice, price },
    allGears,
    updateFilters,
    clearFilters,
  } = useGearsFilterContext();

  const categories = getUniqueValues(allGears, 'category');
  const brands = getUniqueValues(allGears, 'brand');
  const colors = getUniqueValues(allGears, 'colors');

  return (
    <div>
      <div className="border border-gray-700">
        <h4 className="p-3 border-b border-b-gray-700 font-oswald text-xl">
          filters
        </h4>
        <form action="" className="p-3 space-y-5">
          {/* search input */}
          <div className="font-sourceSansPro">
            <h5 className="mb-2 text-primaryOne">name</h5>
            <input
              className="p-1 rounded outline-none text-primaryThree"
              type="text"
              name="text"
              placeholder="search"
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/* end search input */}

          {/* categories */}
          <div className="font-sourceSansPro">
            <h5 className="mb-2 text-primaryOne">category</h5>
            <div className="">
              {categories.map((c) => {
                return (
                  <button
                    key={c}
                    type="button"
                    name="category"
                    className={`flex items-center justify-center underline-offset-2 ${
                      c === category ? 'opacity-100 underline' : 'opacity-50'
                    }`}
                    onClick={updateFilters}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of categories */}

          {/* brands */}
          <div className="font-sourceSansPro">
            <h5 className="mb-2 text-primaryOne">brand</h5>
            <div className="">
              <select
                name="brand"
                id="brand"
                className="company bg-gray-700 text-white"
                value={brand}
                onChange={updateFilters}
              >
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* end of brands */}

          {/* colors */}
          <div className="font-sourceSansPro">
            <h5 className="mb-2 text-primaryOne">colors</h5>
            <div>
              {colors.map((c) => {
                if (c === 'all') {
                  return (
                    <button
                      type="button"
                      key={c}
                      name="color"
                      data-color="all"
                      className={`flex justify-center items-center mr-2 opacity-50 ${
                        color === 'all' ? 'opacity-100 underline' : ''
                      }`}
                      onClick={updateFilters}
                    >
                      all
                    </button>
                  );
                }

                let tempColor = c;
                if (c === 'volt') tempColor = customColors.volt;
                if (c === 'lilac') tempColor = customColors.lilac;
                if (c === 'kda') tempColor = customColors.kda;
                if (c === 'hellokitty') tempColor = customColors.hellokitty;

                return (
                  <button
                    type="button"
                    key={c}
                    name="color"
                    data-color={c}
                    style={{ background: tempColor }}
                    className={`flex justify-center items-center w-4 h-4 mr-2 rounded-full border-none bg-black cursor-pointer opacity-50 ${
                      color === 'all' ? 'opacity-100 underline' : ''
                    }`}
                    onClick={updateFilters}
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of colors */}

          {/* price */}
          <div className="font-sourceSansPro">
            <h5 className="mb-2 text-primaryOne">price</h5>
            <p>{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              id="price"
              min={minPrice}
              max={maxPrice}
              value={price}
              onChange={updateFilters}
            />
          </div>
          {/* end of price */}
        </form>

        <div className="p-3">
          <button
            type="button"
            className="px-2 py-1 rounded bg-white text-primaryThree duration-300 hover:bg-gray-300 hover:text-primaryTwo"
            onClick={clearFilters}
          >
            clear filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default GearsFilter;
