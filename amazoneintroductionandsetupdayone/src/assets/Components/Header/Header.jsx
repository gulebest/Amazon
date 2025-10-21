import React from 'react'
import LowerHeader from './LowerHeader';
import { FaSearch } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <section>
      <section>
        <div className={classes.header__container}>
          
          {/* logo */}
          <div className={classes.logo__container}>
            <div>
              <a href=''>
                <img 
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz3hW6aw_rWIoKnFIpLnXSqBE8Q4Mxme0PpQ&shttps://www.nicepng.com/png/detail/16-167642_amazon-logo-amazon-logo-white-text.png' 
                  alt='amazon logo' 
                />  
              </a>
            </div>
            

            {/* delivery */}
            <div className={classes.delivery}>
              <span>
               <SlLocationPin />
              </span>
              <div>
              <p>Delivered to</p>
               <span> Ethiopia
              </span>
              </div>
            </div>
            </div>

            {/* search icon */}
            <div className={classes.search}>
              <select name='' id=''>
                <option value=''>All</option>
              </select>
              <input type='text' />
             <FaSearch size={25}/>
            </div>
          

          {/* right side link */}
        <div className={classes.order__container}>
            
              <a href="" className={classes.language}>
                <img src="https://www.shutterstock.com/shutterstock/photos/2456548071/display_1500/stock-photo-usa-flag-covering-the-frame-is-waving-in-the-wind-2456548071.jpg" alt="flag" />
              
              <select name='' id=''>
               <option value=''>EN</option>
              </select>
                </a>


            {/* three components */}
            
              {/* sign in */}
          
                <a href="">
                  <p>Sign In</p>
                  <span>Account & List</span>
                </a>
              

              {/* orders */}
             
                <a href="">
                  <p>returns</p>
                  <span>& Orders</span>
                </a>
              

              {/* cart */}
              
                <a href="" className={classes.cart}>
                  <BiCart size={35}/>
                  <span>0</span>
                </a>
              
            </div>
          </div>
        
      </section>
      <LowerHeader/>
    </section>
  )
}

export default Header
