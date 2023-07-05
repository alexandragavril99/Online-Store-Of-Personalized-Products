import React, { useState, useEffect } from "react";
import NavbarMenu from "../components/NavbarMenu";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Typography } from "@mui/material";

const cardStyles = {
  productContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "70%",
  },
  header: {
    paddingTop: "30px",
    paddingBottom: "10px",
    fontSize: "x-large",
    fontWeight: "500",
    textAlign: "center",
  },
};

function DiscountProducts() {
  const [productArray, setProductArray] = useState([]);
  const [discountArray, setDiscountArray] = useState([]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:8081/api/product/getAllProducts")
      .then((res) => {
        console.log(res.data);
        setProductArray(res.data);
        let discountProducts = [];
        res.data.map((obj, index) => {
          if (obj.label.includes("discount")) {
            discountProducts.push(obj);
          }
        });
        setDiscountArray(discountProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <NavbarMenu />
      <Typography style={(cardStyles.container, cardStyles.header)}>
        Products with discounts!
      </Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={cardStyles.productContainer}>
          {discountArray.map((data, index) => (
            <ProductCard key={index} data={data} />
          ))}
        </div>
      </div>
    </>
  );
}

export default DiscountProducts;
