import * as React from "react";
import NavbarMenu from "../components/NavbarMenu";
import { useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const cartStyles = {
  productContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },

  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Montserrat', sans-serif",
  },

  listItem: {
    width: "900px",
  },

  priceContainer: {
    margin: "0 auto",
    textAlign: "right",
    width: "900px",
  },

  priceItem: {
    display: "flex",
    justifyContent: "flex-end",
  },

  font: {
    fontFamily: "Monserrat, sans-serif",
  },

  header: {
    paddingTop: "30px",
    paddingBottom: "10px",
    fontSize: "x-large",
    fontWeight: "500",
    textAlign: "center",
  },
};

function Cart() {
  const [open, setOpen] = React.useState([]);
  const [productArray, setProductArray] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const navigate = useNavigate();
  const [personalization, setPersonalization] = React.useState([]);

  const handleClick = (index) => {
    const updatedOpen = [...open];
    updatedOpen[index] = !updatedOpen[index];
    setOpen(updatedOpen);
  };

  const handleSelectChange = (event, index) => {
    const newProductArray = [...productArray];
    newProductArray[index].orderedQuantity = event.target.value;
    setProductArray(newProductArray);
    let price = 0;
    newProductArray.map((data, index) => {
      if (!data.product.label.includes("discount")) {
        price += data.product.price * data.orderedQuantity;
      } else {
        price +=
          (data.product.price - 0.1 * data.product.price) *
          data.orderedQuantity;
      }
    });
    setTotalPrice(price);
    sessionStorage.setItem("totalPrice", price);
    axios
      .put(
        `http://localhost:8081/api/cart/updateProductQuantityFromCart/${newProductArray[index]._id}`,
        { orderedQuantity: event.target.value },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteButton = (index) => {
    const newProductArray = [...productArray];
    const productId = newProductArray[index]._id;
    newProductArray.splice(index, 1);
    setProductArray(newProductArray);
    let price = 0;
    newProductArray.map((data, index) => {
      if (!data.product.label.includes("discount")) {
        price += data.product.price * data.orderedQuantity;
      } else {
        price +=
          (data.product.price - 0.1 * data.product.price) *
          data.orderedQuantity;
      }
    });
    setTotalPrice(price);
    sessionStorage.setItem("totalPrice", price);
    axios
      .delete(
        `http://localhost:8081/api/cart/deleteProductFromCart/${productId}`,
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/cart/getProductsFromCart", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        let data = res.data;
        data.map((obj, index) => {
          if (obj.personalization) {
            obj.personalization = JSON.parse(obj.personalization[0]);
          }
        });
        setProductArray(data);
        setOpen(Array(res.data.length).fill(false));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let price = 0;
    productArray.forEach((data, index) => {
      if (!data.product.label.includes("discount")) {
        price += data.product.price * data.orderedQuantity;
      } else {
        price +=
          (data.product.price - 0.1 * data.product.price) *
          data.orderedQuantity;
      }
    });
    setTotalPrice(price);
    sessionStorage.setItem("totalPrice", price);
  }, [productArray]);

  return (
    <>
      <NavbarMenu />
      <Typography style={(cartStyles.container, cartStyles.header)}>
        Shopping Cart
      </Typography>
      <Box style={cartStyles.container}>
        <Grid item xs={12} md={6}>
          <Demo>
            <List style={cartStyles.listItem} className="border-bottom">
              {productArray &&
                productArray.map((data, index) => (
                  <div key={index} className="border-top">
                    <ListItem
                      style={{
                        display: "grid",
                        gridTemplateColumns: "3fr 1fr 1fr 1fr 0fr",
                      }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteButton(index)}
                          style={{ color: "#9a044c" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <div style={cartStyles.container}>
                        <div
                          style={{
                            width: "100px",
                            height: "100px",
                            marginRight: "15px",
                          }}
                        >
                          <img
                            src={`product_pictures/${data.product.image}`}
                            alt="Product"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>

                        <ListItemText
                          primary={data.product.name}
                          secondary={data.product.description}
                          style={cartStyles.font}
                        />
                      </div>

                      {!data.product.label.includes("discount") && (
                        <ListItemText primary={data.product.price + " RON"} />
                      )}

                      {data.product.label.includes("discount") && (
                        <ListItemText
                          primary={
                            (
                              data.product.price -
                              data.product.price * 0.1
                            ).toFixed(2) + " RON"
                          }
                        />
                      )}
                      <select
                        className="form-select"
                        style={{ width: "100px" }}
                        defaultValue={data.orderedQuantity}
                        onChange={(event) => handleSelectChange(event, index)}
                      >
                        <option value="1">1 item</option>
                        <option value="2">2 items</option>
                        <option value="3">3 items</option>
                        <option value="4">4 items</option>
                        <option value="5">5 items</option>
                        <option value="6">6 items</option>
                        <option value="7">7 items</option>
                        <option value="8">8 items</option>
                        <option value="9">9 items</option>
                        <option value="10">10 items</option>
                      </select>
                      {!data.product.label.includes("discount") && (
                        <ListItemText
                          primary={
                            (data.product.price * data.orderedQuantity).toFixed(
                              2
                            ) + " RON"
                          }
                        />
                      )}
                      {data.product.label.includes("discount") && (
                        <ListItemText
                          primary={
                            (
                              (data.product.price - 0.1 * data.product.price) *
                              data.orderedQuantity
                            ).toFixed(2) + " RON"
                          }
                        />
                      )}
                      {open[index] ? (
                        <ExpandLess
                          onClick={() => {
                            handleClick(index);
                          }}
                        />
                      ) : (
                        <ExpandMore
                          onClick={() => {
                            handleClick(index);
                          }}
                        />
                      )}
                    </ListItem>
                    <Collapse in={open[index]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton
                          sx={{
                            pl: 4,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {data.personalization &&
                            data.personalization.map((obj, index) => {
                              return (
                                <ListItem key={index} disablePadding>
                                  {obj.text && (
                                    <Typography
                                      variant="subtitle-2"
                                      gutterBottom
                                      style={{
                                        fontFamily: "'Montserrat', sans-serif",
                                      }}
                                    >
                                      Personalized text: {obj.text}
                                    </Typography>
                                  )}

                                  {obj.size && (
                                    <Typography
                                      variant="subtitle-2"
                                      gutterBottom
                                      style={{
                                        fontFamily: "'Montserrat', sans-serif",
                                      }}
                                    >
                                      Selected size: {obj.size}
                                    </Typography>
                                  )}

                                  {obj.image && (
                                    <Typography
                                      variant="subtitle-2"
                                      gutterBottom
                                      style={{
                                        fontFamily: "'Montserrat', sans-serif",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      Selected picture:
                                      {obj.image && (
                                        <div className="cropped-image-container">
                                          {obj.image && (
                                            <img
                                              className="cropped-image"
                                              src={`product_pictures/${obj.image}`}
                                              alt="cropped"
                                              height={50}
                                              style={{ margin: "10px" }}
                                            />
                                          )}
                                        </div>
                                      )}
                                    </Typography>
                                  )}
                                </ListItem>
                              );
                            })}
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </div>
                ))}
            </List>
            {productArray.length === 0 && (
              <Typography style={(cartStyles.container, cartStyles.header)}>
                No products in shopping cart.
              </Typography>
            )}
          </Demo>
        </Grid>
      </Box>
      {productArray.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "25%",
            marginTop: "2%",
          }}
        >
          <label
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: "500",
            }}
          >
            Insert voucher
          </label>
          <div class="input-group" style={{ width: "300px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Insert here your voucher"
              aria-describedby="basic-addon2"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                style={{
                  borderRadius: "0 5px 5px 0",
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      <div style={cartStyles.priceContainer}>
        <Typography
          sx={{ mt: 4, mb: 2 }}
          variant="h6"
          component="div"
          style={(cartStyles.priceItem, cartStyles.font)}
        >
          Total price: {totalPrice.toFixed(2)} RON
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "3%",
          marginBottom: "3%",
        }}
      >
        <Button
          variant="contained"
          style={{ background: "#9a044c" }}
          onClick={() => navigate("/home")}
        >
          Back to shopping
        </Button>
        <Button
          variant="contained"
          style={{ background: "#9a044c" }}
          onClick={() =>
            navigate("/delivery", { state: { cartProducts: productArray } })
          }
        >
          Order
        </Button>
      </div>
    </>
  );
}

export default Cart;
