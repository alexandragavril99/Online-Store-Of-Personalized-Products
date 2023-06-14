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

function ProductCard(props) {
  const [isFavorite, setIsFavorite] = useState(props.data.isFavorite);

  useEffect(() => {
    setIsFavorite(props.data.isFavorite);
  }, [props.data.isFavorite]);

  const handleFavorites = (props) => {
    console.log(props);
    axios
      .delete(
        `http://localhost:8081/api/favorite/deleteFromFavorites/${props.data.id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        props.onChangeProductArray({
          productId: props.data.id,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    //setIsFavorite(!isFavorite);
  };
  return (
    <div>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <IconButton
          color="primary"
          aria-label="add"
          sx={{ left: "200px", bottom: "-48px", position: "relative" }}
          onClick={() => handleFavorites(props)}
        >
          {!isFavorite && <FavoriteBorderOutlinedIcon  style={{ color: "#d98bad" }} />}
          {isFavorite && <FavoriteIcon  style={{ color: "#d98bad" }} />}
        </IconButton>
      </Box>
      <Card sx={{ maxWidth: 345 }}>
        <img
          src={props.data.image}
          alt="Product"
          width="250px"
          height="225px"
        />
        <CardContent>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ textAlign: "center" }}
          >
            {props.data.name}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ textAlign: "center", fontWeight: "600" }}
          >
            {props.data.price} lei
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab
          color="primary"
          aria-label="add"
          size="small"
          sx={{ bottom: "30px", position: "relative", left: "90px" }}
          style={{ backgroundColor: "#9a044c" }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </div>
  );
}

export default ProductCard;
