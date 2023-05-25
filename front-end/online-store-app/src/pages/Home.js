import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import NavbarMenu from "../components/NavbarMenu";

const cardStyles = {
  productContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  menuContainer: {
    width: "400px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
};

function Home() {
  const [productArray, setProductArray] = useState([]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:8081/api/product/getAllProducts", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setProductArray(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <NavbarMenu />
      <div style={cardStyles.container}>
        <div style={cardStyles.menuContainer}>Menu content</div>
        <div style={cardStyles.productContainer}>
          {productArray.map((data, index) => (
            <ProductCard key={index} data={data}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
