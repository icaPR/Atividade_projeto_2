const express = require("express");
const ticketController = require("../controllers/ticketController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware.isAuthenticated);

router.post("/", authMiddleware.isAdmin, ticketController.createTicket);
router.get("/", ticketController.getAllTickets);
router.get("/:id", ticketController.getTicketById);
router.put("/:id", authMiddleware.isAdmin, ticketController.updateTicket);
router.delete("/:id", authMiddleware.isAdmin, ticketController.deleteTicket);

module.exports = router;
