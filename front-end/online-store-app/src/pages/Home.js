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
  const [originalProductArray, setOriginalProductArray] = useState([]);
  const [orderChecked, setOrderChecked] = React.useState("");
  const [priceChecked, setPriceChecked] = React.useState("");
  const [featureChecked, setFeatureChecked] = React.useState("");
  const [discount, setDiscount] = React.useState(0.1);
  const [isLoaded, setIsLoaded] = useState(false);

  const orderStrings = ["Ascending price", "Descending price"];
  const priceString = [
    "Under 50 lei",
    "50-100 lei",
    "100-200 lei",
    "Above 200 lei",
  ];
  const featureString = ["Only text", "Upload picture"];

  const handleToggleOrder = (value) => () => {
    if (orderChecked === value) {
      setOrderChecked("");
    } else {
      setOrderChecked(value);
    }
  };

  const handleTogglePrice = (value) => () => {
    if (priceChecked === value) {
      setPriceChecked("");
    } else {
      setPriceChecked(value);
    }
  };

  const handleToggleFeature = (value) => () => {
    if (featureChecked === value) {
      setFeatureChecked("");
    } else {
      setFeatureChecked(value);
    }
  };

  const handleDeleteFilters = () => {
    setOrderChecked("");
    setPriceChecked("");
    setFeatureChecked("");
  };

  const filter = () => {
    let filteredProductArray = [...originalProductArray];

    if (priceChecked !== "") {
      filteredProductArray = filteredProductArray.filter((element) => {
        const price = element.label.includes("discount")
          ? element.price - discount * element.price
          : element.price;

        if (
          (priceChecked.includes(priceString[0]) && price <= 50) ||
          (priceChecked.includes(priceString[1]) &&
            price >= 50 &&
            price <= 100) ||
          (priceChecked.includes(priceString[2]) &&
            price >= 100 &&
            price <= 200) ||
          (priceChecked.includes(priceString[3]) && price >= 200)
        ) {
          return element;
        }
      });
    }

    if (orderChecked === orderStrings[0]) {
      filteredProductArray.sort((a, b) => {
        const priceA = a.label.includes("discount")
          ? a.price - discount * a.price
          : a.price;
        const priceB = b.label.includes("discount")
          ? b.price - discount * b.price
          : b.price;
        return priceA - priceB;
      });
    } else if (orderChecked === orderStrings[1]) {
      filteredProductArray.sort((a, b) => {
        const priceA = a.label.includes("discount")
          ? a.price - discount * a.price
          : a.price;
        const priceB = b.label.includes("discount")
          ? b.price - discount * b.price
          : b.price;
        return priceB - priceA;
      });
    }

    if (featureChecked.includes(featureString[0])) {
      filteredProductArray = filteredProductArray.filter((element) => {
        return element.label.includes("text");
      });
    } else if (featureChecked.includes(featureString[1])) {
      filteredProductArray = filteredProductArray.filter((element) => {
        return element.label.includes("picture");
      });
    }

    setProductArray([...filteredProductArray]);
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:8081/api/product/getAllProducts")
      .then((res) => {
        console.log(res.data);
        setProductArray(res.data);
        setOriginalProductArray(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      filter();
    }
  }, [orderChecked, priceChecked, featureChecked, isLoaded]);

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
                    onClick={handleToggleOrder(customString)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={orderChecked === customString}
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
                    onClick={handleTogglePrice(customString)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={priceChecked === customString}
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
                    onClick={handleToggleFeature(customString)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={featureChecked === customString}
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
            <IconButton
              style={{ color: "#9a044c" }}
              onClick={() => handleDeleteFilters()}
            >
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
