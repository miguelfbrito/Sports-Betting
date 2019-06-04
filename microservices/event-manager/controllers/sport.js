const Sport = module.exports;
const SportDB = require('../models/sport');

Sport.create = async (sport) => {

    try {
        return await SportDB.create(sport);
    } catch (e) {
        console.error(e);
    }

}
Sport.deleteByName = async (name) => {
    try {
        return await SportDB.destroy({ where: { name } });
    } catch (e) {
        console.error(e);
    }
}

Sport.delete = async (criteria) => {
    try {
        return await SportDB.destroy(criteria);
    } catch (e) {
        console.error(e);
    }
}

Sport.update = async (findCriteria, changes) => {
    try {
        return await SportDB.update(
            changes,
            findCriteria
        );
    } catch (e) {
        console.error(e);
    }
}