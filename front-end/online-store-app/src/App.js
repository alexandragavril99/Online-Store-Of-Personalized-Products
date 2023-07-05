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
import Statistics from "./pages/Statistics";
import { ToastContainer, toast } from "react-toastify";
import DiscountProducts from "./pages/DiscountProducts";
import "react-toastify/dist/ReactToastify.css";
import NewProducts from "./pages/NewProducts";
import OrderHistory from "./pages/OrderHistory";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/details" element={<ProductDetails />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="checkout-success" element={<CheckoutSuccess />} />
        <Route path="/discount" element={<DiscountProducts />} />
        <Route path="/new" element={<NewProducts />} />
        <Route path="/history" element={<OrderHistory />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
