
import axios from 'axios';
import UserHandler from '../components/utils/userHandler';
var jwtDecode = require('jwt-decode');


const host = 'http://localhost:8081'
const Api = {};

Api.fetchAvailableEvents = async () => {
    var premium = true;
    var tk = "";

    if (UserHandler.get() && !UserHandler.isAdmin()) {
        tk = UserHandler.get();
        premium = tk.ispremium;
    }

    try {
        const data = await axios.post(`${host}/available-events`,
            {
                ispremium: premium
            });
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

    const tokendata = localStorage.getItem("token");
    const data = jwtDecode(tokendata);
    const userOid = data.oid;

    console.log(userOid);

    try {

        console.log("BETTING FOR ", userOid)
        const data = await axios.get(`${host}/bet/fetchall/${userOid}`);

        console.log("BETS DO USER", data)
        return data.data;
    } catch (e) {
        console.error(e);
    }
}

Api.placeBets = async (listBets) => {

    console.log("ListBets", listBets);

    const tokendata = localStorage.getItem("token");
    const data = jwtDecode(tokendata);
    const id = data.oid;

    console.log(id);

    // TODO : obter o userOid
    let placedBetsOutput = await Promise.all(listBets.map(async bet => {
        const currentBet = {
            wager: bet.wager,
            userOid: id,
            eventOid: bet.eventOid,
            bettypeOid: bet.bettypeOid
        }

        const placedBet = await axios.post(`${host}/bet/place`, currentBet);
        return placedBet.data
    }))

    return placedBetsOutput;
}

Api.fetchLogin = async (props) => {
    const data = await axios.post(`${host}/user/login`,
        {
            username: props.username,
            password: props.password
        }
    );
    return data.data;
}


Api.fetchRegister = async (props) => {
    //console.log("Registo", props);

    const data = await axios.post(`${host}/user/signup`,
        {
            username: props.username,
            password: props.password,
            email: props.email,
            name: props.nome
        }
    );
    return data.data;
}


Api.fetchUserDetails = async (props) => {
    const data = await axios.get(`${host}/user/details/${props}`);
    return data.data;
}


Api.fetchUpdateUser = async (props) => {
    const data = await axios.post(`${host}/user/update/${props.oid}`,
        {
            name: props.name,
            password: props.password,
            email: props.email
        });
    return data.data;
}

Api.fetchCreateNewEvent = async (props) => {

    let premiumvalue = false;

    if (props.premium === "true") {
        premiumvalue = true;
    } else {
        premiumvalue = false;
    }

    const data = await axios.post(`${host}/event/create`,
        {
            name: props.name,
            ispremium: premiumvalue,
            startingdate: props.bdate,
            finishingdate: props.edate,
            state: "Upcoming",
            sport: {
                "name": props.sport
            }
        });
    return data.data;
}

Api.fetchEventDetails = async (props) => {
    const data = await axios.get(`${host}/event/history/${props}`);
    return data.data;
}

Api.fetchUpdateEvent = async (props) => {

    let premiumvalue = false;

    if (props.premium === "true") {
        premiumvalue = true;
    } else {
        premiumvalue = false;
    }

    //console.log(props.finishingdate);

    const data = await axios.post(`${host}/event/update/${props.oid}`,
        {
            name: props.name,
            ispremium: premiumvalue,
            startingdate: props.startingdate,
            finishingdate: props.finishingdate,
            state: "Upcoming",
            sport: {
                name: props.sport
            }
        });
    //console.log(data.data);
    return data.data;
}

Api.fetchDepositMoney = async (props) => {
    //console.log(props);
    const data = await axios.post(`${host}/user/deposit`,
        {
            userOid: props.userOid,
            amount: props.updateValue
        });
    return data.data;
}

Api.fetchWithdrawMoney = async (props) => {
    //console.log(props);
    const data = await axios.post(`${host}/user/withdraw`,
        {
            userOid: props.userOid,
            amount: props.updateValue
        });
    return data.data;
}

Api.fetchSubscribe = async (props) => {
    console.log(props);
    const data = await axios.post(`${host}/user/subscribe`,
        {
            userOid: props
        });
    return data.data;
}

Api.fetchUnsubscribe = async (props) => {

    const data = await axios.post(`${host}/user/unsubscribe`,
        {
            userOid: props
        });
    return data.data;
}

Api.fetchSports = async (props) => {
    const data = await axios.get(`${host}/sport/allsports`);
    return data.data;
}

export default Api;