import React, { useContext, useState } from "react";
import classes from "./payement.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from '../../Components/Product/ProductCard';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";

function Payment() {
  const { state } = useContext(DataContext);
  const { user, basket } = state;

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0) || 0;

    const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );
  const [cardError, setCardError]=useState(null);
    const stripe = useStripe();
  const elements = useElements();

  const handleChange=(e)=>{
    console.log(e);

    e?.error?.message? setCardError( e?.error?.message):setCardError("")
  };

  return (
    <LayOut>
      {/* Header */}
      <div className={classes.payment_header}>
        Checkout ({totalItem || 0}) items
      </div>

      {/* Payment method */}
      <section className={classes.payment}>
        {/* Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>

        <hr />

        {/* Product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard key={index} product={item} flex={true} />
            ))}
          </div>
        </div>

        <hr />

        {/* Card form */}
        <div className={classes.flex}>
          <h3>Payment metods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
<form action="">
  {/*error */}
  {cardError &&
   <small style={{color:"red"}}> {cardError} </small>}
   {/* card element */}
<CardElement onChange={handleChange}/>
{/* price */}
<div className={classes.payment_price}>
  <div>
    <span>
       <p>Total Order |</p><CurrencyFormat amount={total}/>
    </span>
  </div>
   <button>
    Pay Now
   </button>
</div>
</form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
