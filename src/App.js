import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import Products from "./components/Products";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import BasketProductDetails from "./components/BasketProductDetails";
import Donate from "./components/Donate";
import AdminProducts from "./components/AdminProducts";
import ProductForm from "./components/ProductForm";


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:basketType" element={<BasketProductDetails />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/admin/products" element={<AdminProducts />}/>
        <Route path="/product/form" element={<ProductForm />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
