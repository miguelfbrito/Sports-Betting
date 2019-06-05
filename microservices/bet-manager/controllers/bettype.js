const BetType = module.exports;
const BetTypeDB = require('../models/bet');

BetType.create = async (bettype) => {

    try {
        return await BetTypeDB.create(bettype);
    } catch (e) {
        console.error(e);
    }

}
BetType.deleteByName = async (name) => {
    try {
        return await BetTypeDB.destroy({ where: { name } });
    } catch (e) {
        console.error(e);
    }
}

BetType.delete = async (criteria) => {
    try {
        return await BetTypeDB.destroy(criteria);
    } catch (e) {
        console.error(e);
    }
}

BetType.update = async (findCriteria, changes) => {
    try {
        return await BetTypeDB.update(
            changes,
            findCriteria
        );
    } catch (e) {
        console.error(e);
    }
}