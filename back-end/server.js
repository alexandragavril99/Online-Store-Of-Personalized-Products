const mongoose = require("mongoose");

const config = require("./utils/config");
const app = require("./app");

mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(config.PORT, console.log(`Server is running on ${config.PORT}`));
  })
  .catch((err) => {
    console.log("Connection failed! ", err);
  });
