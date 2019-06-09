const AvailableBetTypes = module.exports;
const Stats = require('../controllers/stats');
const AvailableBetTypesDB = require('../models/availablebettypes');

const BetMS = require('./betMS');

AvailableBetTypes.createDefaultBySportName = async (name, eventOid) => {

    let bettypes = []
    switch (name.toLowerCase()) {
        case 'football':

            const defaultBetTypes = ['1', 'X', '2'];
            bettypes = await Promise.all(defaultBetTypes.map(async bettype => {
                return await BetMS.fetchBetTypesByName(bettype);
            }))

            // TODO : alterar a odd para não ser um valor aleatório
            bettypes.forEach(async bettype => {
                // Criar um available
                const newAvailableBetType = {
                    bettypeOid: bettype.oid,
                    eventOid: eventOid,
                    odd: (Math.random() * (2.5 - 1) + 1).toFixed(2)
                }

                const data = await this.create(newAvailableBetType)
            })
            return bettypes;

        case 'basketball':

        case 'tennis':

        default:

    }
}


AvailableBetTypes.betTypeExistsInEvent = async (bettypeOid, eventOid) => {

    const data = await this.fetch({
        where: {
            bettypeOid: bettypeOid,
            eventOid: eventOid
        }
    })

    return data;
}


// DB Abstractions
AvailableBetTypes.setBetResult = async (betresult, oid) => {
    try {
        return await this.update({ where: { oid } }, { betresult });
    } catch (e) {
        console.error(e);
    }
}


AvailableBetTypes.create = async (available) => {

    try {
        return await AvailableBetTypesDB.create(available);
    } catch (e) {
        console.error(e);
    }
}

AvailableBetTypes.deleteByName = async (name) => {
    try {
        return await AvailableBetTypesDB.destroy({ where: { name } });
    } catch (e) {
        console.error(e);
    }
}

AvailableBetTypes.delete = async (criteria) => {
    try {
        return await AvailableBetTypesDB.destroy(criteria);
    } catch (e) {
        console.error(e);
    }
}

AvailableBetTypes.update = async (findCriteria, changes) => {
    try {
        return await AvailableBetTypesDB.update(
            changes,
            findCriteria
        );
    } catch (e) {
        console.error(e);
    }
}

AvailableBetTypes.fetch = async (criteria) => {
    return await AvailableBetTypesDB.findAll(criteria);
}
