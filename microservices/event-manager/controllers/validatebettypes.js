const ValidateBetTypes = module.exports;
const BetMS = require('./betMS');

const AvailableBetType = require('./availablebettypes');

ValidateBetTypes.fetchAllBetTypes = async () => {
    const bettypes = await BetMS.fetchAllBetTypes();

    // Reorganizar bettypes para uma estrutura de acesso mais simples
    let newBetTypes = {};
    bettypes.forEach(b => {

        newBetTypes[b.oid] = {
            ...b
        }
        delete newBetTypes[b.oid].oid;
    })

    return newBetTypes;
}

ValidateBetTypes.validate = async (availablebettypes, stats) => {

    console.log("Printing currentStats", stats)

    // Obter os BetTypes
    const bettypes = await this.fetchAllBetTypes();

    switch (stats.sport.toLowerCase()) {
        case 'football':
            availablebettypes.forEach(async available => {

                const isBetTypeValid = this.isFootballBetTypeValid(stats, bettypes[available.dataValues.bettypeOid].name);

                console.log("AVAILABLE #######################################")
                console.log(available.dataValues)

                if (isBetTypeValid) {
                    await AvailableBetType.setBetResult('WON', available.dataValues.oid)
                } else {
                    await AvailableBetType.setBetResult('LOST', available.dataValues.oid)
                }
            })
            break;

        case 'basketball':
            availablebettypes.forEach(available => {

            })

            break;

        default:
            console.log('Doing nothing')
            break;
    }

}

ValidateBetTypes.isFootballBetTypeValid = (stats, bettype) => {

    // TODO : testar e remover os || 
    const currStats = {
        homegoals: stats.homegoals || 0,
        awaygoals: stats.awaygoals || 0,
        homeredcards: stats.homeredcards || 0,
        awayredcards: stats.awayredcards || 0,
        homeyellowcards: stats.homeyellowcards || 0,
        awayyellowcards: stats.awayyellowcards || 0
    }

    switch (bettype.toLowerCase()) {

        case ("1"):
            if (stats.homegoals > stats.awaygoals) {
                console.log("A validar o tipo de aposta [1], " + stats.homegoals + " :: " + stats.awaygoals)
                return true;
            }
            return false;
        case ("x"):
            if (stats.homegoals === stats.awaygoals) {
                console.log("A validar o tipo de aposta [X], " + stats.homegoals + " :: " + stats.awaygoals)
                return true;
            }
            return false;

        case ("2"):
            if (stats.homegoals < stats.awaygoals) {
                console.log("A validar o tipo de aposta [2], " + stats.homegoals + " :: " + stats.awaygoals)
                return true;
            }
            return false;
        default:
            return false;

    }

}


ValidateBetTypes.isBasketballBetTypeValid = (stats) => {

}

ValidateBetTypes.isTennisBetTypeValid = (stats) => {

}