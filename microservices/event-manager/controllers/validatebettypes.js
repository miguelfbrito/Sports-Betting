const ValidateBetTypes = module.exports;
const BetMS = require('./betMS');

ValidateBetTypes.fetchBetTypes = async () => {
    const data = await BetMS.fetchAlllBetTypes();
}

ValidateBetTypes.validate = (availablebettypes, stats) => {

    console.log("Printing availablebettypes");
    availablebettypes.forEach(available => {
        console.log(available.dataValues);
    })

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
            if (stats.homegoals > stats.awaygoals)
                return true;

        case ("X"):
            if (stats.homegoals === stats.awaygoals)
                return true;

        case ("2"):
            if (stats.homegoals < stats.awaygoals)
                return true;

        default:
            return false;

    }
}


ValidateBetTypes.isBasketballBetTypeValid = (stats) => {

}

ValidateBetTypes.isTennisBetTypeValid = (stats) => {

}