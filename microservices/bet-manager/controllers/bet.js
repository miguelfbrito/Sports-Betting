const Bet = module.exports;
const BetDB = require('../models/bet');
const EventMS = require('./eventMS');

Bet.placeBet = async (bet) => {

    const bettypeOid = bet.bettypeOid || 1;
    const eventOid = bet.eventOid || 1;

    const data = await EventMS.verifyBetTypeExistsInEvent(bettypeOid, eventOid);

    if (data.length === 0 || !bet) {
        return { message: 'Invalid data!' };
    }

    const newBet = {
        wager: bet.wager,
        userOid: bet.userOid,
        eventOid: bet.eventOid
    }

    try {
        const createdBet = this.create(newBet);
        return createdBet;
    } catch (e) {
        console.error(`Unable to place bet ${e}`)
    }

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