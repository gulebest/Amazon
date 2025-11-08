import React, { useContext } from 'react'
import LowerHeader from './LowerHeader';
import { FaSearch } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import { Link } from 'react-router-dom';
import classes from "./Header.module.css";
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from '../../../Utility/firebase'

const Header = () => {
  const { state, dispatch } = useContext(DataContext); 
  const { user,basket } = state; 
  const totalItem=basket?.reduce((amount,item) =>{
    return item.amount + amount
  },0)
  
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          
          {/* logo */}
          <div className={classes.logo__container}>
            <div>
              <Link to='/'>
                <img 
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz3hW6aw_rWIoKnFIpLnXSqBE8Q4Mxme0PpQ&shttps://www.nicepng.com/png/detail/16-167642_amazon-logo-amazon-logo-white-text.png' 
                  alt='amazon logo' 
                />  
              </Link>
            </div>
            
            {/* delivery */}
            <div className={classes.delivery}>
              <span>
               <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span> Ethiopia</span>
              </div>
            </div>
          </div>

          {/* search icon */}
          <div className={classes.search}>
            <select name='' id=''>
              <option value=''>All</option>
            </select>
            <input type='text' />
            <FaSearch size={38}/>
          </div>

          {/* right side link */}
          <div className={classes.order__container}>
            <Link to='/' className={classes.language}>
              <img src="https://www.shutterstock.com/shutterstock/photos/2456548071/display_1500/stock-photo-usa-flag-covering-the-frame-is-waving-in-the-wind-2456548071.jpg" alt="flag" />
              <select name='' id=''>
               <option value=''>EN</option>
              </select>
            </Link>

            {/* sign in */}
            <Link to={!user &&'/auth'}>
            <div>

          { user ? (
            <>
              <p>Hello {user?.email?.split("@")[0]} </p>
              <span onClick={()=>auth.signOut()}>SignOut</span>
              </>
            ):(
              <>
              <p>Hello, Sign In</p>
              <span>Account & List</span>
              </>
            )
          }

            </div>
              
            </Link>

            {/* orders */}
            <Link to='/orders'>
              <p>returns</p>
              <span>& Orders</span>
            </Link>

            {/* cart */}
            <Link to='/cart' className={classes.cart}>
              <BiCart size={35}/>
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader/>
    </section>
  )
}

export default Header
