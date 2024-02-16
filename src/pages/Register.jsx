/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { useUserContext } from '../context/userContext';

import { LunaThree } from '../assets';

// https://dribbble.com/shots/6011104-Registration-form

const initialState = {
  username: '',
  email: '',
  password: '',
  agreed: true,
  rememberedMe: false,
  isMember: false,
  showPassword: false,
};

function Register() {
  const navigate = useNavigate();
  const passwordRef = useRef();
  const [values, setValues] = useState(initialState);

  const { userLoading, user, loginUser, registerUser } = useUserContext();

  const toggleHideShowPassword = () => {
    const type =
      passwordRef.current.getAttribute('type') === 'password'
        ? 'text'
        : 'password';
    passwordRef.current.setAttribute('type', type);
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const toggleMemberOrNot = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    let value;
    const { name } = e.target;
    if (name === 'rememberedMe' || name === 'agreed') {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, agreed, isMember, rememberedMe } =
      values;

    if (values.isMember) {
      if (!email || !password) {
        toast.error('Please fill out all fields');
        return;
      }
      loginUser({ email, password, rememberedMe });
    } else if (!values.isMember) {
      if (!email || !password || (!isMember && !username)) {
        toast.error('Please fill out all fields');
        return;
      }
      if (!agreed) {
        toast.warn('You must agree terms and policies to register');
        return;
      }
      registerUser({ username, email, password });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col md:flex-row px-8 2xl:px-48 bg-darkBackGround">
      <div
        style={{ backgroundImage: `url(${LunaThree})` }}
        className="hidden md:block basis-2/5 min-h-full bg-black bg-contain bg-center bg-no-repeat"
      >
        <div
          className="relative w-full h-full 
          bg-primaryOne/30 backdrop-brightness-110"
        >
          <div className="absolute bottom-5 left-5 text-white">
            <h3 className="text-lg font-semibold font-oswald">HI THERE!</h3>
            <h5 className="font-semibold font-sourceSansPro">
              Join us and enjoy
            </h5>
          </div>
        </div>
      </div>
      <section className="basis-full md:basis-3/5 bg-black">
        <div className="flex justify-center items-center md:h-[70vh] p-5 md:p-0">
          <div className="w-full md:w-[28vw] xl:w-[33vw] space-y-4">
            <h1 className="text-lg font-oswald">
              <span
                className={`${
                  values.isMember ? 'text-gray-400' : 'text-white'
                }`}
              >
                Registration /{' '}
              </span>
              <span
                className={`${
                  values.isMember ? 'text-white' : 'text-gray-400'
                }`}
              >
                Login
              </span>
            </h1>
            <form
              action=""
              className="flex flex-col gap-y-4 font-sourceSansPro"
              onSubmit={handleSubmit}
            >
              {!values.isMember && (
                <div className="">
                  <label htmlFor="username" className="text-gray-400">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="w-full p-1 rounded focus:outline-none"
                    value={values.username}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="">
                <label htmlFor="email" className="text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full p-1 rounded focus:outline-none"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <label htmlFor="password" className="text-gray-400">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={passwordRef}
                  className="w-full p-1 rounded focus:outline-none"
                  value={values.password}
                  onChange={handleChange}
                />
                {values.showPassword ? (
                  <AiFillEyeInvisible
                    className="inline -ml-7 mb-1 cursor-pointer"
                    onClick={toggleHideShowPassword}
                  />
                ) : (
                  <AiFillEye
                    className="inline -ml-7 mb-1 cursor-pointer"
                    onClick={toggleHideShowPassword}
                  />
                )}
              </div>
              {!values.isMember && (
                <div>
                  <label htmlFor="agreed" className="text-gray-400">
                    <input
                      type="checkbox"
                      name="agreed"
                      id="agreed"
                      className="mr-2 text-gray-400"
                      checked={values.agreed}
                      onChange={handleChange}
                    />
                    I am 18 years old and I have read and accept{' '}
                    <a href="/terms" className="text-primaryThree">
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="/policy" className="text-primaryThree">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              )}
              <div>
                {values.isMember && (
                  <label htmlFor="rememberedMe" className="text-gray-400">
                    <input
                      type="checkbox"
                      name="rememberedMe"
                      id="rememberedMe"
                      className="mr-2"
                      value={values.rememberedMe}
                      onChange={handleChange}
                    />
                    Remember me
                  </label>
                )}

                <button
                  type="submit"
                  className="block w-full p-1.5 rounded bg-primaryOne text-white capitalize duration-300 hover:bg-primaryThree hover:text-gray-300"
                  disabled={userLoading}
                >
                  {userLoading ? 'loading' : 'submit'}
                </button>
              </div>
            </form>

            <p className="flex justify-center text-gray-400 font-sourceSansPro before:inline-block before:content-[''] before:w-[35%] before:border-b-2 before:border-b-gray-500 before:mr-2 before:mb-2 after:inline-block after:content-[''] after:w-[35%] after:border-b-2 after:border-b-gray-500 after:ml-2 after:mb-2">
              or
            </p>

            {values.isMember ? (
              <p className="text-gray-400 font-sourceSansPro">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  className="text-primaryOne"
                  onClick={toggleMemberOrNot}
                >
                  Register
                </button>
              </p>
            ) : (
              <p className="text-gray-400 font-sourceSansPro">
                Already have an account?{' '}
                <button
                  type="button"
                  className="text-primaryOne"
                  onClick={toggleMemberOrNot}
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
