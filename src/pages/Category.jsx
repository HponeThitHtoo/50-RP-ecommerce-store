import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGamesContext } from '../context/gamesContext';
import { useCategoriesContext } from '../context/categoriesContext';
import { categoriesUrl, gamesUrl } from '../utils/constants';

import Game from '../components/Game';

function Category() {
  const { categoryId } = useParams();
  const {
    gamesByCategoryLoading,
    gamesByCategoryError,
    gamesByCategory,
    fetchGamesByCategory,
  } = useGamesContext();
  const {
    singleCategoryLoading,
    singleCategoryError,
    singleCategory,
    fetchSingleCategory,
  } = useCategoriesContext();

  useEffect(() => {
    fetchSingleCategory(categoriesUrl, { id: categoryId });
    fetchGamesByCategory(gamesUrl, { categoryId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  if (singleCategoryLoading || gamesByCategoryLoading)
    return <div>Loading...</div>;

  if (singleCategoryError || gamesByCategoryError)
    return (
      <div>
        <h2>there was an error...</h2>
      </div>
    );

  return (
    <section className="">
      <div className="bg-darkBackGroundTwo">
        <h1 className="py-14 font-oswald text-center text-3xl uppercase font-bold font-outline-1">
          {singleCategory?.name}
        </h1>
      </div>
      <div className="min-h-[72vh] px-8 2xl:px-48 py-4 bg-darkBackGround text-white">
        <div className="grid md:grid-cols-3 gap-6 md:gap-10 lg:gap-16 xl:gap-24">
          {gamesByCategory.map((game) => (
            <Game key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Category;
