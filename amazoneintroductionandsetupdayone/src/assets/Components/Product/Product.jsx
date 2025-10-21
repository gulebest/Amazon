import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './product.module.css'
function Product() {
  const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
         .then((res)=>{
        setProducts(res.data)
         }).catch((err)=>{
            console.log(err)
         })
    }, []);
    
  return (
   <section className={classes.products__container}>
    {
        products.map((singleProduct)=>(
            <ProductCard product={singleProduct} key={singleProduct.id}/>
        ))
    }
   </section>
  )
}

export default Product