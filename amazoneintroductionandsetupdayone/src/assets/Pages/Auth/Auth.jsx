import React, { useState, useContext } from 'react';
import classes from './auth.module.css';
import { Link } from 'react-router-dom';
import { auth } from '../../../Utility/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { Type } from '../../../Utility/action.type';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // ✅ Correct context usage
  const { state, dispatch } = useContext(DataContext);
  const { user } = state;

  console.log('Current user:', user);

  const authHandler = async (e) => {
    e.preventDefault();
    const actionType = e.target.name;

    try {
      if (actionType === 'signin') {
        const userInfo = await signInWithEmailAndPassword(auth, email, password);
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
      } else if (actionType === 'signup') {
        const userInfo = await createUserWithEmailAndPassword(auth, email, password);
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
      }
      setError(''); // clear any previous error
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className={classes.login}>
      {/* Logo */}
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
        />
      </Link>

      {/* Form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>

        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />
          </div>

          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signInButton}
          >
            Sign In
          </button>

          <p>
            By signing in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale.
            Please see our Privacy Notice, Cookies Notice, and Interest-Based Ads Notice.
          </p>

          <button
            type="submit"
            onClick={authHandler}
            name="signup"
            className={classes.login_registerButn}
          >
            Create Your Amazon Account
          </button>

          {/* ✅ Single Error Message - Only at the bottom */}
          {error && (
            <small style={{ padding: '5px', color: 'red', display: 'block', textAlign: 'center' }}>
              {error}
            </small>
          )}
        </form>
      </div>
    </section>
  );
}

export default Auth;
