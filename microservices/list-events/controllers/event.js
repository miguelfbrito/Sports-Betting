const Event = module.exports;
const AvailableBetTypeDB = require('../models/availablebettypes');

Event.fetchOne = async (event) => {
    return await EventDB.findOne({ event, include: [{ model: AvailableBetTypeDB }] })
}

Event.fetchAll = async (event) => {
    return await EventDB.findAll({ event, include: [{ model: AvailableBetTypeDB }] })
}

Event.fetch = async (event) => {
    return await EventDB.findAll()
}


// TODO : secalhar esta abstração não é necessária
Event.create = async (event) => {
    try {
        return await EventDB.create(event);
    } catch (e) {
        console.error(e);
    }
}

Event.deleteByName = async (name) => {
    try {
        return await EventDB.destroy({ where: { name } });
    } catch (e) {
        console.error(e);
    }
}

Event.delete = async (criteria) => {
    try {
        return await EventDB.destroy(criteria);
    } catch (e) {
        console.error(e);
    }
}

Event.update = async (findCriteria, changes) => {
    try {
        return await EventDB.update(
            changes,
            findCriteria
        );
    } catch (e) {
        console.error(e);
    }
}