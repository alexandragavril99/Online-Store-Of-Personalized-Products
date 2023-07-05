import * as React from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import theme from "../theme";
import { ThemeProvider } from "@emotion/react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const cardStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    margin: "10px",
    width: "400px",
    border: "#802c80",
  },
};

function AddressForm(props) {
  let [surname, setSurname] = React.useState("");
  let [name, setName] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [phone, setPhone] = React.useState("");
  let [county, setCounty] = React.useState("");
  let [city, setCity] = React.useState("");
  let [street, setStreet] = React.useState("");
  let [postalCode, setPostalCode] = React.useState("");
  let [otherInfo, setOtherInfo] = React.useState("");

  const handleSubmit = () => {
    props.onSubmitAddressForm({
      surname: surname,
      name: name,
      email: email,
      phone: phone,
      county: county,
      city: city,
      street: street,
      postalCode: postalCode,
      otherInfo: otherInfo,
    });
  };

  React.useEffect(() => {
    console.log(props);
  });

  // const handleCheckout = () => {
  //   const newProducts = products.map((item) => {
  //     return {
  //       name: item.product.name,
  //       price: item.product.price,
  //       description: item.product.description,
  //       orderedQuantity: item.orderedQuantity,
  //     };
  //   });
  //   //  const newProducts = {};

  //   console.log(products);
  //   console.log(newProducts);
  //   axios
  //     .post(
  //       "http://localhost:8081/api/stripe/create-checkout-session",
  //       {
  //         newProducts,
  //       },
  //       { withCredentials: true }
  //     )
  //     .then((res) => {
  //       console.log(res.data.url);
  //       if (res.data.url) {
  //         window.location.href = res.data.url;
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <>
      <div className="row">
        <div
          className="col-sm"
          style={{
            textAlign: "center",
            marginTop: "3%",
            fontFamily: "'Montserrat, sans-serif",
          }}
        >
          <h3>Information about you</h3>
          <div style={cardStyles.container}>
            <ThemeProvider theme={theme}>
              <TextField
                label="Surname"
                name="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                style={cardStyles.input}
                color="secondary"
                size="small"
              />
              <TextField
                label="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={cardStyles.input}
                color="secondary"
                size="small"
              />
              <TextField
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={cardStyles.input}
                color="secondary"
                size="small"
              />
              <TextField
                label="Phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={cardStyles.input}
                color="secondary"
                size="small"
              />
              <TextField
                label="County"
                name="county"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                style={cardStyles.input}
                color="secondary"
                size="small"
              />
              <TextField
                label="City"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={cardStyles.input}
                color="secondary"
                size="small"
              />
              <TextField
                label="Street and number"
                name="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                style={cardStyles.input}
                color="secondary"
                size="small"
              />
              <TextField
                label="Postal code"
                name="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                style={cardStyles.input}
                color="secondary"
                size="small"
              />
              <TextField
                label="Other info"
                name="otherInfo"
                value={otherInfo}
                onChange={(e) => setOtherInfo(e.target.value)}
                style={cardStyles.input}
                color="secondary"
                size="small"
              />
            </ThemeProvider>
          </div>
          <FormControlLabel
            control={<Checkbox />}
            label="I want a new delivery address"
          />
        </div>
        <div
          className="col-sm"
          style={{
            textAlign: "center",
            marginTop: "3%",
            fontFamily: "'Montserrat, sans-serif",
            paddingRight: 0,
          }}
        >
          <h3 style={{ textAlign: "left", paddingLeft: "25%" }}>
            Shopping cart
          </h3>
          <List sx={{ width: "600px", bgcolor: "background.paper" }}>
            {props.data.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem
                  alignItems="center"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  }}
                >
                  <div
                    style={{
                      marginRight: "15px",
                    }}
                  >
                    <div>
                      <img
                        src={`product_pictures/${item.product.image}`}
                        alt="Product"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>
                  <ListItemText
                    primary={item.product.name}
                    secondary={item.product.description}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />

                  <ListItemText
                    primary={item.product.price * item.orderedQuantity + " RON"}
                  />
                  <ListItemText
                    secondary={item.orderedQuantity + " pcs."}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                </ListItem>
                <Divider
                  variant="inset"
                  component="li"
                  style={{ left: "-55px", position: "relative" }}
                />
              </React.Fragment>
            ))}
          </List>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "450px",
              marginLeft: "20px",
            }}
          >
            <label>Delivery: </label>
            <label>free</label>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "450px",
              marginLeft: "20px",
            }}
          >
            <label>Payment: </label>
            <label>free</label>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "450px",
              marginLeft: "20px",
            }}
          >
            <label style={{ fontWeight: "600" }}>Total price: </label>
            <label style={{ fontWeight: "600" }}>264.54 RON</label>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "3%",
          marginBottom: "3%",
        }}
      >
        <Button variant="contained" style={{ background: "#9a044c" }}>
          Return to delivery and payment
        </Button>
        <Button
          variant="contained"
          style={{ background: "#9a044c" }}
          onClick={() => handleSubmit()}
        >
          Order now
        </Button>
      </div>
    </>
  );
}

export default AddressForm;
