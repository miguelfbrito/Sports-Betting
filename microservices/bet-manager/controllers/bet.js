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

    if (bet.betresult === 'WON') {
        await UserMS.updateBalance(bet);
    }

    return updatedBet;
}

Bet.placeBet = async (bet) => {

    const bettypeOid = bet.bettypeOid;
    const eventOid = bet.eventOid;

    // TODO : obter o userOid do token
    const userOid = bet.userOid;
    const user = await UserMS.fetchUserDetails(userOid);
    const event = await EventMS.fetch(eventOid);

    if (Date.now() >= Date.parse(event.startingdate)) {
        return { message: 'Bets to this event have been closed', bet };
    }

    const before = { where: { "eventOid": eventOid, "bettypeOid": bettypeOid, "userOid": userOid } }
    console.log("BEFOREEEEEEEEEEEEEEEEEEEE", before)
    const userBettedAlready = await BetDB.findOne(before)

    console.log("AFTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEER", userBettedAlready)
    if (userBettedAlready) {
        return { message: 'Already bet on the event', bet }
    }

    const isEventPremium = await EventMS.isPremium(bet.eventOid);
    if (!('ispremium' in isEventPremium) || !isEventPremium) {
        return { message: 'Event not found', bet }
    } else {
        if (isEventPremium.ispremium && !user.ispremium) {
            return { message: 'User must be premium', bet }
        }
    }

    const data = await EventMS.verifyBetTypeExistsInEvent(bettypeOid, eventOid);

    if (data.length === 0 || !bet) {
        return { message: 'Invalid data!', bet };
    }

    if (user.balance < bet.wager) {
        return { message: 'Insufficient balance!', bet };
    }

    console.log("Placing new BET!")

    const newBet = {
        wager: bet.wager,
        userOid: bet.userOid,
        eventOid: bet.eventOid,
        bettypeOid: bet.bettypeOid,
        earnings: 0.0
    }

    try {
        const createdBet = this.create(newBet);

        console.log("A TIRAR DINHEIRO", newBet)

        // RETIRAR DINHEIRO APOSTADO
        await UserMS.withdraw(newBet.userOid, newBet.wager);

        return createdBet;
    } catch (e) {
        console.error(`Unable to place bet ${e}`)
    }

}

Bet.history = async (userOid) => {
    try {
        let bets = await this.fetch({ where: { "userOid": userOid } });

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
        return await BetDB.destroy({ where: { "name": name } });
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

        console.log("Testint for this criteria")
        console.log(criteria)

        return await BetDB.findAll(criteria);
    } catch (e) {
        console.error(e);
    }
}