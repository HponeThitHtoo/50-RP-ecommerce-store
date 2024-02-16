import React from 'react';
import { Link } from 'react-router-dom';

import { useGearsContext } from '../context/gearsContext';

function FeaturedGears() {
  const {
    gearsLoading: loading,
    gearsError: error,
    featuredGears: featured,
  } = useGearsContext();

  if (loading) return <div>Loading...</div>;

  if (error)
    return (
      <div>
        <h2>there was an error...</h2>
      </div>
    );

  return (
    <section className="px-8 2xl:px-48 py-8 bg-darkBackGround text-white">
      <h1 className="text-center font-oswald text-2xl font-bold">
        Featured Gears
      </h1>
      <div className="w-9 mx-auto mt-2 border-b-4 border-b-primaryOne" />
      <div className="flex flex-col md:flex-row gap-y-5 md:gap-y-0 md:gap-x-5 mt-8">
        {featured.slice(-3).map((gear) => (
          <div key={gear.id} className="relative group">
            <img
              src={gear.images[0].image}
              alt="gear"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gray-700/50 duration-500 group-hover:bg-gray-700/20" />

            <Link
              to="/"
              className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] px-3 py-1 bg-primaryTwo font-sourceSansPro font-semibold text-white opacity-0 duration-500 group-hover:opacity-100"
            >
              read more
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedGears;
