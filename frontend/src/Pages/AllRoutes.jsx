import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { Home } from "./Home";
import { ContactUs } from "./ContactUs";
import { Bag } from "./Bag";
import { Account } from "./Account";
import { PrivateRoute } from "./PrivateRoute";
import Product from "./Product";
import TestingComponent from "./TestingComponent";
// import TestingComponent2 from "./TestingComponent2";

const ProductPage = () => {
    const { productId } = useParams();
    return <TestingComponent productId={productId} />;
};

export const AllRoutes = ({ query }) => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/account" element={<Account />} />
            <Route path="/products" element={<Product query={query} />} />
            {/* <Route path="/products" element={<TestingComponent2 />} /> */}
            <Route element={<PrivateRoute />}>
                <Route path="/bag" element={<Bag />} />
            </Route>

            <Route path="/products/:productId" element={<ProductPage />} />
        </Routes>
    );
};
