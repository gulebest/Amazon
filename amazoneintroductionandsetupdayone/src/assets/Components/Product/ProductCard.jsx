import React from 'react'
import Rating from '@mui/material/Rating'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import classes from "./Product.module.css";
import { fabClasses } from '@mui/material/Fab';
function ProductCard({ product }) {
    const {image, title, id, rating, price}=product;
  return (
    <div className={classes.card__container}>
        <a href="">
            <img src={image} alt="" />
        </a>
        <div>
            <h3> {title}</h3>
            <div className={classes.rating}>
                <Rating value={rating?.rate ?? "No rating"} precision={0.1}/>
                {/*count*/}
                <small>{rating?.count ??"N/A"}</small>
            </div>
            <div>
                   {/*price*/}
                   <CurrencyFormat amount={price}/>
            </div>
            <button className={classes.button}>
                add to start
            </button>
        </div>
    </div>
  )
}

export default ProductCard