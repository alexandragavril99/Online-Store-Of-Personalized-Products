import React, { useState, useEffect } from "react";
import NavbarMenu from "../components/NavbarMenu";
import axios from "axios";
import DeliveryOptions from "../components/DeliveryOptions";
import AddressForm from "../components/AddressForm";

function Delivery() {
  const [step, setStep] = React.useState(1);
  const [products, setProducts] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState([]);

  const onChangeStep = (data) => {
    setStep(data.step);
  };

  const onSubmitAddressForm = (data) => {
    const newProducts = products.map((item) => {
      return {
        name: item.product.name,
        price: item.product.price,
        description: item.product.description,
        orderedQuantity: item.orderedQuantity,
      };
    });
    console.log(products);
    console.log(newProducts);

    const order = {
      surname: data.surname,
      name: data.name,
      email: data.email,
      phone: data.phone,
      street: data.street,
      postalCode: data.postalCode,
      otherInfo: data.otherInfo,
      products: newProducts,
      totalPrice: totalPrice,
    };
    axios
      .post("http://localhost:8081/api/order/createOrder", order, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const orderId = res.data.item._id;
        axios
          .post(
            "http://localhost:8081/api/stripe/create-checkout-session",
            {
              newProducts: newProducts,
              orderId: orderId,
            },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res.data.url);
            if (res.data.url) {
              window.location.href = res.data.url;
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/cart/getProductsFromCart", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        let productsFromCart = res.data;
        let price = 0;
        productsFromCart.map((item) => {
          price += item.product.price * item.orderedQuantity;
        });
        setTotalPrice(price);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <NavbarMenu />
      <div>{step === 1 && <DeliveryOptions onChangeStep={onChangeStep} />}</div>
      <div>
        {step === 2 && (
          <AddressForm onSubmitAddressForm={onSubmitAddressForm} data={products}/>
        )}
      </div>
    </>
  );
}

export default Delivery;
