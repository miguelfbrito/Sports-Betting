const BetType = module.exports;
const BetTypeDB = require('../models/bettype');

BetType.findByname = async (name) => {
    try {
        return await BetTypeDB.findOne({ where: { name: name } });
    } catch (e) {
        console.error(e);
    }
}

BetType.findById = async (oid) => {
    try {
        return await BetTypeDB.findOne({ where: { oid }, attributes: ['oid', 'name'] });
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

    this.create({ name: 'TR 1' })
    this.create({ name: 'TR X' })
    this.create({ name: 'TR 2' })

    this.create({ name: 'H +0.5' })
    this.create({ name: 'H +1.5' })
    this.create({ name: 'H +2.5' })

    this.create({ name: 'A +0.5' })
    this.create({ name: 'A +1.5' })
    this.create({ name: 'A +2.5' })

    this.create({ name: 'TRIPLE 1' })
    this.create({ name: 'TRIPLE X' })
    this.create({ name: 'TRIPLE 2' })
}