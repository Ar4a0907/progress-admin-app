const { Request, RequestRow, Manager, Client } = require('../models/models');
const ApiError = require('../error/ApiError');

class RequestController {
    async create(req, res) {

    }

    async getAllRequests(req, res) {
        try {
            const requests = await Request.findAll({
                include: [
                    {
                        model: RequestRow,
                    },
                    {
                        model: Manager,
                        include: [
                            {
                                model: Client,
                            },
                        ],
                    },
                ],
            });

            res.json(requests);
        } catch (error) {
            throw ApiError.badRequest('Запросы не найдены');
        }
    }

    async getOneRequest(req, res, next) {
        try {
            const { id } = req.params;
            const request = await Request.findOne({
                where: { id: id },
                include: [
                    {
                        model: RequestRow,
                    },
                    {
                        model: Manager,
                        include: [
                            {
                                model: Client,
                            },
                        ],
                    },
                ],
            });

            if (!request) {
                throw ApiError.badRequest('Запрос не найден');
            }

            res.json(request);
        } catch ( error ) {
            next(error);
        }
    }
}

module.exports = new RequestController();