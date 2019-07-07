import jwt from 'jwt-decode';

let UserHandler = {};

const userData = 'userData';
const token = 'token';

UserHandler.save = (data) => {
    localStorage.setItem(token, data);
    localStorage.setItem(userData, JSON.stringify(jwt(data)));
    console.log(JSON.stringify(jwt(data)));
}

UserHandler.get = () => {
    const data = localStorage.getItem(userData);

    if (data)
        return JSON.parse(data);

    return data;
}

UserHandler.isAdmin = () => {
    const data = localStorage.getItem(userData);
    var details = JSON.parse(data);
    if (details.username === "admin")
        return true;
    else
        return false;
}

UserHandler.isUserLogged = () => {

    const data = localStorage.getItem(userData);

    if (data) {
        return true;
    }

    return false;
}

UserHandler.depositMoney = (amount) => {
    const data = localStorage.getItem(userData);
    const details = JSON.parse(data);
    details.balance += amount;
    localStorage.setItem(userData, JSON.stringify(details));
}

UserHandler.WithdrawMoney = (amount) => {
    const data = localStorage.getItem(userData);
    const details = JSON.parse(data);
    details.balance -= amount;
    localStorage.setItem(userData, JSON.stringify(details));
}

UserHandler.updateUsername = (name) => {
    const data = localStorage.getItem(userData);
    const details = JSON.parse(data);
    details.username = name;
    localStorage.setItem(userData, JSON.stringify(details));
}

UserHandler.updatePremium = (value) => {
    const data = localStorage.getItem(userData);
    const details = JSON.parse(data);
    details.ispremium = value;
    localStorage.setItem(userData, JSON.stringify(details));
}

UserHandler.updateBalance = (value) => {
    const data = localStorage.getItem(userData);
    const details = JSON.parse(data);
    details.balance = value;
    localStorage.setItem(userData, JSON.stringify(details));
}

UserHandler.remove = () => {
    localStorage.clear();
}

export default UserHandler;