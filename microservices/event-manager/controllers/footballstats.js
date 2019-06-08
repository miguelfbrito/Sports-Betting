const FootballStats = module.exports;
const FootballStatsDB = require('../models/footballstats');

FootballStats.create = async (footballstats) => {

    try {
        return await FootballStatsDB.create(footballstats);
    } catch (e) {
        console.error(e);
    }

}
FootballStats.deleteByName = async (name) => {
    try {
        return await FootballStatsDB.destroy({ where: { name } });
    } catch (e) {
        console.error(e);
    }
}

FootballStats.delete = async (criteria) => {
    try {
        return await FootballStatsDB.destroy(criteria);
    } catch (e) {
        console.error(e);
    }
}

FootballStats.update = async (findCriteria, changes) => {
    try {
        return await FootballStatsDB.update(
            changes,
            findCriteria
        );
    } catch (e) {
        console.error(e);
    }
}