const sequelize = require('../db');
const { DataTypes } = require("sequelize");

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const Client = sequelize.define('client', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    code: { type: DataTypes.STRING },
    pvn: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    accountNumber: { type: DataTypes.STRING },
    swift: { type: DataTypes.STRING },
    bank: { type: DataTypes.STRING },
    emailInfo: { type: DataTypes.STRING, unique: true },
    emailInvoice: { type: DataTypes.STRING, unique: true },
})

module.exports = {
    User, Client
}