const Event = module.exports;
const EventDB = require('../models/event');
const SportsDB = require('../models/sport');
const Sport = require('../models/sport')
const AvailableBetTypeDB = require('../models/availablebettypes')
const AvailableBetType = require('./availablebettypes');
const ValidateBetTypes = require('./validatebettypes');
const Stats = require('./stats');
const BetMS = require('./betMS');

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
            available = await AvailableBetType.createDefaultBySportName(eventData.sport.name, createdEvent.oid);
        }

        return createdEvent;

    } catch (e) {
        console.error(e)
        return `Failed to create event, ${e}`
    }
}

Event.closeAndVerifyBets = async (event) => {

    // Verificar se o evento ainda se encontra aberto

    // Alterar o estado do evento para Finished
    await this.update({ where: { oid: event.oid } }, { state: 'Finished' });

    // Obter todas as availableBetTypes relativas ao evento em questão TODO : alterar o valor hardcoded
    const data = await this.fetchOne({ oid: event.oi });
    const availablebettypes = data.availablebettypes

    const currentStats = await Stats.fetchSubStatsType(event.oid);

    // Validar todas as AvailableBetTypes para um evento
    await ValidateBetTypes.validate(availablebettypes, currentStats);

    // Obter todas as bets do Evento
    const eventBets = await BetMS.fetchAllBetsByEventOid(event.oid);
    console.log("Event bets", eventBets);

    // Obter todas as AvailableBetTypes jassociadas ao evento (melhoria: obter a versao atualizada em vez de fazer 2 queries)
    const updatedEvent = await this.fetchOne({ oid: event.oid })
    const updatedAvailablebettypes = updatedEvent.availablebettypes;


    this.updateBetResult(updatedAvailablebettypes, eventBets);

    // CONTINUAR AQUI


    // Validar cada uma das available
    // Pegar em todas as available e o seu resultado
    // Pegar em todas as bets e validar com o resultado
}

Event.isPremium = async (eventOid) => {

    const event = await EventDB.findOne({ where: { oid: eventOid } });

    if (!event) {
        return -1;
    }

    if (event.dataValues.ispremium) {
        return true;
    }

    return false;
}

Event.updateBetResult = (availablebettypes, bets) => {

    // Formatação da estrutura para um acesso por index ao id do AvailableBetType
    let formattedAvailableBettypes = {};
    availablebettypes.forEach(available => {
        formattedAvailableBettypes[available.bettypeOid] = { ...available }
        delete formattedAvailableBettypes[available.bettypeOid].bettypeOid;
    })

    bets.forEach(async bet => {

        const betResult = formattedAvailableBettypes[bet.bettypeOid].dataValues.betresult;
        const odd = formattedAvailableBettypes[bet.bettypeOid].dataValues.odd;

        if (betResult === 'WON') {
            const data = await BetMS.closeBet({
                ...bet,
                betresult: 'WON',
                odd
            })

            console.log("Closing bet over BetMS")
        } else {
            const data = await BetMS.closeBet({
                ...bet,
                betresult: 'LOST',
                odd
            })
        }
    })

    // console.log(formattedAvailableBettypes)

}

// Database 

Event.fetchOne = async (event) => {
    return await EventDB.findOne({ event, include: [{ model: Sport }, { model: AvailableBetTypeDB }] })
}

Event.fetchAll = async (event) => {
    return await EventDB.findAll({ event, include: [{ model: AvailableBetTypeDB }] })
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