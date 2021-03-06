const Stats = module.exports;
const StatsDB = require('../models/stats');

const FootballStats = require('../controllers/footballstats');
const BasketballStats = require('../controllers/basketballstats');
const Event = require('../controllers/event');

const { randomInteger } = require('../utils/util');

Stats.addStatToEvent = async (data, sportName) => {

    // Obter dados
    // Obter tipo de desporto
    // De acordo com o desporto, criar nova stat

    const event = await Event.fetchOne({ oid: data.eventOid });

    if (!event)
        return 'Invalid event when adding stats!'

    const stats = data.stats;

    switch (sportName.toLowerCase()) {
        case 'football':
            try {
                const footballStats = await this.createFootballStats({
                    homegoals: data.stats.homegoals || 0,
                    awaygoals: data.stats.awaygoals || 0,
                    homeredcards: data.stats.homeredcards || 0,
                    awayredcards: data.stats.awayredcards || 0,
                    homeyellowcards: data.stats.homeyellowcards || 0,
                    awayyellowcards: data.stats.awayyellowcards || 0
                }, data.eventOid);


                return footballStats;
            } catch (e) {
                console.error(`Error creating football stats ${e}`)
            }

        case 'basketball':
            try {
                const basketballStats = await this.createBasketballStats({
                    homepoints: data.stats.homepoints || 0,
                    awaypoints: data.stats.awaypoints || 0,
                    hometriples: data.stats.hometriples || 0,
                    awaytriples: data.stats.awaytriples || 0,
                }, data.eventOid)
                return basketballStats;
            } catch (e) {
                console.error(`Error creating basketball stats ${e}`)
            }

        default:
            console.log("Sport not found!")
    }


}

Stats.generateRandomStats = async (event) => {

    console.log("A gerar stats aleatórias para o evento de id", event.oid)

    let statsData = {};

    switch (event.sport.dataValues.name.toLowerCase()) {
        case 'football':
            statsData = await this.addStatToEvent({
                eventOid: event.oid,
                stats: {
                    gameduration: randomInteger(90, 96),
                    homegoals: randomInteger(0, 5),
                    awaygoals: randomInteger(0, 5),
                    homeredcards: randomInteger(0, 2),
                    awayredcards: randomInteger(0, 2),
                    homeyellowcards: randomInteger(0, 6),
                    awayyellowcards: randomInteger(0, 6)
                }
            }, 'football')
            console.log("Generating random stats for Football", statsData);
            break;

        case 'basketball':
            statsData = await this.addStatToEvent({
                eventOid: event.oid,
                stats: {
                    homepoints: randomInteger(80, 130),
                    awaypoints: randomInteger(80, 130),
                    hometriples: randomInteger(10, 30),
                    awaytriples: randomInteger(10, 30)
                }
            }, 'basketball');
            console.log("Generating random stats for Basketball", statsData);
            break;

        default:

    }

    return statsData;
}

Stats.fetchSubStatsType = async (eventOid) => {

    const currentStats = await this.fetchOne({ where: { eventOid } });

    if (!currentStats) {
        return;
    }

    const data = currentStats.dataValues;

    console.log("Fetch das stats no processo de fechar", data)

    if (data.footballstatOid) {
        const footballStats = await FootballStats.fetchOne({ where: { oid: data.footballstatOid } })
        return { ...footballStats.dataValues, sport: 'football' }
    } else if (data.basketballstatOid) {
        const basketballStats = await BasketballStats.fetchOne({ where: { oid: data.basketballstatOid } })

        console.log("BASKETBALL STATS", basketballStats);

        return { ...basketballStats.dataValues, sport: 'basketball' }
    }

}

Stats.createFootballStats = async (stats, eventOid) => {

    const newFootballStats = {
        homegoals: stats.homegoals || 0,
        awaygoals: stats.awaygoals || 0,
        homeredcards: stats.homeredcards || 0,
        awayredcards: stats.awayredcards || 0,
        homeyellowcards: stats.homeyellowcards || 0,
        awayyellowcards: stats.awayyellowcards || 0
    }

    try {
        const createdFootballStats = await FootballStats.create(newFootballStats)

        if (createdFootballStats) {
            const genericStats = {
                eventOid: eventOid,
                gameduration: stats.gameduration,
                footballstatOid: createdFootballStats.dataValues.oid,
                eventOid,
            }

            const createdStats = await this.create(genericStats);
        }
        return createdFootballStats.dataValues;
    } catch (e) {
        console.error(e);
    }
}

Stats.createBasketballStats = async (stats) => {

    const newBasketballStats = {
        homepoints: stats.homepoints || 0,
        awaypoints: stats.awaypoints || 0,
        hometriples: stats.hometriples || 0,
        awaytriples: stats.awaytriples || 0,
    }

    try {
        const createdBasketballStats = await BasketballStats.create(newBasketballStats)

        if (createdBasketballStats) {
            const genericStats = {
                eventOid: stats.eventOid,
                gameduration: stats.gameduration || 60,
                basketballstatOid: createdBasketballStats.dataValues.oid
            }

            const createdStats = await this.create(genericStats);
        }
        return createdBasketballStats.dataValues;
    } catch (e) {
        console.error(e);
    }
}

// DB Abstraction

Stats.fetchOne = async (stats) => {
    try {
        return await StatsDB.findOne(stats);
    } catch (e) {
        console.error(e);
    }
}

Stats.fetch = async (stats) => {
    try {
        return await StatsDB.findAll(stats);
    } catch (e) {
        console.error(e);
    }
}


Stats.create = async (stats) => {
    try {
        return await StatsDB.create(stats);
    } catch (e) {
        console.error(e);
    }
}

Stats.deleteByName = async (name) => {
    try {
        return await StatsDB.destroy({ where: { name } });
    } catch (e) {
        console.error(e);
    }
}

Stats.delete = async (criteria) => {
    try {
        return await StatsDB.destroy(criteria);
    } catch (e) {
        console.error(e);
    }
}

Stats.update = async (findCriteria, changes) => {
    try {
        return await StatsDB.update(
            changes,
            findCriteria
        );
    } catch (e) {
        console.error(e);
    }
}
