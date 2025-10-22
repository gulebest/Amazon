import React, { useEffect, useState } from 'react';
import classes from './productDetail.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader'; // ✅ IMPORT ADDED

function ProductDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [productId]);

  return (
    <LayOut>
      {isLoading ? <Loader /> : <ProductCard product={product} />}
    </LayOut>
  );
}

export default ProductDetail;
