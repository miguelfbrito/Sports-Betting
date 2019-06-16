import jwt from 'jwt-decode';

let UserHandler = {};

const userData = 'userData';

UserHandler.save = (data) => {
    localStorage.setItem(userData, data);
}

UserHandler.get = () => {
    const data = localStorage.getItem(userData);

    if (data)
        return jwt(data);

    return data;
}

UserHandler.remove = () => {
    localStorage.clear();
}

export default UserHandler;