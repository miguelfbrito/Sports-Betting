const HandleEventsTiming = module.exports;
const Event = require('./event');

const AvailableEventsMS = require('../controllers/availableEventsMS');

HandleEventsTiming.verify = async () => {

    await this.justStarted();
    await this.justFinished();

}

HandleEventsTiming.justStarted = async () => {

    // Enviar estes eventos para o micro-serviço dos disponiveis
    let justStartedEvents = await Event.fetchAllJustStarted();

    await justStartedEvents.forEach(async event => {

        await Event.update({ where: { oid: event.oid } }, { state: 'Live' });
    })

    // TODO : Queries duplicadas, ver como se obtém o resultado de um update, visto só devolver o numero de mudanças

    justStartedEvents = await Event.fetchAllJustStarted();

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