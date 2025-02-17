const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const TicketType = require("./TicketType");

const Purchase = sequelize.define("Purchase", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ticketTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Purchase.belongsTo(TicketType, {
  foreignKey: "ticketTypeId",
  as: "ticketType",
});
TicketType.hasMany(Purchase, { foreignKey: "ticketTypeId", as: "purchases" });

module.exports = Purchase;
