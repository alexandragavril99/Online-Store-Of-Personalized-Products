import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorite from "./pages/Favorite";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Delivery from "./pages/Delivery";
import Payment from "./pages/Payment";
import CheckoutSuccess from "./pages/CheckoutSuccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/details" element={<ProductDetails />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="checkout-success" element={<CheckoutSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
