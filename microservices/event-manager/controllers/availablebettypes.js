const AvailableBetTypes = module.exports;
const AvailableBetTypesDB = require('../models/availablebettypes');
const axios = require('axios');

AvailableBetTypes.createDefaultBySportName = async (name) => {

    let available = []
    switch (name.toLowerCase()) {
        case 'football':

            const defaultBetTypes = ['1', 'X', '2'];
            available = await Promise.all(defaultBetTypes.map(async bettype => {
                return (await this.fetchBetTypesByName(bettype)).data;
            }))
            return available;

        case 'basketball':

        case 'tennis':

        default:

    }
}

AvailableBetTypes.fetchBetTypesByName = async (name) => {
    return await axios.get(`${global.MS_BETS}/bettype/${name}`);
}

// DB Abstractions

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