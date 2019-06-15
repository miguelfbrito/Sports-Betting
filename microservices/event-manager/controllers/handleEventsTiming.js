const HandleEventsTiming = module.exports;
const Event = require('./event');

const { Op } = require('sequelize');

const AvailableEventsMS = require('../controllers/availableEventsMS');

HandleEventsTiming.verify = async () => {

    await this.handleUpcomingEvents();

    await this.justStarted();

    await this.justFinished();

}

HandleEventsTiming.justStarted = async () => {

    let justStarted = await Event.fetchAllJustStarted('Upcoming');

    await justStarted.forEach(async event => {
        await Event.update({ where: { oid: event.oid } }, { state: 'Live' });
    })

    justStarted = await Event.fetchAllJustStarted('Live');

    justStarted = justStarted.map(ev => {
        return {
            eventOid: ev.oid,
            name: ev.name,
            finishingdate: ev.finishingdate,
            startingdate: ev.startingdate,
            creationdate: ev.creationdate,
            ispremium: ev.ispremium,
            state: ev.state,
            createdAt: ev.createdAt,
            updatedAt: ev.updatedAt,
            sportOid: ev.sportOid,
            sportName: ev.sport.dataValues.name,
            availablebettypes: ev.availablebettypes
        }
    })

    await AvailableEventsMS.updateAvailableEvents(justStarted);
}

HandleEventsTiming.handleUpcomingEvents = async () => {
    // Enviar estes eventos para o micro-serviço dos disponiveis
    let upComingEvents = await Event.upcomingEvents();

    upComingEvents = upComingEvents.map(ev => {
        return {
            eventOid: ev.oid,
            name: ev.name,
            finishingdate: ev.finishingdate,
            startingdate: ev.startingdate,
            creationdate: ev.creationdate,
            ispremium: ev.ispremium,
            state: ev.state,
            createdAt: ev.createdAt,
            updatedAt: ev.updatedAt,
            sportOid: ev.sportOid,
            sportName: ev.sport.dataValues.name,
            availablebettypes: ev.availablebettypes
        }
    })

    await AvailableEventsMS.updateAvailableEvents(upComingEvents);

}

HandleEventsTiming.justFinished = async () => {
    const justClosedEvents = await Event.fetchAllJustClosed();

    await justClosedEvents.forEach(async event => {
        await Event.closeAndVerifyBets({ oid: event.oid });
    })


}