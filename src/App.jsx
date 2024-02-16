import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import SharedLayout from './pages/SharedLayout';
import CartPage from './pages/CartPage';
import Category from './pages/Category';
import CheckoutPage from './pages/CheckoutPage';
import Games from './pages/Games';
import Gears from './pages/Gears';
import Home from './pages/Home';
import ProtectedRoute from './pages/ProtectedRoute';
import Register from './pages/Register';
import SingleGame from './pages/SingleGame';
import SingleGear from './pages/SingleGear';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="category">
          <Route path=":categoryId" element={<Category />} />
        </Route>
        <Route path="games" element={<Games />} />
        <Route path="game">
          <Route path=":gameId" element={<SingleGame />} />
        </Route>
        <Route path="gears" element={<Gears />} />
        <Route path="gear">
          <Route path=":gearId" element={<SingleGear />} />
        </Route>
        <Route path="cart" element={<CartPage />} />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default WrappedApp;
