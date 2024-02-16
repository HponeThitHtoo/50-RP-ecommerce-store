import { useEffect, useState } from 'react';
import { RxDotFilled } from 'react-icons/rx';

import { useGamesContext } from '../context/gamesContext';

function FeaturedGames() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    gamesLoading: loading,
    gamesError: error,
    featuredGames: featured,
  } = useGamesContext();

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === featured.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    setTimeout(() => {
      nextSlide();
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  if (loading) return <div>Loading...</div>;

  if (error)
    return (
      <div>
        <h2>there was an error...</h2>
      </div>
    );

  return (
    <header className="relative w-full h-[60vh] px-8 2xl:px-48 bg-darkBackGround">
      <div
        style={{
          backgroundImage: `url(${featured.slice(-3)[currentIndex]?.image})`,
        }}
        className="w-full h-full bg-contain bg-center"
      >
        <div className="flex flex-col gap-y-4 justify-center items-center w-full h-full bg-gray-700/30 backdrop-brightness-50">
          <h1 className="font-oswald text-3xl text-white">
            {featured[currentIndex]?.name}
          </h1>
          <button
            type="button"
            className="px-3 py-1 bg-primaryTwo font-sourceSansPro font-semibold text-white duration-500 hover:bg-primaryThree hover:text-blue-100"
          >
            read more
          </button>
        </div>
      </div>
      {/* Indicators */}
      <div className="flex justify-center absolute bottom-2 left-[50%] -translate-x-[50%] py-2">
        {featured.map((game, slideIndex) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={slideIndex}
            className={`text-2xl cursor-pointer ${
              currentIndex === slideIndex ? 'text-primaryTwo' : 'text-white'
            }`}
            aria-hidden="true"
            onClick={() => goToSlide(slideIndex)}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </header>
  );
}

export default FeaturedGames;
