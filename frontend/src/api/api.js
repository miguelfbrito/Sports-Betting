
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
    const data = await axios.post(`${host}/user/update/${props.userid}`,
        {
            name: props.name,
            password: props.password,
            email: props.email
        });
    return data.data;
}

Api.fetchCreateNewEvent = async (props) => {

    let premiumvalue = false;

    if(props.premium==="true"){
        premiumvalue = true;
    }else{
        premiumvalue = false;
    }

    const data = await axios.post(`${host}/event/create`, 
    {
        name: props.name,
	    ispremium: premiumvalue,
        startingdate:props.bdate,
        finishingdate: props.edate,
        state: "upcoming",
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

    if(props.premium==="true"){
        premiumvalue = true;
    }else{
        premiumvalue = false;
    }

    console.log(props.finishingdate);

    const data = await axios.post(`${host}/event/update/${props.oid}`, 
    {
        name: props.name,
	    ispremium: premiumvalue,
        startingdate:props.startingdate,
        finishingdate: props.finishingdate,
        state: "upcoming",
        sport: {
		    name: props.sport
	    }
    });
    console.log(data.data);
    return data.data;
}

Api.fetchDepositMoney = async (props) => {
    console.log(props);
    const data = await axios.post(`${host}/user/deposit`, 
    {
        userOid: props.userOid,
	    amount: props.updateValue
    });
    return data.data;
}


export default Api;