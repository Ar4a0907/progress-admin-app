const { Manager } = require('../models/models');
const ApiError = require('../error/ApiError');

class ManagerController {
    async create(req, res) {
        const managerInfo = req.body
        const manager = await Manager.create({ ...managerInfo })
        return res.json(manager)
    }

    async delete(req, res, next) {
        const { id } = req.body
        const manager = await Manager.destroy({ where: {id: id} })
        if (!manager) {
            return next(ApiError.badRequest('Менеджер не найден'))
        }
        return res.json(manager)
    }

    async getClientManagers(req, res, next) {
        try {
            const { id } = req.params;
            const managers = await Manager.findAll({ where: { clientId: id } });
            if (!managers) {
                return next(ApiError.badRequest('Менеджеры не найдены'))
            }
            return res.json(managers);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ManagerController();