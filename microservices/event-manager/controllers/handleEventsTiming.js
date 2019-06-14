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
        await Event.update({ where: { oid: event.oid } }, { [Op.or]: [{ state: 'Live' }, { state: 'Upcoming' }] });
    })

    // TODO : Queries duplicadas, ver como se obtém o resultado de um update, visto só devolver o numero de mudanças

    justStartedEvents = await Event.fetchAllJustStarted();

    console.log("JUST STARTED #################################### ", justStartedEvents)

    //     ms_event_manager_1 | name: 'Arsenal x Liverpool',
    //         ms_event_manager_1 | finishingdate: 2019 - 06 - 14T17: 14: 36.000Z,
    //             ms_event_manager_1 | startingdate: 2019 - 06 - 14T17: 14: 16.000Z,
    //                 ms_event_manager_1 | creationdate: null,
    //                     ms_event_manager_1 | ispremium: true,
    //                         ms_event_manager_1 | description: null,
    //                             ms_event_manager_1 | state: 'Upcoming',
    //                                 ms_event_manager_1 | createdAt: 2019 - 06 - 14T17: 14: 06.000Z,
    //                                     ms_event_manager_1 | updatedAt: 2019 - 06 - 14T17: 14: 06.000Z,
    //                                         ms_event_manager_1 | sportOid: 1,
    //                                             ms_event_manager_1 | sport:
    //     ms_event_manager_1 | sport {
    //         ms_event_manager_1 | dataValues: [Object],
    //             ms_event_manager_1 | _previousDataValues: [Object],
    //                 ms_event_manager_1 | _changed: { },
    //         ms_event_manager_1 | _modelOptions: [Object],
    //             ms_event_manager_1 | _options: [Object],
    //                 ms_event_manager_1 | isNewRecord: false
    //     },
    //     ms_event_manager_1 | availablebettypes:
    //     ms_event_manager_1 | [[Object],
    //     ms_event_manager_1 | [Object],
    //     ms_event_manager_1 | [Object],
    //     ms_event_manager_1 | [Object],
    //     ms_event_manager_1 | [Object],
    //     ms_event_manager_1 | [Object],
    //     ms_event_manager_1 | [Object],
    //     ms_event_manager_1 | [Object],
    //     ms_event_manager_1 | [Object]]
    // },                               

    justStartedEvents = justStartedEvents.map(ev => {
        return {
            name: ev.name,
            finishingdate: ev.finishingdate,
            startingdate: ev.startingdate,
            creationdate: ev.creationdate,
            ispremium: ev.ispremium,
            state: ev.state,
            cretedAt: ev.createdAt,
            updatedAt: ev.updatedAt,
            sportOid: ev.sportOid,
            sportName: ev.sport.dataValues.name,
            availablebettypes: ev.availablebettypes
        }
    })

    await AvailableEventsMS.updateAvailableEvents(justStartedEvents);

    // justStartedEvents.forEach(event => {
    //     console.log(event.dataValues);
    // })
}

HandleEventsTiming.justFinished = async () => {
    const justClosedEvents = await Event.fetchAllJustClosed();

    await justClosedEvents.forEach(async event => {
        await Event.closeAndVerifyBets({ oid: event.oid });
    })


}