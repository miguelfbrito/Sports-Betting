-- Result_Bet [rel21]
alter table `bet`   drop foreign key `fk_bet_result`;
alter table `bet`  drop column  `result_oid`;
-- AvailableBetTypes_Event [rel20]
alter table `availablebettypes`   drop foreign key `fk_availablebettypes_event`;
alter table `availablebettypes`  drop column  `event_oid`;
-- BetType_AvailableBetTypes [rel19]
alter table `availablebettypes`   drop foreign key `fk_availablebettypes_bettype`;
alter table `availablebettypes`  drop column  `bettype_oid`;
-- Bet_BetType [rel17]
alter table `bet`   drop foreign key `fk_bet_bettype`;
alter table `bet`  drop column  `bettype_oid`;
-- State_Event [rel16]
alter table `event`   drop foreign key `fk_event_state`;
alter table `event`  drop column  `state_oid`;
-- Bet_Event [rel15]
alter table `bet`   drop foreign key `fk_bet_event`;
alter table `bet`  drop column  `event_oid`;
-- Team_Player [rel14]
alter table `player`   drop foreign key `fk_player_team`;
alter table `player`  drop column  `team_oid`;
-- Event_TeamsPerEvent [rel12]
alter table `teamsperevent`   drop foreign key `fk_teamsperevent_event`;
alter table `teamsperevent`  drop column  `event_oid`;
-- TeamsPerEvent_Team [rel11]
alter table `teamsperevent`   drop foreign key `fk_teamsperevent_team`;
alter table `teamsperevent`  drop column  `team_oid`;
-- User_Bet [rel10]
alter table `bet`   drop foreign key `fk_bet_user`;
alter table `bet`  drop column  `user_oid`;
-- User_Group [User2Group_Group2User]
alter table `user_group`   drop foreign key `fk_user_group_group`;
alter table `user_group`   drop foreign key `fk_user_group_user`;
drop table `user_group`;
-- User_DefaultGroup [User2DefaultGroup_DefaultGroup2User]
alter table `user`   drop foreign key `fk_user_group`;
alter table `user`  drop column  `group_oid`;
-- Group_Module [Group2Module_Module2Group]
alter table `group_module`   drop foreign key `fk_group_module_module`;
alter table `group_module`   drop foreign key `fk_group_module_group`;
drop table `group_module`;
-- Group_DefaultModule [Group2DefaultModule_DefaultModule2Group]
alter table `group`   drop foreign key `fk_group_module`;
alter table `group`  drop column  `module_oid`;
-- Player [ent9]
drop table `player`;
-- TeamsPerEvent [ent8]
drop table `teamsperevent`;
-- Team [ent7]
drop table `team`;
-- BetType [ent6]
drop table `bettype`;
-- Sport [ent5]
drop table `sport`;
-- Result [ent4]
drop table `result`;
-- Event [ent3]
drop table `event`;
-- AvailableBetTypes [ent2]
drop table `availablebettypes`;
-- State [ent10]
drop table `state`;
-- Bet [ent1]
drop table `bet`;
-- User [User]
drop table `user`;
-- Module [Module]
drop table `module`;
-- Group [Group]
drop table `group`;
