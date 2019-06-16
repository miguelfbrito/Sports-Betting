import jwt from 'jwt-decode';

let UserHandler = {};

const userData = 'userData';
const token = 'token';

UserHandler.save = (data) => {
    localStorage.setItem(token, data);
    localStorage.setItem(userData, JSON.stringify(jwt(data)));
}

UserHandler.get = () => {
    const data = localStorage.getItem(userData);

    if (data)
        return JSON.parse(data);

    return data;
}

UserHandler.isUserLogged = () => {

    const data = localStorage.getItem(userData);

    if (data) {
        return true;
    }

    return false;
}

UserHandler.updateBalance = () => {
    // TODO : 
}

UserHandler.updateUsername = () => {

}

UserHandler.remove = () => {
    localStorage.clear();
}

export default UserHandler;