const { Client } = require('../models/models');
const ApiError = require('../error/ApiError');

class ClientController {
    async create(req, res) {
        const { name } = req.body
        const client = await Client.create({name})
        return res.json(client)
    }

    async delete(req, res) {
        const { id } = req.body
        const client = await Client.destroy({ where: {id: id} })
        return res.json(client)
    }

    async getAll(req, res) {
        const clients = await Client.findAll()
        return res.json(clients)
    }

    async getOne(req, res) {

    }
}

module.exports = new ClientController();