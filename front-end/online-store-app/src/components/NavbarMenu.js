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
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">Logo ceva</Navbar.Brand>
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
            <IconButton onClick={() => navigate("/home")}>
              <HomeIcon />
            </IconButton>
            <IconButton onClick={() => navigate("/favorites")}>
              <FavoriteIcon />
            </IconButton>
            <IconButton>
              <ShoppingBagIcon />
            </IconButton>
            <Stack direction="row" spacing={4} sx={{ marginLeft: "12px" }}>
              <Avatar>AG</Avatar>
            </Stack>
          </Nav>
        </Container>
      </Navbar>
      <Navbar bg="light" variant="light">
        <Container>
          <Nav>
            <Nav.Link href="#home">Products</Nav.Link>
            <Nav.Link href="#features">Discounts</Nav.Link>
            <Nav.Link href="#pricing">New</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarMenu;
