import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './product.module.css';
import Loader from '../Loader/Loader';

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false); // ✅ use setIsLoading
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // ✅ use setIsLoading
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products__container}>
          {products?.map((singleProduct) => (
            <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
