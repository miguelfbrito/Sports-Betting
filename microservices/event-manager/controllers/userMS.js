const UserMS = module.exports;
const axios = require('axios');

UserMS.fetchUserDetails = async (userOid) => {
    try {
        const data = await axios.get(`${global.MS_USERS}/user/details${userOid}`);
        return data.data;
    } catch (e) {
        console.error(e);
    }
}