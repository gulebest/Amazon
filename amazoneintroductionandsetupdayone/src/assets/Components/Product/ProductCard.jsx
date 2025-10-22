import React from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import classes from "./Product.module.css";
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    // If product is undefined or null, render nothing
    if (!product) return null;

    const { image, title, id, rating, price } = product;

    // If essential fields are missing, render nothing
    if (!id || !title || !image) return null;

    return (
        <div className={classes.card__container}>
            <Link to={`/products/${id}`}>
                <img src={image} alt={title} />
            </Link>
            <div>
                <h3>{title}</h3>
                <div className={classes.rating}>
                    <Rating value={rating?.rate ?? 0} precision={0.1} readOnly />
                    <small>{rating?.count ?? "N/A"}</small>
                </div>
                <div>
                    <CurrencyFormat amount={price} />
                </div>
                <button className={classes.button}>
                    add to cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
