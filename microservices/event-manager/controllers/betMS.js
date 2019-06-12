const BetMS = module.exports;
const axios = require('axios');

BetMS.fetchBetTypesByName = async (name) => {
    try {
        const data = await axios.get(`${global.MS_BETS}/bettype/${name}`);
        return data.data;
    } catch (e) {
        console.error(e);
    }
}

BetMS.fetchBetTypeDetailsByOid = async (oid) => {
    try {
        const data = await axios.get(`${global.MS_BETS}/bettype/byid/${oid}`);
        return data.data;
    } catch (e) {
        console.error(e);
    }

}

BetMS.closeBet = async (bet) => {
    try {
        const data = await axios.post(`${global.MS_BETS}/bet/closebet`, bet)
        return data.data;
    } catch (e) {
        console.error(e);
    }
}

BetMS.fetchAllBetTypes = async () => {
    try {
        const data = await axios.get(`${global.MS_BETS}/bettype`)
        return data.data;
    } catch (e) {
        console.error(e);
    }
}

BetMS.fetchAllBetsByEventOid = async (eventOid) => {
    try {
        const data = await axios.get(`${global.MS_BETS}/bet/fetchbyeventoid/${eventOid}`)
        return data.data;
    } catch (e) {
        console.error(e);
    }
}