const User = require("./user");
const Bet = require("./bet");
const Event = require("./event");

// WARNING: garantir que a ordem dos syncs é feita de forma correta.

module.exports.setup = () => {
    Bet.sync().then();
    User.sync().then();
    Event.sync().then();

}

module.exports.User = User;
module.exports.Bet = Bet;
module.exports.Event = Event;
