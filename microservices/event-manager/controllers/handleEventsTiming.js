const HandleEventsTiming = module.exports;
const Event = require('./event');

HandleEventsTiming.verify = async () => {

    await this.justStarted();
    await this.justFinished();

}

HandleEventsTiming.justStarted = async () => {

    // Enviar estes eventos para o micro-serviço dos disponiveis

    console.log("Checking if just started");
    const justStartedEvents = await Event.fetchAllJustStarted();

    justStartedEvents.forEach(event => {
        console.log(event.dataValues);
    })
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