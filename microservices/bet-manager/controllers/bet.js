const Bet = module.exports;
const BetDB = require('../models/bet');
const EventMS = require('./eventMS');


Bet.placeBet = async (bet) => {

    const bettypeOid = 1;
    const eventOid = 1;

    const data = EventMS.verifyBetTypeExistsInEvent(bettypeOid, eventOid);


    console.log("[placeBetController]", data)

    return data;
    // Verificar se a BetType recebida está nas avaialable do evento

    // Criar a BET
}

Bet.create = async (bet) => {

    try {
        return await BetDB.create(bet);
    } catch (e) {
        console.error(e);
    }

}
Bet.deleteByName = async (name) => {
    try {
        return await BetDB.destroy({ where: { name } });
    } catch (e) {
        console.error(e);
    }
}

Bet.delete = async (criteria) => {
    try {
        return await BetDB.destroy(criteria);
    } catch (e) {
        console.error(e);
    }
}

Bet.update = async (findCriteria, changes) => {
    try {
        return await BetDB.update(
            changes,
            findCriteria
        );
    } catch (e) {
        console.error(e);
    }
}