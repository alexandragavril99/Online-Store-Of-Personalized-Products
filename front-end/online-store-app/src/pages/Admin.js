import NavbarMenu from "../components/NavbarMenu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as React from "react";

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

const cardStyles = {
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    fontFamily: "'Montserrat', sans-serif",
  },
  input: {
    margin: "10px",
    width: "300px",
  },
};

function Admin() {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  
  const navigate = useNavigate();

  return (
    <>
      <NavbarMenu />
      <Typography style={(cartStyles.container, cartStyles.header)}>
        Add new product
      </Typography>
      <Box
        sx={{
          height: "100vh",
        }}
        className="center-element"
      >
        <Card
          sx={{
            width: "60%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <form>
            <CardContent className="center-element">
              <TextField
                label="Product name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={cardStyles.input}
                color="secondary"
              />
              {/* <TextField
              label="Password"
              name="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              style={cardStyles.input}
              color="secondary"
            /> */}
            </CardContent>
            <CardActions className="center-element">
              <Button variant="contained" type="submit">
                LogIn
              </Button>
            </CardActions>
          </form>
        </Card>
      </Box>
    </>
  );
}

export default Admin;
