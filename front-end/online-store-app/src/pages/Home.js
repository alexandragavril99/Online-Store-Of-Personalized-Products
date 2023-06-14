import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import NavbarMenu from "../components/NavbarMenu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";

const cardStyles = {
  productContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "70%",
  },
  menuContainer: {
    width: "220px",
    margin: "3% 5% 0 8%",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "'Montserrat', sans-serif",
  },
  lbFilter: {
    marginLeft: "20px",
    fontWeight: "500",
  },
  divLbFilter: {
    background:
      "-webkit-linear-gradient(left, #9a044c, #9a044c 3%, #f8f9fa 3%, #f8f9fa)",
    height: "35px",
    alignItems: "center",
    display: "flex",
  },
};

function Home() {
  const [productArray, setProductArray] = useState([]);
  const [orderChecked, setOrderChecked] = React.useState([]);
  const [priceChecked, setPriceChecked] = React.useState([]);
  const [featureChecked, setFeatureChecked] = React.useState([]);
  const orderStrings = ["Ascending price", "Descending price"];
  const priceString = [
    "Under 50 lei",
    "50-100 lei",
    "100-200 lei",
    "Above 200 lei",
  ];
  const featureString = ["Only text", "Upload picture"];

  const handleToggleOrder = (value) => () => {
    const currentIndex = orderChecked.indexOf(value);
    const newChecked = [...orderChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setOrderChecked(newChecked);
  };

  const handleTogglePrice = (value) => () => {
    const currentIndex = priceChecked.indexOf(value);
    const newChecked = [...priceChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setPriceChecked(newChecked);
  };

  const handleToggleFeature = (value) => () => {
    const currentIndex = featureChecked.indexOf(value);
    const newChecked = [...featureChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setFeatureChecked(newChecked);
  };

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
        <div style={cardStyles.menuContainer}>
          <div style={cardStyles.divLbFilter}>
            <label style={cardStyles.lbFilter}>Choose order</label>
          </div>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {orderStrings.map((customString, index) => {
              const labelId = `checkbox-list-label-${index}`;

              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggleOrder(index)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={orderChecked.indexOf(index) !== -1}
                        tabIndex={-1}
                        disableRipple
                        style={{ color: "#9a044c" }}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={customString}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <div style={cardStyles.divLbFilter}>
            <label style={cardStyles.lbFilter}>Choose price</label>
          </div>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {priceString.map((customString, index) => {
              const labelId = `checkbox-list-label-${index}`;

              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={handleTogglePrice(index)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={priceChecked.indexOf(index) !== -1}
                        tabIndex={-1}
                        disableRipple
                        style={{ color: "#9a044c" }}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={customString} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <div style={cardStyles.divLbFilter}>
            <label style={cardStyles.lbFilter}>Choose feature</label>
          </div>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {featureString.map((customString, index) => {
              const labelId = `checkbox-list-label-${index}`;

              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggleFeature(index)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={featureChecked.indexOf(index) !== -1}
                        tabIndex={-1}
                        disableRipple
                        style={{ color: "#9a044c" }}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={customString} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <div
            style={{ display: "flex", alignItems: "center", marginLeft: "5px" }}
          >
            <IconButton style={{ color: "#9a044c" }}>
              <HighlightOffIcon />
            </IconButton>
            <div style={{ fontWeight: "500" }}> Delete filters</div>
          </div>
        </div>
        <div style={cardStyles.productContainer}>
          {productArray.map((data, index) => (
            <ProductCard key={index} data={data} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
