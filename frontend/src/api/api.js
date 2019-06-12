
import axios from 'axios';

const host = 'http://localhost:8081'
const Api = {};

Api.fetchAvailableEvents = async () => {

    try {
        const data = await axios.get(`${host}/available-events`);
        return data.data;
    } catch (e) {
        console.error(e);
    }
}

Api.fetchAvailableBetTypesByEventOid = async (eventOid) => {

    try {
        const data = await axios.get(`${host}/availablebettype/byeventoid/${eventOid}`);
        return data.data;
    } catch (e) {
        console.error(e);
    }

}




export default Api;