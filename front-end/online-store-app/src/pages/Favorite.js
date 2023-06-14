import React, { useState, useEffect } from "react";
import NavbarMenu from "../components/NavbarMenu";
import axios from "axios";
import ProductCardFavorite from "../components/ProductCardFavorite";

const cardStyles = {
  productContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  },

  container: {},
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
