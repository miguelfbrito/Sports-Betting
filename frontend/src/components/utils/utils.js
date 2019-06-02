const Utils = module.exports;

const userInfoName = 'userInfo';
Utils.setUserInfo = (data) => {
    // LocalStorage only accepts strings
    localStorage.setItem(JSON.stringify(userInfoName), data);
}

Utils.getUserInfo = () => {
    const data = localStorage.getItem(userInfoName);

    if (data)
        return JSON.parse(data)

    return data;
}