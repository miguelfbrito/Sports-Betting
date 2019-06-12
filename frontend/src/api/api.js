
import axios from 'axios';

const host = 'http://localhost:8081'
const Api = {};

Api.fetchAvailableEvents = async () => {

    const data = await axios.get(`${host}/available-events`);
    return data.data;
}




export default Api;