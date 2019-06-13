const AvailableBetTypes = module.exports;
const AvailableBetTypesDB = require('../models/availablebettypes');
const Event = require('./event');

const BetMS = require('./betMS');

AvailableBetTypes.createDefaultBySportName = async (name, eventOid) => {

    let bettypes = []
    switch (name.toLowerCase()) {
        case 'football':

            const defaultBetTypes = ['TR 1', 'TR X', 'TR 2', 'H +0.5', 'H +1.5', 'H +2.5', 'A +0.5', 'A +1.5', 'A +2.5'];
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


AvailableBetTypes.fetchByEventOidWithBetTypeNameOnly = async (eventOid) => {
    try {
        const available = await AvailableBetTypesDB.findAll({ where: { eventOid } });
        let final = await Promise.all(available.map(async av => {
            const bettype = await BetMS.fetchBetTypeDetailsByOid(av.dataValues.bettypeOid);
            return {
                oid: av.oid,
                odd: av.odd,
                bettypeOid: av.bettypeOid,
                bettypeName: bettype.name
            }
        }));

        return final;

    } catch (e) {
        console.error(e);
    }
}

AvailableBetTypes.fetchByEventOidWithBetTypeName = async (eventOid) => {
    try {
        const available = await AvailableBetTypesDB.findAll({ where: { eventOid } });
        const event = await Event.fetchOneWithSport({ where: { oid: eventOid } });
        let final = await Promise.all(available.map(async av => {
            console.log("AV DATA BETTYPEOID", av.dataValues.bettypeOid)
            const bettype = await BetMS.fetchBetTypeDetailsByOid(av.dataValues.bettypeOid);
            return {
                oid: av.oid,
                odd: av.odd,
                bettypeOid: av.bettypeOid,
                bettypeName: bettype.name
            }
        }));

        return {
            bettypes: final,
            event
        }


    } catch (e) {
        console.error(e);
    }
}

AvailableBetTypes.fetchByEventOid = async (eventOid) => {
    try {
        return await AvailableBetTypesDB.findAll({ where: { eventOid } });
    } catch (e) {
        console.error(e);
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
