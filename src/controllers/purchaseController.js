const TicketType = require("../models/TicketType");
const Purchase = require("../models/Purchase");

const createPurchase = async (req, res) => {
  const { ticketTypeId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const ticket = await TicketType.findByPk(ticketTypeId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (ticket.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    const purchase = await Purchase.create({ userId, ticketTypeId, quantity });
    ticket.quantity -= quantity;
    await ticket.save();

    res.status(201).json(purchase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPurchases = async (req, res) => {
  const userId = req.user.id;

  try {
    const purchases = await Purchase.findAll({
      where: { userId },
      include: [{ model: TicketType, as: "ticketType" }],
    });

    const formattedPurchases = purchases.map((purchase) => ({
      id: purchase.id,
      quantity: purchase.quantity,
      ticketTypeId: purchase.ticketTypeId,
      ticketName: purchase.ticketType.name,
      ticketPrice: purchase.ticketType.price,
    }));

    res.json(formattedPurchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPurchaseById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const purchase = await Purchase.findOne({
      where: { id, userId },
      include: [{ model: TicketType, as: "ticketType" }],
    });

    if (!purchase) {
      return res.status(404).json({ message: "Compra não encontrada" });
    }

    const formattedPurchase = {
      id: purchase.id,
      quantity: purchase.quantity,
      ticketTypeId: purchase.ticketTypeId,
      ticketName: purchase.ticketType.name,
      ticketPrice: purchase.ticketType.price,
    };

    res.json(formattedPurchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPurchase, getPurchases, getPurchaseById };
