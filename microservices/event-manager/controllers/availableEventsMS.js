const AvailableEventsMS = module.exports;
const axios = require('axios');

AvailableEventsMS.updateAvailableEevents = async (listEvents) => {
    try {
        const data = await axios.post(`${global.MS_LIST_EVENTS}/available-events/update`, listEvents);
        // return data.data;
    } catch (e) {
        console.error(e);
    }
}
