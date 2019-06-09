const BetMS = module.exports;
const axios = require('axios');

BetMS.fetchBetTypesByName = async (name) => {
    const data = await axios.get(`${global.MS_BETS}/bettype/${name}`);
    return data.data;
}

BetMS.fetchAlllBetTypes = async () => {
    const data = await axios.get(`${global.MS_BETS}/bettype`)
    return data.data;
}