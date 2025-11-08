import React, { useEffect, useState } from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import classes from './results.module.css';

function Results() {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // fixed initialization
    const { categoryName } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true); // start loading
            try {
                const encodedCategory = encodeURIComponent(categoryName);
                const res = await axios.get(`${productUrl}/products/category/${encodedCategory}`);
                setResults(res.data);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setIsLoading(false); // stop loading
            }
        };

        fetchProducts();
    }, [categoryName]);

    return (
        <LayOut>
            <section>
                <h1 style={{ padding: "30px" }}>Results</h1>
                <p style={{ padding: "30px" }}>Category / {categoryName}</p>
                <hr />
                <div className={classes.products_container}>
                    {isLoading ? (
                        <p style={{ padding: "30px" }}>Loading products...</p>
                    ) : results.length > 0 ? (
                        results.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                renderDesc={false}
                                renderAdd={true}
                            />
                        ))
                    ) : (
                        <p style={{ padding: "30px" }}>No products found.</p>
                    )}
                </div>
            </section>
        </LayOut>
    );
}

export default Results;
