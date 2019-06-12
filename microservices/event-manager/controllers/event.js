const Event = module.exports;
const EventDB = require('../models/event');
const SportsDB = require('../models/sport');
const Sport = require('../models/sport')
const AvailableBetTypeDB = require('../models/availablebettypes')
const AvailableBetType = require('./availablebettypes');
const ValidateBetTypes = require('./validatebettypes');
const Stats = require('./stats');
const BetMS = require('./betMS');

const { Op } = require('sequelize');

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
            finishingdate: eventData.finishingdate,
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

    // Verificar se o evento ainda não foi fechado
    const currentEvent = await this.fetchOne({ where: { oid: event.oid } });
    if (currentEvent) {
        if (currentEvent.dataValues.state === 'Finished-Evaluated') {
            return { message: 'Event has already been closed and evaluated' }
        }
    }

    console.log("A fechar o evento: ", event)

    // Alterar o estado do evento para Finished
    await this.update({ where: { oid: event.oid } }, { state: 'Finished' });

    // Gerar stats aleatórias, simular interacao com API
    await Stats.generateRandomStats(event.oid);

    // Obter todas as availableBetTypes relativas ao evento em questão
    const availablebettypes = await AvailableBetType.fetchByEventOid(event.oid);
    console.log("AVAILABLE RELATIVAS SO A UM EVENTO #################################################", availablebettypes);

    const currentStats = await Stats.fetchSubStatsType(event.oid);

    // Validar todas as AvailableBetTypes para um evento
    await ValidateBetTypes.validate(availablebettypes, currentStats);

    // Obter todas as bets do Evento
    const eventBets = await BetMS.fetchAllBetsByEventOid(event.oid);

    // const updatedEvent = await this.fetchOne({ oid: event.oid })
    const updatedAvailablebettypes = await AvailableBetType.fetchByEventOid(event.oid);

    this.updateBetResult(updatedAvailablebettypes, eventBets);

    // Alterar o estado do evento para Finished-Evaluated
    await this.update({ where: { oid: event.oid } }, { state: 'Finished-Evaluated' });

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
    return await EventDB.findOne({ event, include: [{ model: Sport }, { model: AvailableBetTypeDB }] });
}

Event.fetchOneWithSport = async (event) => {
    return await EventDB.findOne({ event, include: [{ model: Sport }] });
}

Event.fetchAll = async (event) => {
    return await EventDB.findAll({ event, include: [{ model: AvailableBetTypeDB }] });
}

Event.fetchAllJustStarted = async () => {
    return await EventDB.findAll({
        where: {
            startingdate: {
                [Op.lte]: Date.now()
            },
            state: 'Upcoming'
        }
    });
}

Event.fetchAllJustClosed = async () => {
    return await EventDB.findAll({
        where: {
            finishingdate: {
                [Op.lte]: Date.now()
            },
            state: 'Live'
        }
    });
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