import React, { useState, useEffect } from "react";
import NavbarMenu from "../components/NavbarMenu";
import axios from "axios";
import ProductCardFavorite from "../components/ProductCardFavorite";
import { Typography } from "@mui/material";

const cardStyles = {
  productContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    fontFamily: "'Montserrat', sans-serif"
  },
  header: {
    paddingTop: "30px",
    paddingBottom: "10px",
    fontSize: "x-large",
    fontWeight: "500",
    textAlign: "center",
  },
};


function Favorite() {
  const [productArray, setProductArray] = useState([]);

  const onChangeProductArray = (data) => {
    const newProductArray = productArray.filter(
      (product) => product.id !== data.productId
    );
    setProductArray(newProductArray);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/favorite/getFavorites", {
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
      <Typography style={(cardStyles.container, cardStyles.header)}>
        Favorite Products
      </Typography>
      <div style={cardStyles.container}>
        <div style={cardStyles.productContainer}>
          {productArray.map((data, index) => (
            <ProductCardFavorite
              key={index}
              data={data}
              onChangeProductArray={onChangeProductArray}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Favorite;
