import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { gamesUrl as gUrl, reviewsUrl as rUrl } from '../utils/constants';

import { useGamesContext } from '../context/gamesContext';
import { useReviewsContext } from '../context/reviewsContext';

import AddToCart from '../components/AddToCart';

function SingleGame() {
  const { gameId } = useParams();
  const { singleGameLoading, singleGameError, singleGame, fetchSingleGame } =
    useGamesContext();
  const {
    reviewsByGameLoading,
    reviewsByGameError,
    reviewsByGame,
    fetchReviewsByGame,
  } = useReviewsContext();
  const gamesUrl = `${gUrl}/${gameId}?_expand=category&_embed=reviews`;
  const reviewsUrl = `${rUrl}?gameId=${gameId}&_expand=user`;

  useEffect(() => {
    fetchSingleGame(gamesUrl);
    fetchReviewsByGame(reviewsUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);

  if (singleGameLoading || reviewsByGameLoading) return <div>Loading...</div>;

  if (singleGameError || reviewsByGameError)
    return (
      <div>
        <h2>there was an error...</h2>
      </div>
    );

  return (
    <section className="min-h-[82vh] px-8 2xl:px-48 py-8 bg-darkBackGround text-white">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={singleGame?.image} alt="game" />
        <div className="flex flex-col space-y-10">
          <div>
            <h3 className="font-sourceSansPro text-2xl capitalize">
              {singleGame?.name}
            </h3>
            <h4 className="inline-block w-fit px-2 py-1 bg-primaryThree rounded-lg font-oswald lowercase text-sm text-white">
              {singleGame?.category?.name}
            </h4>
          </div>
          <p className="font-sourceSansPro">{singleGame?.about}</p>
          <p className="font-sourceSansPro">
            <span>Availale : </span>
            {singleGame?.stock > 0 ? (
              <span className="text-primaryTwo">In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </p>
          <AddToCart game={singleGame} />
        </div>
      </div>
      <div className="relative mt-24 border-2 rounded-b rounded-r border-primaryThree">
        <h5 className="absolute -left-0.5 -top-12 h-12 p-2 bg-primaryThree rounded-t font-oswald text-lg capitalize">
          details
        </h5>
        <p className="p-4 font-sourceSansPro">{singleGame?.details}</p>
      </div>
      <div className="relative mt-24 border-2 rounded-b rounded-r border-primaryThree">
        <h5 className="absolute -left-0.5 -top-12 h-12 p-2 bg-primaryThree rounded-t font-oswald text-lg capitalize">
          reviews
        </h5>
        {reviewsByGame.length === 0 ? (
          <p className="m-3 p-3 rounded bg-primaryThree font-sourceSansPro">
            This game has no review.
          </p>
        ) : (
          <>
            {reviewsByGame.map((review) => (
              <figure
                key={review.id}
                className="m-3 p-3 rounded bg-primaryThree font-sourceSansPro"
              >
                <blockquote className="">
                  <p>{review.message}</p>
                </blockquote>
                <figcaption>
                  —{' '}
                  <cite className="text-primaryOne">
                    {review.user.username}
                  </cite>
                </figcaption>
              </figure>
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default SingleGame;
