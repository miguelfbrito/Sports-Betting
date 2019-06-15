let UserHandler = {};

const userData = 'userData';

UserHandler.save = (data) => {
    localStorage.setItem(JSON.stringify(userData), data);
}

UserHandler.get = () => {
    const data = localStorage.getItem(userData);

    if (data)
        return JSON.parse(data)

    return data;
}


export default UserHandler;