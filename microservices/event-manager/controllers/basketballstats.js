const BasketballStats = module.exports;
const BasketballStatsDB = require('../models/basketballstats');

// DATABASE 
BasketballStats.fetchOne = async (basketballstats) => {

    try {
        return await BasketballStatsDB.findOne(basketballstats);
    } catch (e) {
        console.error(e);
    }
}

BasketballStats.create = async (basketballstats) => {

    try {
        return await BasketballStatsDB.create(basketballstats);
    } catch (e) {
        console.error(e);
    }

}
BasketballStats.deleteByName = async (name) => {
    try {
        return await BasketballStatsDB.destroy({ where: { name } });
    } catch (e) {
        console.error(e);
    }
}

BasketballStats.delete = async (criteria) => {
    try {
        return await BasketballStatsDB.destroy(criteria);
    } catch (e) {
        console.error(e);
    }
}

BasketballStats.update = async (findCriteria, changes) => {
    try {
        return await BasketballStatsDB.update(
            changes,
            findCriteria
        );
    } catch (e) {
        console.error(e);
    }
}