const EventMS = module.exports;
const axios = require('axios');

EventMS.verifyBetTypeExistsInEvent = async (bettypeOid, eventOid) => {

    const data = await axios.post(`${global.MS_EVENTS}/availablebettype/verifybettype`, {
        bettypeOid,
        eventOid
    });

    return data.data;
}

EventMS.isPremium = async (eventOid) => {

    const data = await axios.get(`${global.MS_EVENTS}/event/ispremium/${eventOid}`);

    return data.data;

}

EventMS.fetch = async (eventOid) => {
    try {
        const data = await axios.get(`${global.MS_EVENTS}/event/history/${eventOid}`);
        return data.data;
    } catch (e) {
        console.error(e);
    }

}