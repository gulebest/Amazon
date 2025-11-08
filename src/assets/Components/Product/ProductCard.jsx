import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import classes from "./product.module.css";
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from '../../../Utility/action.type';

function ProductCard({ product, flex,renderDesc,renderAdd}) {
  // Return nothing if product is undefined
  if (!product) return null;

  const { image, title, id, rating, price, description } = product;

  // ✅ Correct: object destructuring from context
  const { state, dispatch } = useContext(DataContext);

  // Add product to basket
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description }
    });
  };

  // Return nothing if essential fields are missing
  if (!id || !title || !image) return null;

  return (
    <div className={`${classes.card__container} ${flex ? classes.product_flexed : ''}`}>
      {flex ? (
        <img src={image} alt={title} />
      ) : (
        <Link to={`/products/${id}`}>
          <img src={image} alt={title} />
        </Link>
      )}

      <div>
        <h3>{title}</h3>

        <div className={classes.rating}>
          <Rating value={rating?.rate ?? 0} precision={0.1} readOnly />
          <small>{rating?.count ?? "N/A"}</small>
        </div>

        <div>
          <CurrencyFormat amount={price} />
        </div>

        {/* Show description only on detail page */}
        {flex && (
          <p className={classes.description}>
            {description || "No description available."}
          </p>
        )}

        {
          renderAdd && <button className={classes.button} onClick={addToCart}>
          Add to cart
        </button>
        }

      </div>
    </div>
  );
}

export default ProductCard;
