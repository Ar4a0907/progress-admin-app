const { Client, Manager } = require('../models/models');
const ApiError = require('../error/ApiError');

class ClientController {
    async create(req, res, next) {
        try {
            const clientInfo = req.body;
            const client = await Client.create(clientInfo);
            return res.json(client);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.body;
            const client = await Client.destroy({ where: { id: id } });
            if (!client) {
                throw ApiError.badRequest('Клиент не найден');
            }
            await Manager.destroy({ where: { clientId: id } });
            return res.json(client);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const clients = await Client.findAll();
            return res.json(clients);
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const client = await Client.findByPk(id);
            if (!client) {
                throw ApiError.badRequest('Клиент не найден');
            }
            return res.json(client);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ClientController();