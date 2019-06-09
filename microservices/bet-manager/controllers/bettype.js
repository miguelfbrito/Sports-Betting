const BetType = module.exports;
const BetTypeDB = require('../models/bettype');

BetType.findByname = async (name) => {
    try {
        return await BetTypeDB.findOne({ where: { name: name } });
    } catch (e) {
        console.error(e);
    }
}

BetType.fetchAll = async () => {
    try {
        return await BetTypeDB.findAll();
    } catch (e) {
        console.error(e);
    }
}

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

BetType.seed = () => {

    this.create({ name: '1' })
    this.create({ name: 'X' })
    this.create({ name: '2' })

    this.create({ name: '+0.5' })
    this.create({ name: '+1.5' })
    this.create({ name: '+2.5' })
}