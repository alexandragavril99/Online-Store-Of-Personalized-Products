import React, { useState, useEffect, useCallback } from "react";
import NavbarMenu from "../components/NavbarMenu";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cropper from "react-easy-crop";
import { useRef } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { withStyles } from "@mui/styles";
import getCroppedImg from "../functions/Crop";

const productDetailStyles = {
  productContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },

  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: "3%",
  },
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ProductDetails() {
  const { state } = useLocation();
  const [product, setProduct] = useState(state.product);
  const [quantity, setQuantity] = useState("1");
  const [personalization, setPersonalization] = useState([]);
  const [displayCroppedImage, setDisplayCroppedImage] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const cropperRef = useRef(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const [image, setImage] = useState(null);

  const [originalImage, setOriginalImage] = useState(null);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      setDisplayCroppedImage(true);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image]);

  const [openReviewModal, setOpenReviewModal] = useState(false);
  const handleOpenReviewModal = () => setOpenReviewModal(true);
  const handleCloseReviewModal = () => setOpenReviewModal(false);

  console.log(product);

  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [value, setValue] = React.useState(5);

  const [feedbackValue, setFeedbackValue] = React.useState(0);

  const handleColorPickerButton = () => {
    setIsColorPickerOpen(true);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openImageModal, setOpenImageModal] = React.useState(false);
  const handleOpenImageModal = () => {
    setOpenImageModal(true);
    setDisplayCroppedImage(false);
    setImage(null);
  };
  const handleCloseImageModal = () => setOpenImageModal(false);

  const [customText, setCustomText] = React.useState("");

  const [feedback, setFeedback] = React.useState("");

  const [feedbackList, setFeedbackList] = React.useState([]);

  const [rating, setRating] = React.useState(0);

  const [selectedSize, setSelectedSize] = useState("XS");

  useEffect(() => {
    if (product.personalization) {
      product.personalization.map((obj, index) => {
        if (obj.hasOwnProperty("text")) {
          setCustomText(obj.text);
        }
      });
    }
    axios
      .get(`http://localhost:8081/api/feedback/getFeedbackById/${product.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setFeedbackList(res.data);
        if (res.data.length > 0) {
          let newRating = 0;
          res.data.map((obj, index) => {
            newRating += obj.rating;
          });
          console.log(newRating / res.data.length);
          setRating(newRating / res.data.length);
        }
      })
      .catch((err) => console.log(err));
  }, [product, personalization]);

  const handleCustomText = () => {
    const updatedProduct = {
      ...product,
      personalization: [{ text: customText }],
    };
    console.log(updatedProduct);
    setProduct(updatedProduct);
    handleClose();
    if (updatedProduct.isFavorite) {
      axios
        .put(
          `http://localhost:8081/api/favorite/updateFavoriteProduct/${updatedProduct.id}`,
          updatedProduct,
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleFavorites = () => {
    if (!product.isFavorite) {
      axios
        .post(
          `http://localhost:8081/api/favorite/addToFavorites/${product.id}`,
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
          toast.success("Product added to favorites!", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000,
          });
          const updatedProduct = {
            ...product,
            isFavorite: !product.isFavorite,
            personalization: [{ text: customText }],
          };
          setProduct(updatedProduct);
          if (updatedProduct.isFavorite) {
            axios
              .put(
                `http://localhost:8081/api/favorite/updateFavoriteProduct/${updatedProduct.id}`,
                updatedProduct,
                { withCredentials: true }
              )
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .delete(
          `http://localhost:8081/api/favorite/deleteProductFromFavorites/${product.id}`,
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
          toast.success("Product removed from favorites!", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000,
          });
          const updatedProduct = {
            ...product,
            isFavorite: !product.isFavorite,
          };
          setProduct(updatedProduct);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleAddToCart = () => {
    let personalizationArray = [];
    if (product.label.includes("text")) {
      personalizationArray.push({ text: customText });
    }
    if (product.label.includes("clothing")) {
      personalizationArray.push({ size: selectedSize });
    }
    if (product.label.includes("picture")) {
      personalizationArray.push({ image: originalImage.name });
    }
    setPersonalization(personalizationArray);

    const formData = new FormData();
    console.log(originalImage);
    formData.append("image", originalImage);
    formData.append("personalization", JSON.stringify(personalizationArray));
    axios
      .post(
        `http://localhost:8081/api/cart/addProductToCart/${product.id}`,
        formData,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Product added to cart!", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      console.log(file);
      setOriginalImage(file);
    }
  };

  const handleFeedback = () => {
    axios
      .post(
        `http://localhost:8081/api/feedback/addFeedback/${product.id}`,
        {
          feedback: feedback,
          rating: feedbackValue,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Feedback added!", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
        });
        let newFeedbackList = [...feedbackList];
        const newFeedback = {
          id: res.data.item._id,
          userId: res.data.item.userId,
          feedback: res.data.item.feedback,
          rating: res.data.item.rating,
          userFirstName: res.data.user.firstName,
          userLastName: res.data.user.lastName,
          date: res.data.item.date,
        };
        console.log(newFeedback);
        newFeedbackList.push(newFeedback);
        setFeedbackList(newFeedbackList);

        if (res.data.length > 0) {
          let newRating = 0;
          newFeedbackList.map((obj, index) => {
            newRating += obj.rating;
          });
          console.log(newRating / newFeedbackList.length);
          setRating(newRating / newFeedbackList.length);
        }
      });
    setOpenReviewModal(false);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleImageModal = () => {
    setOpenImageModal(false);
    const updatedProduct = {
      ...product,
      personalization: [{ image: croppedImage }],
    };
    console.log(updatedProduct);
    setProduct(updatedProduct);
  };

  // Define the custom styles for the radio button
  const CustomRadio = withStyles({
    root: {
      color: "#9a044c", // Set your desired color here
      "&$checked": {
        color: "#9a044c", // Set the checked color here (if different)
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  return (
    <>
      <NavbarMenu />
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
              Insert your custom text here!
            </Typography>
            <div className="col-auto">
              <div className="input-group mb-2" style={{ marginTop: "10%" }}>
                <input
                  type="text"
                  className="form-control"
                  id="inlineFormInputGroup"
                  placeholder="Insert your message"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                />
                <div className="input-group-prepend">
                  <div
                    className="input-group-text"
                    style={{ borderRadius: "0, 5px, 5px, 0" }}
                  >
                    25
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="contained"
              style={{ background: "#9a044c", marginTop: "10%" }}
              onClick={() => handleCustomText()}
            >
              Add your custom message
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openImageModal}
        onClose={handleCloseImageModal}
        aria-labelledby="modal-modal-title-picture"
        aria-describedby="modal-modal-description-picture"
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
              id="modal-modal-title-picture"
              variant="h6"
              component="h2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Insert your picture here!
            </Typography>

            {image && !displayCroppedImage && (
              <div
                style={{
                  height: 500,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {image && (
                  <Cropper
                    id="modal-modal-description-picture"
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    className="custom-modal"
                    ref={cropperRef}
                  />
                )}
              </div>
            )}

            {displayCroppedImage && (
              <div className="cropped-image-container">
                {croppedImage && (
                  <img
                    className="cropped-image"
                    src={croppedImage}
                    alt="cropped"
                    height={200}
                  />
                )}
              </div>
            )}

            {!image && !displayCroppedImage && (
              <Button
                variant="contained"
                component="label"
                style={{ background: "#9a044c", marginTop: "10%" }}
              >
                Upload File
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
            )}
            {image && !displayCroppedImage && (
              <Button
                variant="contained"
                style={{ background: "#9a044c", marginTop: "10%" }}
                onClick={showCroppedImage}
              >
                OK
              </Button>
            )}
            {displayCroppedImage && (
              <Button
                variant="contained"
                style={{ background: "#9a044c", marginTop: "10%" }}
                onClick={() => handleImageModal()}
              >
                OK
              </Button>
            )}
          </div>
        </Box>
      </Modal>
      <Modal
        open={openReviewModal}
        onClose={handleCloseReviewModal}
        aria-labelledby="modal-modal-title-review"
        aria-describedby="modal-modal-description-description"
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
              Add your feedback!
            </Typography>
            <div className="col-auto">
              <div>
                <Rating
                  name="simple-controlled"
                  value={feedbackValue}
                  style={{ marginTop: "10px" }}
                  onChange={(event, newValue) => {
                    setFeedbackValue(newValue);
                  }}
                />
              </div>
              <div className="input-group mb-2" style={{ marginTop: "5%" }}>
                <textarea
                  type="text"
                  className="form-control"
                  id="inlineFormInputGroup"
                  placeholder="Add your feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
            </div>
            <Button
              variant="contained"
              style={{ background: "#9a044c", marginTop: "10%" }}
              onClick={() => handleFeedback()}
            >
              Add feedback
            </Button>
          </div>
        </Box>
      </Modal>
      <div style={productDetailStyles.container}>
        <div>
          <img
            src={`product_pictures/${product.image}`}
            alt="Product"
            width="400px"
            height="400px"
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              margin: "5px",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                textAlign: "center",
                fontFamily: "'Montserrat', sans-serif",
                margin: "0",
              }}
            >
              {product.name}
            </Typography>
            {product.label.includes("discount") && (
              <Chip
                label="10%"
                style={{
                  color: "#9a044c",
                  fontWeight: "600",
                  borderColor: "#9a044c",
                  border: "2px solid",
                  background: "white",
                  alignItems: "center",
                  position: "absolute",
                  right: "210px",
                }}
                variant="outlined"
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <Typography
              variant="subline2"
              style={{ marginLeft: 5, color: "gray" }}
            >
              x{feedbackList.length}
            </Typography>
          </div>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              fontFamily: "'Montserrat', sans-serif",
              margin: "5px",
              marginTop: "25px",
            }}
          >
            {product.description}
          </Typography>
          {!product.label.includes("discount") && (
            <Typography
              variant="h5"
              gutterBottom
              sx={{ textAlign: "center", fontWeight: "600" }}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {product.price} lei
            </Typography>
          )}
          {product.label.includes("discount") && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                margin: "5px",
              }}
            >
              <Typography
                variant="h5"
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
                {product.price} lei
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  textAlign: "center",
                  fontWeight: "600",
                }}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {(product.price - 0.1 * product.price).toFixed(2)} lei
              </Typography>
            </div>
          )}
          {product.label.includes("text") && (
            <Button
              variant="contained"
              style={{ background: "#9a044c" }}
              onClick={handleOpen}
            >
              Insert custom message
            </Button>
          )}
          <div>
            {product.label.includes("clothing") && (
              <>
                <FormControl style={{ marginBottom: "15px" }}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={selectedSize}
                    onChange={handleSizeChange}
                  >
                    <FormControlLabel
                      value="XS"
                      control={<CustomRadio />}
                      label="XS"
                    />
                    <FormControlLabel
                      value="S"
                      control={<CustomRadio />}
                      label="S"
                    />
                    <FormControlLabel
                      value="M"
                      control={<CustomRadio />}
                      label="M"
                    />
                    <FormControlLabel
                      value="L"
                      control={<CustomRadio />}
                      label="L"
                    />
                    <FormControlLabel
                      value="XL"
                      control={<CustomRadio />}
                      label="XL"
                    />
                    <FormControlLabel
                      value="XXL"
                      control={<CustomRadio />}
                      label="XXL"
                    />
                  </RadioGroup>
                </FormControl>
              </>
            )}
          </div>
          {product.label.includes("picture") && (
            <Button
              variant="contained"
              style={{ background: "#9a044c" }}
              onClick={handleOpenImageModal}
            >
              Insert your picture
            </Button>
          )}
          <div
            style={{
              marginTop: "20%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <select
              className="form-select"
              style={{
                width: "100px",
                fontFamily: "'Montserrat', sans-serif",
                marginRight: "20px",
              }}
              defaultValue={quantity}
              onChange={handleQuantity}
            >
              <option value="1">1 item</option>
              <option value="2">2 items</option>
              <option value="3">3 items</option>
              <option value="4">4 items</option>
              <option value="5">5 items</option>
              <option value="6">6 items</option>
              <option value="7">7 items</option>
              <option value="8">8 items</option>
              <option value="9">9 items</option>
              <option value="10">10 items</option>
            </select>
            <Button
              variant="contained"
              style={{ background: "#9a044c", marginLeft: "20px" }}
              onClick={handleAddToCart}
            >
              Add product to cart
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <IconButton
              color="primary"
              aria-label="add"
              onClick={() => handleFavorites()}
            >
              {!product.isFavorite && (
                <FavoriteBorderOutlinedIcon style={{ color: "#d98bad" }} />
              )}
              {product.isFavorite && (
                <FavoriteIcon style={{ color: "#d98bad" }} />
              )}
            </IconButton>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                textAlign: "center",
                fontFamily: "'Montserrat', sans-serif",
                margin: "0",
                fontWeight: "500",
              }}
            >
              Add to favorites
            </Typography>
          </div>
          {/* <div>
            {product.label.includes("clothing") && (
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  handleColorPickerButton();
                }}
                style={{ height: "40px" }}
              >
                Choose shirt color
              </Button>
            )}
            <div
              style={{
                position: "relative",
                bottom: "65px",
                left: "190px",
              }}
            >
              {isColorPickerOpen && (
                <SwatchesPicker
                  width="200px"
                  onChange={(color) => {
                    // Manipulează schimbările de culoare aici
                    setIsColorPickerOpen(false);
                    console.log(color);
                  }}
                />
              )}
            </div>
          </div> */}
        </div>
      </div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {product.personalization &&
          product.personalization.map((obj, index) => {
            return (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "60%",
                  borderTop: "1px solid lightgray",
                  borderBottom: "1px solid lightgray",
                }}
              >
                {obj.text && (
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Personalized text: {obj.text}
                  </Typography>
                )}

                {obj.image && !openImageModal && (
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Selected picture:
                    {displayCroppedImage && (
                      <div className="cropped-image-container">
                        {croppedImage && (
                          <img
                            className="cropped-image"
                            src={croppedImage}
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
      </div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          marginTop: "5%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ marginRight: "550px" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Customers feedback
            </Typography>
          </div>

          <div>
            <Button
              variant="contained"
              style={{ background: "#9a044c" }}
              onClick={() => handleOpenReviewModal()}
            >
              Add review
            </Button>
          </div>
        </div>

        <List
          sx={{
            marginTop: "5px",
            width: "60%",
            bgcolor: "background.paper",
            borderTop: "1px solid lightgray",
          }}
        >
          {feedbackList &&
            feedbackList.map((data, index) => (
              <div key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: "#d98bad" }}>
                      {data.userFirstName[0] + data.userLastName[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={data.userFirstName + " " + data.userLastName}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {data.feedback}
                        </Typography>
                        {" — " +
                          new Date(data.date)
                            .toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "numeric",
                              year: "numeric",
                            })
                            .replace(/\//g, ".")}
                      </React.Fragment>
                    }
                  />
                  <Rating name="simple-controlled" value={data.rating} />
                </ListItem>
              </div>
            ))}
        </List>
      </div>
    </>
  );
}

export default ProductDetails;
