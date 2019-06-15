const HandleEventsTiming = module.exports;
const Event = require('./event');

const { Op } = require('sequelize');

const AvailableEventsMS = require('../controllers/availableEventsMS');

HandleEventsTiming.verify = async () => {

    await this.justStarted();
    await this.justFinished();

}

HandleEventsTiming.justStarted = async () => {

    // Enviar estes eventos para o micro-serviço dos disponiveis
    let justStartedEvents = await Event.fetchAllJustStarted();

    await justStartedEvents.forEach(async event => {

        // TODO : Rever que estados aqui se usam
        await Event.update({ where: { oid: event.oid } }, { state: 'Live' });
    })

    // TODO : Queries duplicadas, ver como se obtém o resultado de um update, visto só devolver o numero de mudanças

    justStartedEvents = await Event.fetchAllJustStarted();

    justStartedEvents = justStartedEvents.map(ev => {
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

    await AvailableEventsMS.updateAvailableEvents(justStartedEvents);

    console.log("Just Started ######################", justStartedEvents)
    justStartedEvents.forEach(event => {
        console.log(event.dataValues);
    })
}

HandleEventsTiming.justFinished = async () => {
    const justClosedEvents = await Event.fetchAllJustClosed();

    await justClosedEvents.forEach(async event => {
        await Event.closeAndVerifyBets({ oid: event.oid });
    })


}