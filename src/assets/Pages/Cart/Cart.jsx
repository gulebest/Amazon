import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./cart.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { Type } from "../../../Utility/action.type";

function Cart() {
  const { state, dispatch } = useContext(DataContext);
  const { basket = [], user } = state; // default to empty array

  // Calculate total safely
  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <section className={classes.cartSection}>
        <section className={classes.container}>
          <div className={classes.cart__container}>
            <h2>Hello {user?.name || ""}</h2>
            <h3>Your shopping basket</h3>
            <hr />

            {basket.length === 0 ? (
              <p>Oops! No item in your cart</p>
            ) : (
              basket.map((item, i) => (
                <section key={i} className={classes.cart_product}>
                  <ProductCard
                    product={item}
                    renderDesc={true}
                    renderAdd={false}
                    flex={true}
                  />
                  <div className={classes.btn_container}>
                    <button className={classes.btn} onClick={() => increment(item)}>
                      <IoIosArrowDropupCircle size={20} />
                    </button>

                    <span>{item.amount}</span>
                    <button className={classes.btn} onClick={() => decrement(item.id)}> <IoIosArrowDropdownCircle size={20} /></button>
                   

                  </div>
                </section>
              ))
            )}
          </div>

          {basket.length !== 0 && (
            <div className={classes.subtotal}>
              <div>
                <p>Subtotal ({basket.length} items)</p>
                <CurrencyFormat amount={total} />
              </div>

              <span>
                <input type="checkbox" />
                <small>This order contains a gift</small>
                <Link to="/payment" className={classes.checkoutLink}>
                  Continue to checkout
                </Link>
              </span>
            </div>
          )}
        </section>
      </section>
    </LayOut>
  );
}

export default Cart;
