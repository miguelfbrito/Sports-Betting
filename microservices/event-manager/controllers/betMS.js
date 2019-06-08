const axios = require('axios');
const BetMS = module.exports;

BetMS.fetchBetTypesByName = async (name) => {
    return await axios.get(`${global.MS_BETS}/bettype/${name}`);
}
