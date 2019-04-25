const AvailableBetTypes = require("./availablebettypes");
const Stats = require("./stats");
const FootballStats = require("./footballstats");
const BasketballStats = require("./basketballstats");
const Bet = require("./bet");
const Event = require("./event");
const Result = require("./result");
const State = require("./state");
const User = require("./user");
const UserGroup = require("./user_group");
const Sport = require("./sport");
const BetType = require("./bettype");
const BetTypeSport = require("./bettype_sport");

// WARNING: garantir que a ordem dos syncs é feita de forma correta.

module.exports.setup = () => {
    Bet.sync().then();
    User.sync().then();

}

module.exports.AvailableBetTypes = AvailableBetTypes;
module.exports.Stats = Stats;
module.exports.FootballStats = FootballStats;
module.exports.BasketballStats = BasketballStats;
module.exports.Bet = Bet;
module.exports.Event = Event;
module.exports.Result = Result;
module.exports.State = State;
module.exports.User = User;
module.exports.UserGroup = UserGroup;
module.exports.Sport = Sport;
module.exports.BetType = BetType;
module.exports.BetTypeSport = BetTypeSport;