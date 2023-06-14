import React, { useState, useEffect } from "react";
import NavbarMenu from "../components/NavbarMenu";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { SwatchesPicker } from "react-color";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";

const productDetailStyles = {
  productContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },

  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
};

function ProductDetails() {
  const { state } = useLocation();
  const product = state.product;
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [value, setValue] = React.useState(2);

  const handleColorPickerButton = () => {
    setIsColorPickerOpen(true);
  };

  return (
    <>
      <NavbarMenu />
      <div style={productDetailStyles.container}>
        <div>
          <img src={product.image} alt="Product" width="600px" />
        </div>
        <div>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ textAlign: "center" }}
          >
            {product.name}
          </Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <div>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                handleColorPickerButton();
              }}
              style={{ height: "40px" }}
            >
              Choose shirt color
            </Button>
            <div
              style={{
                position: "relative",
                bottom: "65px",
                left: "190px",
              }}
            >
              {isColorPickerOpen && (
                <SwatchesPicker
                  width="200px"
                  onChange={(color) => {
                    // Manipulează schimbările de culoare aici
                    setIsColorPickerOpen(false);
                    console.log(color);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
