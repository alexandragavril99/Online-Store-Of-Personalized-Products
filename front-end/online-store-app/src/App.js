import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorite from "./pages/Favorite";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
