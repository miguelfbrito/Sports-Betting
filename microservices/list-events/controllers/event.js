const Event = module.exports;
const EventDB = require('../models/event');

Event.updateAvailable = async (listEvents) => {

    const currentEvents = await this.fetchAll();

    let currentEventsByOid = {};

    currentEvents.forEach(event => {
        currentEventsByOid[event.oid] = { ...event };
        // Vão ficar duplicados mas + facil de comparar
        // delete currentEventsByOid[event.oid].oid;
    })

    listEvents.forEach(async event => {

        // Se o evento não existir, cria-se um novo
        if (!currentEventsByOid[event.oid]) {

            console.log("Evento não existe no available, a criar novo", event)
            const persistedEvent = await this.create(event);

        } else {

            if (!this.compareEvents(event, currentEventsByOid[event.oid])) {
                await this.update({ where: { oid: event.oid } }, { ...event })

            }
        }

    })

    return;
}


Event.compareEvents = (event1, event2) => {

    if (event1.name === event2.name && event1.finishingdate === event2.finishingdate && event1.startingdate === event2.startingdate && event1.ispremium === event2.ispremium && event1.description === event2.description) {
        return true;
    }

    return false;
}


Event.create = async (event) => {

    try {
        return await EventDB.create({ ...event });
    } catch (e) {
        console.error(e);
    }
}


Event.fetchOne = async (event) => {
    return await EventDB.findOne({ event });
}

Event.fetchAll = async () => {
    return await EventDB.findAll();
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