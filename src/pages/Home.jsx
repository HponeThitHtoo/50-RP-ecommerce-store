import React from 'react';

import FeaturedGames from '../components/FeaturedGames';
import AboutSection from '../components/AboutSection';
import LatestGames from '../components/LatestGames';
import FeaturedGears from '../components/FeaturedGears';

// https://themeforest.net/item/gamewar-digital-game-store-shopify-20-responsive-theme/42436003
// https://dribbble.com/shots/7140384-Game-Sevred-filter

function Home() {
  return (
    <>
      <FeaturedGames />
      <AboutSection />
      <LatestGames />
      <FeaturedGears />
    </>
  );
}

export default Home;
