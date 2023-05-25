import * as React from "react";
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
import LoginIcon from "../assets/login-icon.svg";
import theme from "../theme";
import { ThemeProvider } from "@emotion/react";
import Typography from "@mui/material/Typography";

const cardStyles = {
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  input: {
    margin: "10px",
    width: "300px",
  },
};

function Register() {
  let [firstName, setFirstName] = React.useState("");
  let [lastName, setLastName] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      isAdmin: false,
    };

    axios
      .post(`http://localhost:8081/api/user/register`, user)
      .then((res) => {
        console.log(res);
        toast.success("Account created!", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
        });
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Incorrect data entered. Try again!", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
        });
      });
  };

  return (
    <Box
      sx={{
        height: "100vh",
      }}
      className="center-element"
    >
      <ThemeProvider theme={theme}>
        <Card
          sx={{
            width: "60%",
            display: "flex",
          }}
        >
          <img src={LoginIcon} alt="Login Icon" width={"50%"} />
          <form onSubmit={handleSubmit} style={cardStyles.inputContainer}>
            <CardContent className="center-element">
              <Typography
                sx={{ fontSize: 18, color: "#802c80", padding: "10px" }}
              >
                CREATE AN ACCOUNT
              </Typography>
              <TextField
                label="Firstname"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={cardStyles.input}
                color="secondary"
              />
              <TextField
                label="Lastname"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={cardStyles.input}
                color="secondary"
              />
              <TextField
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={cardStyles.input}
                color="secondary"
              />
              <TextField
                label="Password"
                name="password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                style={cardStyles.input}
                color="secondary"
              />
            </CardContent>
            <CardActions className="center-element">
              <Button variant="contained" type="submit">
                Sign Up
              </Button>
              <div style={{ margin: 0, marginTop: 10 }}>
                <label>Already have an account?</label>
                <Button onClick={() => navigate("/login")}>Login</Button>
              </div>
            </CardActions>
          </form>
        </Card>
      </ThemeProvider>
      <ToastContainer />
    </Box>
  );
}

export default Register;
