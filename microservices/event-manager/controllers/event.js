const Event = module.exports;
const EventDB = require('../models/event');
const SportsDB = require('../models/sport');
const Sport = require('../models/sport')
const AvailableBetType = require('../models/availablebettypes')
const AvailableBetTypesController = require('./availablebettypes');

Event.createEvent = async (eventData) => {

    const currSport = await SportsDB.findOne({ where: { name: eventData.sport.name } })

    console.log("EVENT", eventData)

    if (!currSport) {
        return 'Invalid sport'
    }

    try {
        const event = {
            name: eventData.name,
            ispremium: eventData.ispremium,
            startingdate: eventData.startingdate,
            state: eventData.state || 'Upcoming',
            sportOid: currSport.dataValues.oid
        }

        const createdEvent = await this.create(event);

        if (createdEvent) {
            console.log("Creating available bet types!")
            available = await AvailableBetTypesController.createDefaultBySportName(eventData.sport.name, createdEvent.oid);
        }

        return createdEvent;

    } catch (e) {
        console.error(e)
        return `Failed to create event, ${e}`
    }


}

Event.fetchOne = async (event) => {
    return await EventDB.findOne({ event, include: [{ model: Sport }] })
}

Event.fetch = async (event) => {
    return await EventDB.findAll({ include: [{ model: Sport }] })
}


// TODO : secalhar esta abstração não é necessária
Event.create = async (event) => {

    // if (new Date(event.finishingdate) < Date.now()) {
    //     throw 'Invalid finishing date. It must be greater than current'
    // }

    // if (new Date(event.startingdate) < Date.now()) {
    //     throw 'Invalid starting date'
    // }

    // if (new Date(event.finishingdate) < new Date(event.startingdate)) {
    //     throw 'Finishing date must be greater than initial date'
    // }

    if (!('state' in event)) {
        event.state = 'Upcoming';

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