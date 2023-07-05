const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers").feedback;

router.post("/addFeedback/:id", feedbackController.addFeedback);
router.get("/getFeedbackById/:id", feedbackController.getFeedbackById);

module.exports = router;
