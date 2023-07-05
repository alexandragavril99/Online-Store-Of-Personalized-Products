import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import emailjs from "emailjs-com";

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
        const emailContent = {
          to_name: "Alexandra Gavril",
          to_address_street: "Aleea Soarelui 121, Bl.12",
          to_address_postalCode: "12121",
          to_address_county: "Bucuresti",
          to_address_city: "Bucuresti",
        };
        axios
          .delete("http://localhost:8081/api/cart/removeAllProductsFromCart", {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            // emailjs
            //   .send(
            //     "service_hl38kq9",
            //     "template_pvsd09n",
            //     emailContent,
            //     "Y1BcrIjd_XtP_xJo4"
            //   )
            //   .then(
            //     function (response) {
            //       console.log("SUCCESS!", response.status, response.text);
            //     },
            //     function (error) {
            //       console.log("FAILED...", error);
            //     }
            //   );
          })
          .catch((err) => console.log(err));
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
