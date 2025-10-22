import React, { useEffect, useState } from 'react';
import classes from './productDetail.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null); 

  useEffect(() => {
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);

  return (
    <LayOut>
      {/* Only render ProductCard if product is loaded */}
      {product ? <ProductCard product={product} /> : <p>Loading...</p>}
    </LayOut>
  );
}

export default ProductDetail;
