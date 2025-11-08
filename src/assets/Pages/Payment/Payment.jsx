import React, { useContext, useState } from "react";
import classes from "./payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from '../../Components/Product/ProductCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../../../src/Api/axios"; 
import ClipLoader from "react-spinners/ClipLoader";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../../Utility/action.type"

function Payment() {
  const { state, dispatch} = useContext(DataContext);
  const { user, basket } = state;

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0) || 0;
  const total = basket.reduce((amount, item) => item.price * item.amount + amount, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCardError(e?.error?.message || "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setCardError("Stripe has not loaded yet.");
      return;
    }

    if (!user) {
      setCardError("User not logged in.");
      return;
    }

    if (total <= 0) {
      setCardError("Basket is empty or total is invalid.");
      return;
    }

    try {
      setProcessing(true);

      // Convert total to cents (integer)
      const amountInCents = Math.round(total * 100);

      // Create payment intent via backend (Firebase function)
      const response = await axiosInstance.post(`/payment/create?total=${amountInCents}`);

      const clientSecret = response.data?.clientSecret;
      if (!clientSecret) throw new Error("Failed to get client secret");

      // Confirm payment with Stripe.js
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      // Save order details to Firestore
      await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
      //EMPTY THE BASKET
    dispatch({type:Type.EMPTY_BASKET});

      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order" } });

    } catch (error) {
      console.error("Payment error:", error);
      setCardError(error?.response?.data?.error || error.message || "Payment failed");
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment_header}>
        Checkout ({totalItem || 0}) items
      </div>

      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email || "Guest"}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>

        <hr />

        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard key={index} product={item} flex={true} />
            ))}
          </div>
        </div>

        <hr />

        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && <small style={{ color: "red" }}>{cardError}</small>}

                <CardElement onChange={handleChange} />

                <div className={classes.payment_price}>
                  <div>
                    <span>
                      <p>Total Order |</p><CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={processing || !stripe || !elements}>
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>please wait...</p>
                      </div>
                    ) : "Pay Now"}
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
