import React, { useEffect, useState } from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import classes from './results.module.css';

function Results() {
    const [results, setResults] = useState([]);
    const { categoryName } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Encode the category for the URL to handle spaces and apostrophes
                const encodedCategory = encodeURIComponent(categoryName);
                const res = await axios.get(`${productUrl}/products/category/${encodedCategory}`);
                setResults(res.data);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        fetchProducts();
    }, [categoryName]); // Re-fetch if the category changes

    return (
        <LayOut>
            <section>
                <h1 style={{ padding: "30px" }}>Results</h1>
                <p style={{ padding: "30px" }}>Category / {categoryName}</p>
                <hr />
                <div className={classes.products_container}>
                    {results.length > 0 ? (
                        results.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))
                    ) : (
                        <p style={{ padding: "30px" }}></p>
                    )}
                </div>
            </section>
        </LayOut>
    );
}

export default Results;
