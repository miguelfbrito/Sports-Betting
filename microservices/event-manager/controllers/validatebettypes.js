const ValidateBetTypes = module.exports;
const BetMS = require('./betMS');

const AvailableBetType = require('./availablebettypes');

ValidateBetTypes.fetchAllBetTypes = async () => {
    const bettypes = await BetMS.fetchAlllBetTypes();

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
    console.log("Printing availablebettypes");

    // Obter os BetTypes
    const bettypes = await this.fetchAllBetTypes();

    console.log("BETTYPES", bettypes)

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

        case 'basketball':
            availablebettypes.forEach(available => {
                console.log(available.dataValues);
            })

        default:
            console.log('Doing nothing')
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

    console.log("DENTRO DO BETTYPE VALIDATION DO FUTEBOL", bettype.toLowerCase())

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