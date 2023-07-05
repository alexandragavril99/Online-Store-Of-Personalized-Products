import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_transparent.png";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import * as React from "react";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import PeopleIcon from "@mui/icons-material/People";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function NavbarMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    navigate("/history");
    setAnchorEl(null);
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/api/logout", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        toast.success("Logout successful!", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
        });
        navigate("/login");
        setAnchorEl(null);
      })
      .catch((err) => console.log(err));
  };

  const [user, setUser] = React.useState(null);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:8081/api/user/getUser")
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {user && !user.isAdmin && (
        <Navbar>
          <Container>
            <Navbar.Brand href="/home">
              <img
                src={logo}
                width={"100px"}
                style={{ position: "absolute", top: "-16px" }}
              ></img>
            </Navbar.Brand>
            <Search sx={{ right: "25%" }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Nav>
              <IconButton
                onClick={() => navigate("/home")}
                style={{ color: "#9a044c" }}
              >
                <HomeIcon />
              </IconButton>
              {/* <IconButton
              onClick={() => navigate("/statistics")}
              style={{ color: "#9a044c" }}
            >
              <AnalyticsIcon />
            </IconButton> */}
              <IconButton
                onClick={() => navigate("/favorites")}
                style={{ color: "#9a044c" }}
              >
                <FavoriteIcon />
              </IconButton>
              <IconButton
                onClick={() => navigate("/cart")}
                style={{ color: "#9a044c" }}
              >
                <ShoppingBagIcon />
              </IconButton>
              {/* {user && (
              <Stack direction="row" spacing={4} sx={{ marginLeft: "12px" }}>
                <Avatar style={{ backgroundColor: "#d98bad" }}>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </Avatar>
              </Stack>
            )} */}
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {user && (
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        <Avatar
                          sx={{ width: 38, height: 38 }}
                          style={{ backgroundColor: "#d98bad" }}
                        >
                          {user.firstName[0]}
                          {user.lastName[0]}
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={() => handleClose()}>
                    Order History
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => handleLogout()}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </React.Fragment>
            </Nav>
          </Container>
        </Navbar>
      )}
      {user && user.isAdmin && (
        <Navbar>
          <Container>
            <Navbar.Brand href="/admin">
              <img
                src={logo}
                width={"100px"}
                style={{ position: "absolute", top: "-16px" }}
              ></img>
            </Navbar.Brand>
            <Nav>
              <IconButton
                onClick={() => navigate("/admin")}
                style={{ color: "#9a044c" }}
              >
                <HomeIcon />
              </IconButton>
              <IconButton
                onClick={() => navigate("/statistics")}
                style={{ color: "#9a044c" }}
              >
                <AnalyticsIcon />
              </IconButton>
              {/* {user && (
              <Stack direction="row" spacing={4} sx={{ marginLeft: "12px" }}>
                <Avatar style={{ backgroundColor: "#d98bad" }}>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </Avatar>
              </Stack>
            )} */}
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {user && (
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        <Avatar
                          sx={{ width: 38, height: 38 }}
                          style={{ backgroundColor: "#d98bad" }}
                        >
                          {user.firstName[0]}
                          {user.lastName[0]}
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={() => handleLogout()}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </React.Fragment>
            </Nav>
          </Container>
        </Navbar>
      )}
      <Navbar bg="light" variant="light">
        {user && !user.isAdmin && (
          <Container>
            <Nav style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <Nav.Link
                href="/home"
                style={{ color: "#9a044c", fontWeight: "500" }}
              >
                Products
              </Nav.Link>
              <Nav.Link
                href="/discount"
                style={{ color: "#9a044c", fontWeight: "500" }}
              >
                Discounts
              </Nav.Link>
              <Nav.Link
                href="/new"
                style={{ color: "#9a044c", fontWeight: "500" }}
              >
                New
              </Nav.Link>
            </Nav>
          </Container>
        )}
        {user && user.isAdmin && (
          <Container>
            <Nav style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <Nav.Link
                href="/admin"
                style={{ color: "#9a044c", fontWeight: "500" }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="/statistics"
                style={{ color: "#9a044c", fontWeight: "500" }}
              >
                Statistics
              </Nav.Link>
            </Nav>
          </Container>
        )}
      </Navbar>
    </>
  );
}

export default NavbarMenu;
