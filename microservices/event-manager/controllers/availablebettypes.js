const AvailableBetTypes = module.exports;
const AvailableBetTypesDB = require('../models/availablebettypes');


AvailableBetTypes.createDefaultBySportName = (name) => {
    switch (name.toLowerCase()) {
        case 'football':

        case 'basketball':

        case 'tennis':

        default:

    }
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