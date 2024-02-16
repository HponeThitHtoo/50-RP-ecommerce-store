import React from 'react';
import ReactDOM from 'react-dom/client';

import { GamesProvider } from './context/gamesContext';
import { CategoriesProvider } from './context/categoriesContext';
import { GearsProvider } from './context/gearsContext';
import { ReviewsProvider } from './context/reviewsContext';
import { GameFilterProvider } from './context/gamesFilterContext';
import { GearsFilterProvider } from './context/gearsFilterContext';
import { CartProvider } from './context/cartContext';
import { UserProvider } from './context/userContext';

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CategoriesProvider>
      <GamesProvider>
        <GearsProvider>
          <ReviewsProvider>
            <GameFilterProvider>
              <GearsFilterProvider>
                <CartProvider>
                  <UserProvider>
                    <App />
                  </UserProvider>
                </CartProvider>
              </GearsFilterProvider>
            </GameFilterProvider>
          </ReviewsProvider>
        </GearsProvider>
      </GamesProvider>
    </CategoriesProvider>
  </React.StrictMode>
);
