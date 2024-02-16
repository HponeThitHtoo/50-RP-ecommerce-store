import React from 'react';

import { useCategoriesContext } from '../context/categoriesContext';
import { useGamesFilterContext } from '../context/gamesFilterContext';

function GamesFilter() {
  const {
    filters: { text, category, minPrice, maxPrice, price },
    updateFilters,
    clearFilters,
  } = useGamesFilterContext();
  const { categories } = useCategoriesContext();

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
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  name="category"
                  className={`flex items-center justify-center underline-offset-2 ${
                    c.name === category ? 'opacity-100 underline' : 'opacity-50'
                  }`}
                  onClick={updateFilters}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
          {/* end of categories */}

          {/* price */}
          <div className="font-sourceSansPro">
            <h5 className="mb-2 text-primaryOne">price</h5>
            <p>{price}</p>
            <input
              type="range"
              name="price"
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

export default GamesFilter;
