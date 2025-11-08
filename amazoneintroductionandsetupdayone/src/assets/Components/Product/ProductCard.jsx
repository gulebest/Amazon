import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from '../../../Utility/action.type';
import classes from './ProductCard.module.css';

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  if (!product) return null;

  const { image, title, id, rating, price, description } = product;
  const { state, dispatch } = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description }
    });
  };

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

        {flex && (
          <p className={classes.description}>
            {description || "No description available."}
          </p>
        )}

        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
