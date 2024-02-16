import { Fragment, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { BiUser } from 'react-icons/bi';
import { BsCart2 } from 'react-icons/bs';

import { useCartContext } from '../context/cartContext';
import { useCategoriesContext } from '../context/categoriesContext';
import { useUserContext } from '../context/userContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCartContext();
  const {
    categoriesLoading: loading,
    categoriesError: error,
    categories,
  } = useCategoriesContext();
  const { logoutUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (error)
    return (
      <div>
        <h2>there was an error...</h2>
      </div>
    );

  return (
    <nav className="px-8 2xl:px-48 py-4 bg-darkBackGround text-white">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">
          <NavLink to="/">
            <span className="font-sourceSansPro text-primaryTwo">A</span>
            <span className="font-sourceSansPro text-white">Game</span>
            <span className="font-sourceSansPro text-primaryTwo">Shop</span>
          </NavLink>
        </span>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="hidden md:flex items-center gap-x-8 font-oswald">
            <li className="tracking-widest capitalize">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'block px-4 py-2 tracking-widest capitalize text-primaryOne'
                    : 'block px-4 py-2 tracking-widest capitalize hover:text-primaryOne'
                }
              >
                home
              </NavLink>
            </li>
            <li className="tracking-widest capitalize">
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="tracking-widest capitalize hover:text-primaryOne">
                  categories
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-darkBackGround text-white shadow-lg focus:outline-none">
                    <div className="py-1">
                      {categories.map((category) => (
                        <Menu.Item key={category.id}>
                          {({ active }) => (
                            <NavLink
                              to={`/category/${category.id}`}
                              className={classNames(
                                active
                                  ? 'block px-4 py-2 tracking-widest capitalize hover:text-primaryOne'
                                  : 'block px-4 py-2 tracking-widest capitalize'
                              )}
                            >
                              {category.name}
                            </NavLink>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
            <li className="tracking-widest capitalize">
              <NavLink
                to="/games"
                className={({ isActive }) =>
                  isActive
                    ? 'block px-4 py-2 tracking-widest capitalize text-primaryOne'
                    : 'block px-4 py-2 tracking-widest capitalize hover:text-primaryOne'
                }
              >
                games
              </NavLink>
            </li>
            <li className="tracking-widest capitalize">
              <NavLink
                to="/gears"
                className={({ isActive }) =>
                  isActive
                    ? 'block px-4 py-2 tracking-widest capitalize text-primaryOne'
                    : 'block px-4 py-2 tracking-widest capitalize hover:text-primaryOne'
                }
              >
                gears
              </NavLink>
            </li>
          </ul>
        )}

        <ul className="flex items-center gap-x-2 ml-auto md:ml-0 mr-4 md:mr-0">
          <li>
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="tracking-widest capitalize hover:text-primaryOne">
                <BiUser className="text-xl" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-darkBackGround text-white shadow-lg focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <NavLink
                          to="/register"
                          className={classNames(
                            active
                              ? 'block px-4 py-2 tracking-widest capitalize hover:text-primaryOne'
                              : 'block px-4 py-2 tracking-widest capitalize'
                          )}
                        >
                          Register / Login
                        </NavLink>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          className={classNames(
                            active
                              ? 'block px-4 py-2 tracking-widest capitalize hover:text-primaryOne'
                              : 'block px-4 py-2 tracking-widest capitalize'
                          )}
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </li>
          <li className="relative">
            <NavLink to="/cart">
              <BsCart2 className="text-xl" />
              <span className="absolute left-3 -bottom-2 w-3.5 rounded-full bg-primaryOne text-[0.65rem] font-bold text-center">
                {totalItems}
              </span>
            </NavLink>
          </li>
        </ul>

        {/* Humberger Button */}
        <button
          type="button"
          id="menu-btn"
          className={`block md:hidden focus:outline-none hamburger ${
            menuOpen ? 'open' : ''
          }`}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="hamburger-top" />
          <span className="hamburger-middle" />
          <span className="hamburger-bottom" />
        </button>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`flex-col w-full capitalize ${menuOpen ? 'flex' : 'hidden'}`}
      >
        <li className="tracking-widest capitalize">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'block p-1 text-primaryOne' : 'block p-1'
            }
          >
            home
          </NavLink>
        </li>
        <li className="tracking-widest capitalize">
          <Menu as="div">
            <Menu.Button className="block w-full p-1 text-left tracking-widest capitalize hover:text-primaryOne">
              categories
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="block origin-top-right focus:outline-none">
                <div className="py-1 pl-4">
                  {categories.map((category) => (
                    <Menu.Item key={category.id}>
                      {({ active }) => (
                        <NavLink
                          to={`/category/${category.id}`}
                          className={classNames(
                            active
                              ? 'block w-full p-1 text-left tracking-widest capitalize text-primaryOne'
                              : 'block w-full p-1 text-left tracking-widest capitalize'
                          )}
                        >
                          {category.name}
                        </NavLink>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </li>
        <li className="tracking-widest capitalize">
          <NavLink
            to="/games"
            className={({ isActive }) =>
              isActive
                ? 'block p-1 text-primaryOne'
                : 'block p-1 hover:text-primaryOne'
            }
          >
            games
          </NavLink>
        </li>
        <li className="tracking-widest capitalize">
          <NavLink
            to="/gears"
            className={({ isActive }) =>
              isActive
                ? 'block p-1 text-primaryOne'
                : 'block p-1 hover:text-primaryOne'
            }
          >
            gears
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
