import React, { useEffect, useState } from "react";
import axios from "axios";

function TestingComponent({ productId }) {
    const [productMessage, setProductMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (productId) {
            axios
                .get(`http://localhost:8000/products/${productId}`)
                .then((res) => {
                    setProductMessage(res.data);
                    console.log(res.data);
                })
                .catch((err) => {
                    setError("There was an error fetching the product!");
                    console.log(err);
                });
        }
    }, [productId]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!productMessage) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ backgroundColor: "white", width: "50%", height: "50%", margin: "auto", textAlign: "center" }}>
            <h1>Product Details</h1>
            <p>{productMessage}</p>
        </div>
    );
}

export default TestingComponent;
