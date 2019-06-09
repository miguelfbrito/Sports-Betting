const axios = require('axios');
const BetMS = module.exports;


BetMS.fetchBetTypesByName = async (name) => {
    const data = await axios.get(`${global.MS_BETS}/bettype/${name}`);
    return data.data;
}

BetMS.fetchAlllBetTypes = async () => {
    const data = await axios.get(`${global.MS_BETS}/bettype`)
    return data.data;
}