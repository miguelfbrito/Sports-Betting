const Event = module.exports;
const EventDB = require('../models/event');

Event.create = async (event) => {

    if (new Date(event.finishingdate) < Date.now()) {
        throw 'Invalid finishing date. It must be greater than current'
    }

    if (new Date(event.startingdate) < Date.now()) {
        throw 'Invalid starting date'
    }

    if (new Date(event.finishingdate) < new Date(event.startingdate)) {
        throw 'Finishing date must be greater than initial date'
    }

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