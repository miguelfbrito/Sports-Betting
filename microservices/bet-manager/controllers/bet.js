const Bet = module.exports;
const axios = require('axios');

const BetDB = require('../models/bet');
const BetType = require('./bettype');

const EventMS = require('./eventMS');
const UserMS = require('./userMS');

Bet.closeBet = async (bet) => {

    // TODO: alterar
    if (!bet)
        return 'Bet not found';

    let earnings = 0;
    if (bet.betresult === 'WON') {
        earnings = (bet.odd * bet.wager).toFixed(2);
    } else if (bet.betresult === 'LOST') {
        earnings = bet.wager * -1
    }
    const updatedBet = await this.update({ where: { oid: bet.oid } }, { result: bet.betresult, earnings });


    bet = {
        ...bet,
    }

    if (bet.betresult) {
        await UserMS.updateBalance(bet);
    }

    return updatedBet;
}

Bet.placeBet = async (bet) => {

    const bettypeOid = bet.bettypeOid;
    const eventOid = bet.eventOid;

    // TODO : obter o userOid do token
    const userOid = 1;
    const user = await UserMS.fetchUserDetails(userOid);
    const event = await EventMS.fetch(eventOid);

    if (Date.now() >= Date.parse(event.startingdate)) {
        return { message: 'Bets to this event have been closed' };
    }

    const userBettedAlready = await BetDB.findOne({ where: { eventOid, bettypeOid, userOid: userOid } })

    if (userBettedAlready) {
        return { message: 'User already bet on event' }
    }

    const isEventPremium = await EventMS.isPremium(bet.eventOid);
    if (!('ispremium' in isEventPremium)) {
        return { message: 'Event not found' }
    } else {
        if (isEventPremium.ispremium && !user.data.ispremium) {
            return { message: 'User must be premium' }
        }
    }

    const data = await EventMS.verifyBetTypeExistsInEvent(bettypeOid, eventOid);

    if (data.length === 0 || !bet) {
        return { message: 'Invalid data!' };
    }

    console.log(`BALANCE############################`)
    console.log(user)
    console.log(bet.wager)

    if (user.balance < bet.wager) {
        return { message: 'Insufficient balance!' };
    }

    const newBet = {
        wager: bet.wager,
        userOid: bet.userOid,
        eventOid: bet.eventOid,
        bettypeOid: bet.bettypeOid,
        earnings: 0.0
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
        let bets = await this.fetch({ userOid });

        // Obter o nome da bettype bettypeOid
        // Obter o nome do evento eventOid

        console.log(bets)

        bets = Promise.all(bets.map(async bet => {
            const bettype = await BetType.findById(bet.dataValues.bettypeOid);
            const event = await EventMS.fetch(bet.dataValues.eventOid);


            return {
                ...bet.dataValues,
                bettypeName: bettype.dataValues.name,
                eventName: event.name
            }


        }))

        return bets;
    } catch (e) {
        console.error(e);
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