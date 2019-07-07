const UserMS = module.exports;
const axios = require('axios');

UserMS.updateBalance = async (bet) => {

    const updatedUser = await axios.post(`${global.MS_USERS}/user/updatebalanceonwin`, bet);
    return updatedUser;
}

UserMS.withdraw = async (userOid, amount) => {

    const updatedUser = await axios.post(`${global.MS_USERS}/user/withdraw`, {
        userOid,
        amount
    });
    return updatedUser;
}

UserMS.fetchUserDetails = async (userOid) => {
    try {
        const userDetails = await axios.get(`${global.MS_USERS}/user/details/${userOid}`);
        return userDetails.data;
    } catch (e) {
        console.error(e);
    }
}