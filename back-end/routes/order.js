const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");

router.post("/createOrder", orderController.createOrder);
router.put("/updateOrderSuccess/:id", orderController.updateOrderSuccess);
router.get("/getOrderById/:id", orderController.getOrderById);

module.exports = router;
