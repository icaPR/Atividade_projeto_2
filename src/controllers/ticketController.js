const TicketType = require("../models/TicketType");

const createTicket = async (req, res) => {
  const { name, price, quantity } = req.body;
  try {
    const ticket = await TicketType.create({ name, price, quantity });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await TicketType.findAll();
    res.json(tickets);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTicketById = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await TicketType.findByPk(id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;
  try {
    const ticket = await TicketType.findByPk(id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.name = name || ticket.name;
    ticket.price = price || ticket.price;
    ticket.quantity = quantity || ticket.quantity;
    await ticket.save();

    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await TicketType.findByPk(id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    await ticket.destroy();
    res.json({ message: "Ticket deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
