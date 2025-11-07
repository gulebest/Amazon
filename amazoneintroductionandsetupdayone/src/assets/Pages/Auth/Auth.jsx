import React, { useState, useContext } from 'react';
import classes from './auth.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../../Utility/firebase';
import {ClipLoader} from 'react-spinners'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { Type } from '../../../Utility/action.type';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading]=useState({
    signIn:false,
    signUp:false
  })

  const { state, dispatch } = useContext(DataContext);
  const navigate= useNavigate();
  const { user } = state;
  const navStateData=useLocation();
  

  const authHandler = async (e) => {
    e.preventDefault();
    const actionType = e.target.name;

    try {
      if (actionType === 'signin') {
        setLoading({...loading, signIn:true})
        const userInfo = await signInWithEmailAndPassword(auth, email, password);
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        setLoading({...loading, signIn:false})
        navigate(navStateData?.state?.redirect || "/");      } else if (actionType === 'signup') {
        setLoading({...loading, signUp:true})
        const userInfo = await createUserWithEmailAndPassword(auth, email, password);
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        setLoading({...loading, signUp:false})
        navigate(navStateData?.state?.redirect || "/");
      }
      setError(''); // clear any previous error
    } catch (err) {
      setError(err.message);
      setLoading({...loading, signUp:false})
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
        {navStateData?.state?.msg && (
          <small style={{
            padding:"5px",
            textAlign:'center',
            color:"red",
            fontWeight:"bold",

          }}>
          {navStateData?.state?.msg}
          </small>
        )}

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
          >{
            loading.signIn ? (<ClipLoader  color='#000' size={15}></ClipLoader>):
           (" Sign In"

           )}
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
              {
            loading.signUp ? (<ClipLoader  color='#000' size={15}></ClipLoader>):
           (" Create Your Amazon Account"
            
           )}
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
