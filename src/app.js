const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");

const app = express();

app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/purchases", purchaseRoutes);

app.get("/", (req, res) => res.redirect("/login"));
app.get("/login", (req, res) => res.render("login"));
app.get("/purchases", (req, res) => res.render("purchases"));
app.get("/ticket/:id", (req, res) =>
  res.render("ticket", { ticketId: req.params.id })
);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
  });
});
