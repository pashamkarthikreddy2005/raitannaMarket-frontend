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
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import AdminBaskets from "./components/AdminBaskets";
import AddBasket from "./components/AddBasket";
import UpdateBasket from "./components/UpdateBasket";


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
        <Route path="/user/cart" element={<Cart />}/>
        <Route path="/user/profile" element={<Profile />}/>
        <Route path="/admin/baskets" element={<AdminBaskets />}/>
        <Route path="/admin/basket/add/form" element={<AddBasket />}/>
        <Route path="/admin/basket/update/:id" element={<UpdateBasket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
