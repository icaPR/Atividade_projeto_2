const express = require("express");
const purchaseController = require("../controllers/purchaseController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware.isAuthenticated);

router.post("/", purchaseController.createPurchase);
router.get("/", purchaseController.getPurchases);
router.get("/:id", purchaseController.getPurchaseById);

module.exports = router;
