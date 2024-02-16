import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { gearsUrl } from '../utils/constants';
import { useGearsContext } from '../context/gearsContext';

import AddToCart from '../components/AddToCart';

function SingleGear() {
  const [imageIndex, setImageIndex] = useState(0);
  const { gearId } = useParams();
  const { singleGearLoading, singleGearError, singleGear, fetchSingleGear } =
    useGearsContext();
  useEffect(() => {
    fetchSingleGear(`${gearsUrl}/${gearId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gearId]);

  if (singleGearLoading) return <div>Loading...</div>;

  if (singleGearError)
    return (
      <div>
        <h2>there was an error...</h2>
      </div>
    );

  return (
    <section className="min-h-[82vh] px-8 2xl:px-48 py-8 bg-darkBackGround text-white">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={singleGear?.images[imageIndex]?.image}
          alt="game"
          className="w-[480px] h-[380px] object-cover object-center"
        />
        <div className="flex flex-col space-y-10">
          <div>
            <h3 className="font-sourceSansPro text-2xl capitalize">
              {singleGear?.name}
            </h3>
            <h4 className="inline-block w-fit px-2 py-1 bg-primaryThree rounded-lg font-oswald lowercase text-sm text-white">
              {singleGear?.category}
            </h4>
          </div>
          <p className="font-sourceSansPro">
            Brand : <span className="text-primaryTwo">{singleGear?.brand}</span>
          </p>
          <p className="font-sourceSansPro">
            <span>Availale : </span>
            {singleGear?.stock > 0 ? (
              <span className="text-primaryTwo">In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </p>
          <AddToCart gear={singleGear} setImageIndex={setImageIndex} />
        </div>
      </div>
    </section>
  );
}

export default SingleGear;
