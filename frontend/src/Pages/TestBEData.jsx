import React, { useEffect, useState } from "react";
import axios from "axios";

function TestBEData({ productId }) {
    const [bedata, setProducts] = useState();
    useEffect(() => {
        axios
            .get(`http://localhost:8000/products/${productId}`)
            .then((res) => {
                setProducts(res.data);
                console.log(res.data);
            })
            .then((err) => {
                console.log("There was an error fetching the products!", err);
            });
    }, []);
    return <div style={{ backgroundColor: "white", width: "50%", height: "50%", margin: "auto", textAlign: "center" }}>{bedata}</div>;
}

export default TestBEData;
