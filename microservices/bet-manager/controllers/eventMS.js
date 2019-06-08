const EventMS = module.exports;
const axios = require('axios');

EventMS.verifyBetTypeExistsInEvent = async (bettypeOid, eventOid) => {

    const data = await axios.post(`${global.MS_EVENTS}/availablebettype/verifybettype`, {
        bettypeOid,
        eventOid
    });

    return data.data;
}