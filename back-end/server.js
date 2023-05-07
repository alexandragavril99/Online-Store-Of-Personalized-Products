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
    console.log("Connection unsuccessful", err);
  });
// const express = require("express");
// const app = express();

// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

// app.use(express.json());

// const port = 8081;
// app.listen(port, console.log(`Server is running on port ${port}`));

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://alexandragavril19:madoarecapul@disertatie-db.2ixplkr.mongodb.net/?retryWrites=true&w=majority";

// //pune datele intr un env

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
