const UserMS = module.exports;
const axios = require('axios');

UserMS.updateBalance = async (bet) => {

    const updatedUser = await axios.post(`${global.MS_USERS}/user/updatebalance`, bet);
    return updatedUser;
}