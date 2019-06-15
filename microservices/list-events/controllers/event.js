const Event = module.exports;
const EventDB = require('../models/event');

Event.updateAvailable = async (listEvents) => {

    const currentEvents = await this.fetchAll();

    let currentEventsByOid = {};

    currentEvents.forEach(event => {

        currentEventsByOid[event.eventOid] = { ...event };
        // Vão ficar duplicados mas + facil de comparar
        // delete currentEventsByOid[event.oid].oid;
    })

    listEvents.forEach(async event => {

        event.availablebettypes = JSON.stringify(event.availablebettypes);
        // Se o evento não existir, cria-se um novo
        if (!currentEventsByOid[event.eventOid]) {

            console.log("Evento não existe no available, a criar novo", event)
            const persistedEvent = await this.create(event);

        } else {
            console.log("Trying to update!")
            if (!this.isEventEqual(event, currentEventsByOid[event.eventOid].dataValues)) {
                console.log("Available events changed, updating!")
                await this.update({ where: { eventOid: event.eventOid } }, { ...event })
            }
        }

    })
    return;
}

Event.isEventEqual = (event1, event2) => {

    // TODO : comparar com o updatedAt seria mais simples
    if (event1.name === event2.name && Date.parse(event1.finishingdate) === Date.parse(event2.finishingdate) && Date.parse(event1.startingdate) === Date.parse(event2.startingdate) && event1.ispremium === event2.ispremium && event1.availablebettypes === event2.availablebettypes && event1.state === event2.state) {
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