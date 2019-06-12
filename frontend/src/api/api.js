
import axios from 'axios';

const host = 'http://localhost:8081'
const Api = {};

Api.fetchAvailableEvents = async () => {

    const data = await axios.get(`${host}/bet`);
    console.log(data.data)

}

export default Api;