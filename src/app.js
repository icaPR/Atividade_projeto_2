const express = require("express");
const authRoutes = require("./routes/authRoutes");
const sequelize = require("./config/database");

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
