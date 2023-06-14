import React, { useState, useEffect } from "react";
import axios from "axios";

function CheckoutSuccess() {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const data = urlParams.get("data");
    const successData = JSON.parse(decodeURIComponent(data));

    console.log(successData);
    axios
      .get(`http://localhost:8081/api/order/getOrderById/${successData}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        // axios
        //   .put(
        //     `http://localhost:8081/api/order/updateOrderSuccess/${successData}`,
        //     {},
        //     { withCredentials: true }
        //   )
        //   .then((res) => {
        //     console.log(res.data);
            axios
              .delete(
                "http://localhost:8081/api/cart/removeAllProductsFromCart",
                {
                  withCredentials: true,
                }
              )
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
        //   })
        //   .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h2>Checkout success!</h2>
    </>
  );
}

export default CheckoutSuccess;
