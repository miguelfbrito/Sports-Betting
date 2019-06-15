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

    if (!availablebettypes)
        return;

    // Obter os BetTypes
    const bettypes = await this.fetchAllBetTypes();

    let isBetTypeValid;

    switch (stats.sport.toLowerCase()) {
        case 'football':
            availablebettypes.forEach(async available => {

                const isBetTypeValid = this.isFootballBetTypeValid(stats, bettypes[available.dataValues.bettypeOid].name);

                if (isBetTypeValid) {
                    await AvailableBetType.setBetResult('WON', available.dataValues.oid)
                } else {
                    await AvailableBetType.setBetResult('LOST', available.dataValues.oid)
                }
            })
            break;

        case 'basketball':

            availablebettypes.forEach(async available => {

                const isBetTypeValid = this.isBasketballBetTypeValid(stats, bettypes[available.dataValues.bettypeOid].name);

                if (isBetTypeValid) {
                    await AvailableBetType.setBetResult('WON', available.dataValues.oid)
                } else {
                    await AvailableBetType.setBetResult('LOST', available.dataValues.oid)
                }
            })

            availablebettypes.forEach(available => {

            })

            break;

        default:
            console.log('Doing nothing')
            break;
    }

}

ValidateBetTypes.isFootballBetTypeValid = (stats, bettype) => {

    const goalDiff = stats.homegoals - stats.awaygoals;

    switch (bettype.toUpperCase()) {

        case ("TR 1"):
            if (stats.homegoals > stats.awaygoals) {
                console.log("A validar o tipo de aposta [1], " + stats.homegoals + " :: " + stats.awaygoals)
                return true;
            }
            return false;
        case ("TR X"):
            if (stats.homegoals === stats.awaygoals) {
                console.log("A validar o tipo de aposta [X], " + stats.homegoals + " :: " + stats.awaygoals)
                return true;
            }
            return false;

        case ("TR 2"):
            if (stats.homegoals < stats.awaygoals) {
                console.log("A validar o tipo de aposta [2], " + stats.homegoals + " :: " + stats.awaygoals)
                return true;
            }
            return false;

        case ("H +0.5"):
            if (goalDiff > 0.5) {
                return true
            }
            return false;
        case ("H +1.5"):
            if (goalDiff > 1.5) {
                return true;
            }
            return false;
        case ("H +2.5"):
            if (goalDiff > 2.5) {
                return true;
            }
            return false;
        case ("A +0.5"):
            if (goalDiff > -0.5) {
                return true;
            }
            return false;
        case ("A +1.5"):
            if (goalDiff > -1.5) {
                return true;
            }
            return false;
        case ("A +2.5"):
            if (goalDiff > -2.5) {
                return true;
            }
            return false;

        default:
            return false;

    }

}


ValidateBetTypes.isBasketballBetTypeValid = (stats) => {


    //     homepoints: {
    //         type: Sequelize.INTEGER(11),
    //         allowNull: true
    //     },
    //     awaytriples: {
    //         type: Sequelize.INTEGER(11),
    //         allowNull: true
    //     },
    //     hometriples: {
    //         type: Sequelize.INTEGER(11),
    //         allowNull: true
    //     },
    //     awaypoints: {
    //         type: Sequelize.INTEGER(11),
    //         allowNull: true
    //     }

    switch (bettype.toUpperCase()) {
        case ("TR 1"):
            if (stats.homepoints > stats.awaypoints)
                return true;
            return false;
        case ("TR X"):
            if (stats.homepoints === stats.awaypoints)
                return true;
            return false;

        case ("TR 2"):
            if (stats.homepoints < stats.awaipoints)
                return true;
            return false;

        case ("TRIPLES 1"):
            if (stats.hometriples < stats.awaytriples)
                return true;
            return false;
        case ("TRIPLES X"):
            if (stats.hometriples === stats.awaytriples)
                return true;
            return false;
        case ("TRIPLES 2"):
            if (stats.hometriples < stats.awaytriples)
                return true;
            return false;
        default:
            return false;
    }
}

ValidateBetTypes.isTennisBetTypeValid = (stats) => {

}