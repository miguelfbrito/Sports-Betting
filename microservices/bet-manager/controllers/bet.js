const Bet = module.exports;
const axios = require('axios');

const BetDB = require('../models/bet');
const BetTypeDB = require('../models/bettype');

const EventMS = require('./eventMS');
const UserMS = require('./userMS');

Bet.closeBet = async (bet) => {

    // TODO: alterar
    if (!bet)
        return 'Bet not found';

    console.log("BetManagerMS", bet)

    const updatedBet = await this.update({ where: { oid: bet.oid } }, { result: bet.betresult });


    bet = {
        ...bet,
    }

    if (bet.betresult) {
        await UserMS.updateBalance(bet);
    }

    return updatedBet;
}

Bet.placeBet = async (bet) => {

    const bettypeOid = bet.bettypeOid || 1;
    const eventOid = bet.eventOid || 1;

    const data = await EventMS.verifyBetTypeExistsInEvent(bettypeOid, eventOid);

    if (data.length === 0 || !bet) {
        return { message: 'Invalid data!' };
    }

    // TODO : obter o userOid do token
    const userOid = 1;
    const user = await UserMS.fetchUserDetails(userOid)

    if (user.balance < bet.wager) {
        return { message: 'Insufficient balance!' };
    }

    const newBet = {
        wager: bet.wager,
        userOid: bet.userOid,
        eventOid: bet.eventOid,
        bettypeOid: bet.bettypeOid
    }

    try {
        const createdBet = this.create(newBet);
        return createdBet;
    } catch (e) {
        console.error(`Unable to place bet ${e}`)
    }

}

Bet.history = async (userOid) => {
    try {
        const data = await this.fetch({ userOid })
        return data;
    } catch (e) {
        console.log(`Error fetching bet history ${e}`)
    }
}

Bet.fetchBetsByEventOid = async (eventOid) => {
    try {
        const data = await BetDB.findAll({ where: { eventOid: eventOid } });
        return data;
    } catch (e) {
        console.log(`Error fetching bets by event oid${e}`)
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
            findCriteria,
        );
    } catch (e) {
        console.error(e);
    }
}

Bet.fetch = async (criteria) => {
    try {
        return await BetDB.findAll(criteria);
    } catch (e) {
        console.error(e);
    }
}