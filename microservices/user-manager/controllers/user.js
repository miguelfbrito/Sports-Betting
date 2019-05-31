const User = module.exports;
const UserDB = require('../models/user');

// Faz sentido sequer ter esta classe?

User.findOne = (criteria) => {
    return UserDB.findOne(criteria);
}

User.create = (user) => {
    return UserDB.create(user);
}
