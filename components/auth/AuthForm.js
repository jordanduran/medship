import { Fragment, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const headingRef = useRef(null);
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const phoneInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const stateInputRef = useRef();
  const zipcodeInputRef = useRef();

  const createUser = async (
    name,
    email,
    password,
    phone,
    street,
    city,
    state,
    zipcode
  ) => {
    const response = await fetch('/api/createUser', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        street,
        city,
        state,
        zipcode,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!!!');
    }

    return data;
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    headingRef.current.scrollIntoView();
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredState = stateInputRef.current.value;
    const enteredZipcode = zipcodeInputRef.current.value;

    // OPTIONAL: Add Validation

    if (isLogin) {
      // sign user in
    } else {
      // create new user
      try {
        const result = await createUser(
          enteredName,
          enteredEmail,
          enteredPhone,
          enteredPassword,
          enteredStreet,
          enteredCity,
          enteredState,
          enteredZipcode
        );
        nameInputRef.current.value = '';
        phoneInputRef.current.value = '';
        emailInputRef.current.value = '';
        streetInputRef.current.value = '';
        cityInputRef.current.value = '';
        stateInputRef.current.value = '';
        zipcodeInputRef.current.value = '';
        passwordInputRef.current.value = '';
        setIsLogin(true);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Fragment>
      {isLogin && (
        <Fragment>
          <h2
            class='mt-6 text-center text-3xl font-extrabold text-gray-900'
            ref={headingRef}
          >
            Sign into your account
          </h2>
          <p class='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <a
              onClick={switchAuthModeHandler}
              class='font-medium text-green-600 hover:text-green-500'
              style={{ cursor: 'pointer' }}
            >
              start your 14-day free trial
            </a>
          </p>
          <form
            onSubmit={submitHandler}
            className='mt-8 space-y-6'
            action='#'
            method='POST'
          >
            <input type='hidden' name='remember' value='true' />
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <label for='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  ref={emailInputRef}
                  id='email-address'
                  name='email'
                  type='email'
                  autocomplete='email'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm'
                  placeholder='Email address'
                />
              </div>
              <div>
                <label for='password' className='sr-only'>
                  Password
                </label>
                <input
                  ref={passwordInputRef}
                  id='password'
                  name='password'
                  type='password'
                  autocomplete='current-password'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm'
                  placeholder='Password'
                />
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember_me'
                  name='remember_me'
                  type='checkbox'
                  className='h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded'
                />
                <label
                  for='remember_me'
                  className='ml-2 block text-sm text-gray-900'
                >
                  Remember me
                </label>
              </div>

              <div className='text-sm'>
                <a
                  href='#'
                  className='font-medium text-green-600 hover:text-green-500'
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              >
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <svg
                    className='h-5 w-5 text-green-500 group-hover:text-green-400'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
                Sign In
              </button>
            </div>

            <div class='relative'>
              <div
                class='absolute inset-0 flex items-center'
                aria-hidden='true'
              >
                <div class='w-full border-t border-gray-300'></div>
              </div>
              <div class='relative flex justify-center'>
                <button
                  onClick={switchAuthModeHandler}
                  type='button'
                  class='inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  <svg
                    class='-ml-1.5 mr-1 h-5 w-5 text-gray-400'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span>Don't have an account?</span>
                </button>
              </div>
            </div>
          </form>
        </Fragment>
      )}
      {!isLogin && (
        <Fragment>
          <h2
            class='mt-6 text-center text-3xl font-extrabold text-gray-900'
            ref={headingRef}
          >
            Create your new account
          </h2>
          <form
            onSubmit={submitHandler}
            className='mt-8 space-y-6'
            action='#'
            method='POST'
          >
            <div>
              <label
                for='name'
                className='text-left block text-sm font-medium text-gray-700'
              >
                Full Name
              </label>
              <div className='mt-1'>
                <input
                  ref={nameInputRef}
                  type='text'
                  name='name'
                  id='name'
                  className='shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  placeholder='John Doe'
                  required
                />
              </div>
            </div>
            <div>
              <label
                for='phone'
                className='text-left block text-sm font-medium text-gray-700'
              >
                Phone Number
              </label>
              <div className='mt-1'>
                <input
                  type='tel'
                  name='phone'
                  id='phone'
                  autoComplete='phone'
                  placeholder='123-456-7890'
                  required
                  className='block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                  ref={phoneInputRef}
                />
              </div>
            </div>
            <div>
              <label
                for='email'
                className='text-left block text-sm font-medium text-gray-700'
              >
                Email Address
              </label>
              <div className='mt-1'>
                <input
                  ref={emailInputRef}
                  type='text'
                  name='email'
                  id='email'
                  className='shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  placeholder='you@example.com'
                  required
                />
              </div>
            </div>
            <div>
              <label
                for='street'
                className='text-left block text-sm font-medium text-gray-700'
              >
                Street Address
              </label>
              <div className='mt-1'>
                <input
                  ref={streetInputRef}
                  type='text'
                  name='street'
                  id='street'
                  className='shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  placeholder='123 Riverview Park'
                  required
                />
              </div>
            </div>
            <div>
              <label
                for='city'
                className='text-left block text-sm font-medium text-gray-700'
              >
                City
              </label>
              <div className='mt-1'>
                <input
                  ref={cityInputRef}
                  type='text'
                  name='city'
                  id='city'
                  className='shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  placeholder='Manhattan'
                  required
                />
              </div>
            </div>
            <div>
              <label
                for='state'
                className='text-left block text-sm font-medium text-gray-700'
              >
                State
              </label>
              <div className='mt-1'>
                <input
                  ref={stateInputRef}
                  type='text'
                  name='state'
                  id='state'
                  className='shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  placeholder='New York'
                  required
                />
              </div>
            </div>
            <div>
              <label
                for='zipcode'
                className='text-left block text-sm font-medium text-gray-700'
              >
                Zipcode
              </label>
              <div className='mt-1'>
                <input
                  ref={zipcodeInputRef}
                  type='text'
                  name='zipcode'
                  id='zipcode'
                  className='shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  placeholder='10001'
                  required
                />
              </div>
            </div>
            <div>
              <label
                for='password'
                className='text-left block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <div className='mt-1'>
                <input
                  ref={passwordInputRef}
                  type='password'
                  name='password'
                  id='password'
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm'
                  autocomplete='current-password'
                  required
                />
              </div>
            </div>
            <div>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              >
                <span className='text-base absolute left-0 inset-y-0 flex items-center pl-3'>
                  <FontAwesomeIcon icon={faUserPlus} />
                </span>
                Sign Up
              </button>
            </div>

            <div className='relative'>
              <div
                className='absolute inset-0 flex items-center'
                aria-hidden='true'
              >
                <div className='w-full border-t border-gray-300'></div>
              </div>
              <div className='relative flex justify-center'>
                <button
                  onClick={switchAuthModeHandler}
                  type='button'
                  className='inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  <svg
                    className='-ml-1.5 mr-1 h-5 w-5 text-gray-400'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span>Already have an account?</span>
                </button>
              </div>
            </div>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AuthForm;
