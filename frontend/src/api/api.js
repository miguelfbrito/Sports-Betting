
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

Api.fetchUserBets = async () => {
    // TODO : alterar para enviar no header o token

    const userOid = 1;
    try {
        const data = await axios.get(`${host}/bet/fetchall/${userOid}`);
        return data.data;
    } catch (e) {
        console.error(e);
    }
}

Api.placeBets = async (listBets) => {

    // TODO : obter o userOid
    listBets.forEach(async bet => {
        const currentBet = {
            wager: bet.wager,
            userOid: 1,
            eventOid: bet.eventOid,
            bettypeOid: bet.bettypeOid
        }

        const placedBet = await axios.post(`${host}/bet/place`, bet);
        console.log("Placed bet", placedBet.data)

    })

}




export default Api;