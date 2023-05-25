const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers").favorite;

router.post("/addToFavorites/:id", favoriteController.addToFavorites);
router.delete("/deleteFromFavorites/:id", favoriteController.deleteFromFavorites);
router.get("/getFavorites", favoriteController.getFavorites);
router.delete("/deleteProductFromFavorites/:id", favoriteController.deleteProductFromFavorites);

module.exports = router;