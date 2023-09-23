const mongoose = require("mongoose");

const mongoDB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
// MongoDB Connection
mongoose
  .connect(mongoDB)
  .then(() => console.log("DB connection successful!"))
  .catch((error) => console.log(error));

module.exports = {
  mongoose,
};
