const HandleEventsTiming = module.exports;
const Event = require('./event');

const AvailableEventsMS = require('../controllers/availableEventsMS');

HandleEventsTiming.verify = async () => {

    await this.justStarted();
    await this.justFinished();

}

HandleEventsTiming.justStarted = async () => {

    // Enviar estes eventos para o micro-serviço dos disponiveis

    console.log("Checking if just started");
    const justStartedEvents = await Event.fetchAllJustStarted();

    await AvailableEventsMS.updateAvailableEevents(justStartedEvents);

    // justStartedEvents.forEach(event => {
    //     console.log(event.dataValues);
    // })
}

HandleEventsTiming.justFinished = async () => {
    console.log("Checking if just finished");
    const justClosedEvents = await Event.fetchAllJustClosed();

    justClosedEvents.forEach(async event => {
        console.log("Closing event!");
        console.log(event.dataValues);
        await Event.closeAndVerifyBets({ oid: event.oid });
    })


}