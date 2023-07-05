import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";

function ProductCard(props) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(props.data.isFavorite);

  useEffect(() => {
    setIsFavorite(props.data.isFavorite);
  }, [props.data.isFavorite]);

  const handleFavorites = (props) => {
    if (!isFavorite) {
      axios
        .post(
          `http://localhost:8081/api/favorite/addToFavorites/${props.data.id}`
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .delete(
          `http://localhost:8081/api/favorite/deleteProductFromFavorites/${props.data.id}`
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = (props) => {
    axios
      .post(
        `http://localhost:8081/api/cart/addProductToCart/${props.data.id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      style={{
        margin: "0 10px 0 10px",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        {props.data.label.includes("discount") && (
          <Chip
            label="10%"
            style={{
              color: "#9a044c",
              fontWeight: "600",
              borderColor: "#9a044c",
              border: "2px solid",
              background: "white",
            }}
            variant="outlined"
            sx={{ bottom: "-48px", position: "relative" }}
          />
        )}
        {props.data.label.includes("discount") && (
          <IconButton
            color="primary"
            aria-label="add"
            sx={{ left: "135px", bottom: "-48px", position: "relative" }}
            onClick={() => handleFavorites(props)}
          >
            {!isFavorite && (
              <FavoriteBorderOutlinedIcon style={{ color: "#d98bad" }} />
            )}
            {isFavorite && <FavoriteIcon style={{ color: "#d98bad" }} />}
          </IconButton>
        )}
        {!props.data.label.includes("discount") && (
          <IconButton
            color="primary"
            aria-label="add"
            sx={{ left: "200px", bottom: "-48px", position: "relative" }}
            onClick={() => handleFavorites(props)}
          >
            {!isFavorite && (
              <FavoriteBorderOutlinedIcon style={{ color: "#d98bad" }} />
            )}
            {isFavorite && <FavoriteIcon style={{ color: "#d98bad" }} />}
          </IconButton>
        )}
      </Box>

      <Card
        sx={{ maxWidth: 345 }}
        onClick={() => navigate("/details", { state: { product: props.data } })}
      >
        <img
          src={`product_pictures/${props.data.image}`}
          alt="Product"
          width="250px"
          height="225px"
        />
        <CardContent>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ textAlign: "center" }}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {props.data.name}
          </Typography>
          {!props.data.label.includes("discount") && (
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ textAlign: "center", fontWeight: "600" }}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {props.data.price} lei
            </Typography>
          )}
          {props.data.label.includes("discount") && (
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: "center",
                  fontWeight: "600",
                  textDecoration: "line-through",
                }}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: "gray",
                }}
              >
                {props.data.price} lei
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: "center",
                  fontWeight: "600",
                }}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {(props.data.price - 0.1 * props.data.price).toFixed(2)} lei
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab
          color="primary"
          aria-label="add"
          size="small"
          style={{ backgroundColor: "#9a044c" }}
          sx={{ bottom: "30px", position: "relative", left: "90px" }}
          onClick={() => {
            handleAddToCart(props);
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </div>
  );
}

export default ProductCard;
