const sequelize = require('../db');
const { DataTypes } = require("sequelize");

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull:false },
    password: { type: DataTypes.STRING, allowNull:false },
    role: { type: DataTypes.STRING, defaultValue: 'USER', allowNull:false },
});

const Client = sequelize.define('client', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull:false },
    code: { type: DataTypes.STRING, allowNull:false },
    pvn: { type: DataTypes.STRING, allowNull:false },
    address: { type: DataTypes.STRING, allowNull:false },
    accountNumber: { type: DataTypes.STRING, allowNull:false },
    swift: { type: DataTypes.STRING, allowNull:false },
    bank: { type: DataTypes.STRING, allowNull:false },
    emailInfo: { type: DataTypes.STRING, unique: true, allowNull:false },
    emailInvoice: { type: DataTypes.STRING, unique: true, allowNull:false },
});

const Manager = sequelize.define('manager', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull:false },
    firm: { type: DataTypes.STRING, allowNull:false },
    country: { type: DataTypes.STRING, allowNull:false },
    city: { type: DataTypes.STRING, allowNull:false },
    address: { type: DataTypes.STRING, allowNull:false },
    postCode: { type: DataTypes.STRING, allowNull:false },
    phone: { type: DataTypes.STRING, allowNull:false },
    email: { type: DataTypes.STRING, allowNull:false },
});

const Request = sequelize.define('request', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    clientId: { type: DataTypes.INTEGER },
    pvn: { type: DataTypes.BOOLEAN, allowNull:false },
    sum: { type: DataTypes.FLOAT, allowNull:false },
    discount: { type: DataTypes.FLOAT, allowNull:false },
    total: { type: DataTypes.FLOAT, allowNull:false }
});

const RequestRow = sequelize.define('request_row', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    article: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    count: { type: DataTypes.INTEGER, allowNull:false },
    cost: { type: DataTypes.INTEGER, allowNull:false },
    discount: { type: DataTypes.INTEGER, allowNull:false },
    total: { type: DataTypes.INTEGER, allowNull:false },
    file: { type: DataTypes.STRING }
});

Client.hasMany(Manager);
Manager.belongsTo(Client);

Manager.hasMany(Request);
Request.belongsTo(Manager);

Request.hasMany(RequestRow);
RequestRow.belongsTo(Request);

module.exports = {
    User, Client, Manager, Request, RequestRow
}