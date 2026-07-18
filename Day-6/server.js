const app = require("./src/app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

dotenv.config();

function connectToDb() {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to Database.");
    })
    .catch((err) => {
      console.error("Database connection failed:");
      console.error(err);
    });
}

connectToDb();

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});