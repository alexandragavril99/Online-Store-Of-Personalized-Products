import * as React from "react";
import NavbarMenu from "../components/NavbarMenu";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import axios from "axios";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import ListItemButton from "@mui/material/ListItemButton";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function OrderHistory() {
  const [orders, setOrders] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [currentOrder, setCurrentOrder] = React.useState(null);
  const [extend, setExtend] = React.useState([]);
  const [currentTotalPrice, setCurrentTotalPrice] = React.useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/order/getOrdersById", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (index) => {
    const updatedOpen = [...extend];
    updatedOpen[index] = !updatedOpen[index];
    setExtend(updatedOpen);
  };
  return (
    <>
      <div>
        <NavbarMenu />
        <Typography style={(cartStyles.container, cartStyles.header)}>
          Order history
        </Typography>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                fontFamily: "'Montserrat', sans-serif",
                margin: "15px",
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Order Summary
              </Typography>

              <Box style={cartStyles.container}>
                <Grid item xs={12} md={6}>
                  <List style={cartStyles.listItem} className="border-bottom">
                    {currentOrder &&
                      currentOrder.products &&
                      currentOrder.products.map((data, index) => (
                        <div key={index} className="border-top">
                          <ListItem
                            style={{
                              display: "grid",
                              gridTemplateColumns: "3fr 1fr 1fr 1fr 0fr",
                            }}
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
                                  src={`product_pictures/${data.image}`}
                                  alt="Product"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                  }}
                                />
                              </div>

                              <ListItemText
                                primary={data.name}
                                secondary={data.description}
                                style={cartStyles.font}
                              />
                            </div>

                            {data.label && !data.label.includes("discount") && (
                              <ListItemText primary={data.price + " RON"} />
                            )}

                            {data.label && data.label.includes("discount") && (
                              <ListItemText
                                primary={
                                  (data.price - data.price * 0.1).toFixed(2) +
                                  " RON"
                                }
                              />
                            )}

                            <ListItemText
                              primary={data.orderedQuantity + "pcs."}
                            />

                            {data.label && !data.label.includes("discount") && (
                              <ListItemText
                                primary={
                                  (data.price * data.orderedQuantity).toFixed(
                                    2
                                  ) + " RON"
                                }
                              />
                            )}
                            {data.label && data.label.includes("discount") && (
                              <ListItemText
                                primary={
                                  (
                                    (data.price - 0.1 * data.price) *
                                    data.orderedQuantity
                                  ).toFixed(2) + " RON"
                                }
                              />
                            )}
                            {extend[index] ? (
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
                          <Collapse
                            in={extend[index]}
                            timeout="auto"
                            unmountOnExit
                          >
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
                                              fontFamily:
                                                "'Montserrat', sans-serif",
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
                                              fontFamily:
                                                "'Montserrat', sans-serif",
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
                                              fontFamily:
                                                "'Montserrat', sans-serif",
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
                  <div style={cartStyles.priceContainer}>
                    <Typography
                      sx={{ mt: 4, mb: 2 }}
                      variant="h6"
                      component="div"
                      style={(cartStyles.priceItem, cartStyles.font)}
                    >
                      Total price: {currentTotalPrice.toFixed(2)} RON
                    </Typography>
                  </div>
                  {currentOrder && (
                    <div style={{ textAlign: "left" }}>
                      <strong>Customer Data:</strong> <br /> Name:{" "}
                      {currentOrder.name} {currentOrder.surname} <br />
                      Delivery Address: {currentOrder.street}{" "}
                      {currentOrder.postalCode}, {currentOrder.city},{" "}
                      {currentOrder.county} <br />
                      Phone: {currentOrder.phone} <br />
                      Email: {currentOrder.email}
                    </div>
                  )}
                </Grid>
              </Box>
            </div>
          </Box>
        </Modal>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "35%", height: 400, overflow: "auto" }}>
            <List
              sx={{ width: "100%", width: 500, bgcolor: "background.paper" }}
            >
              {orders &&
                orders.map((obj, index) => (
                  <ListItem
                    key={index}
                    disableGutters
                    secondaryAction={
                      <IconButton
                        style={{ color: "#9a044c" }}
                        onClick={() => {
                          setOpen(true);
                          let newObj = obj;
                          let price = 0;
                          newObj.products.map((x, index) => {
                            if (
                              x.personalization &&
                              typeof x.personalization[0] === "string"
                            ) {
                              x.personalization = JSON.parse(
                                x.personalization[0]
                              );
                            }
                            if (!x.label.includes("discount")) {
                              price += x.price * x.orderedQuantity;
                            } else {
                              price +=
                                (x.price - 0.1 * x.price) * x.orderedQuantity;
                            }
                          });
                          console.log(price);
                          setCurrentOrder(newObj);
                          setCurrentTotalPrice(price);
                        }}
                      >
                        <TravelExploreIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={`Order #${obj._id}`} />
                  </ListItem>
                ))}
            </List>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderHistory;
