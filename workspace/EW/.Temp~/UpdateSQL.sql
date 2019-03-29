-- Group [Group]
create table `group` (
   `oid`  integer  not null,
   `groupname`  varchar(255),
  primary key (`oid`)
);


-- Module [Module]
create table `module` (
   `oid`  integer  not null,
   `moduleid`  varchar(255),
   `modulename`  varchar(255),
  primary key (`oid`)
);


-- User [User]
create table `user` (
   `oid`  integer  not null,
   `username`  varchar(255),
   `password`  varchar(255),
   `email`  varchar(255),
   `name`  varchar(255),
   `balance`  double precision,
  primary key (`oid`)
);


-- Bet [ent1]
create table `bet` (
   `oid`  integer  not null,
   `wager`  double precision,
   `result`  varchar(255),
  primary key (`oid`)
);


-- State [ent10]
create table `state` (
   `oid`  integer  not null,
   `name`  varchar(255),
  primary key (`oid`)
);


-- AvailableBetTypes [ent2]
create table `availablebettypes` (
   `oid`  integer  not null,
  primary key (`oid`)
);


-- Event [ent3]
create table `event` (
   `oid`  integer  not null,
   `finishingdate`  date,
   `startingdate`  date,
   `creationdate`  date,
   `ispremium`  bit,
   `description`  varchar(255),
   `name`  varchar(255),
  primary key (`oid`)
);


-- Result [ent4]
create table `result` (
   `oid`  integer  not null,
   `name`  varchar(255),
  primary key (`oid`)
);


-- Sport [ent5]
create table `sport` (
   `oid`  integer  not null,
  primary key (`oid`)
);


-- BetType [ent6]
create table `bettype` (
   `oid`  integer  not null,
  primary key (`oid`)
);


-- Team [ent7]
create table `team` (
   `oid`  integer  not null,
  primary key (`oid`)
);


-- TeamsPerEvent [ent8]
create table `teamsperevent` (
   `oid`  integer  not null,
  primary key (`oid`)
);


-- Player [ent9]
create table `player` (
   `oid`  integer  not null,
  primary key (`oid`)
);


-- Group_DefaultModule [Group2DefaultModule_DefaultModule2Group]
alter table `group`  add column  `module_oid`  integer;
alter table `group`   add index fk_group_module (`module_oid`), add constraint fk_group_module foreign key (`module_oid`) references `module` (`oid`);


-- Group_Module [Group2Module_Module2Group]
create table `group_module` (
   `group_oid`  integer not null,
   `module_oid`  integer not null,
  primary key (`group_oid`, `module_oid`)
);
alter table `group_module`   add index fk_group_module_group (`group_oid`), add constraint fk_group_module_group foreign key (`group_oid`) references `group` (`oid`);
alter table `group_module`   add index fk_group_module_module (`module_oid`), add constraint fk_group_module_module foreign key (`module_oid`) references `module` (`oid`);


-- User_DefaultGroup [User2DefaultGroup_DefaultGroup2User]
alter table `user`  add column  `group_oid`  integer;
alter table `user`   add index fk_user_group (`group_oid`), add constraint fk_user_group foreign key (`group_oid`) references `group` (`oid`);


-- User_Group [User2Group_Group2User]
create table `user_group` (
   `user_oid`  integer not null,
   `group_oid`  integer not null,
  primary key (`user_oid`, `group_oid`)
);
alter table `user_group`   add index fk_user_group_user (`user_oid`), add constraint fk_user_group_user foreign key (`user_oid`) references `user` (`oid`);
alter table `user_group`   add index fk_user_group_group (`group_oid`), add constraint fk_user_group_group foreign key (`group_oid`) references `group` (`oid`);


-- User_Bet [rel1]
alter table `user`  add column  `bet_oid`  integer;
alter table `user`   add index fk_user_bet (`bet_oid`), add constraint fk_user_bet foreign key (`bet_oid`) references `bet` (`oid`);


-- Event_TeamsPerEvent [rel12]
alter table `event`  add column  `teamsperevent_oid`  integer;
alter table `event`   add index fk_event_teamsperevent (`teamsperevent_oid`), add constraint fk_event_teamsperevent foreign key (`teamsperevent_oid`) references `teamsperevent` (`oid`);


-- TeamsPerEvent_Team [rel13]
alter table `team`  add column  `teamsperevent_oid`  integer;
alter table `team`   add index fk_team_teamsperevent (`teamsperevent_oid`), add constraint fk_team_teamsperevent foreign key (`teamsperevent_oid`) references `teamsperevent` (`oid`);


-- Team_Player [rel2]
alter table `team`  add column  `player_oid`  integer;
alter table `team`   add index fk_team_player (`player_oid`), add constraint fk_team_player foreign key (`player_oid`) references `player` (`oid`);


-- Bet_Event [rel3]
alter table `event`  add column  `bet_oid`  integer;
alter table `event`   add index fk_event_bet (`bet_oid`), add constraint fk_event_bet foreign key (`bet_oid`) references `bet` (`oid`);


-- BetType_Event [rel4]
alter table `event`  add column  `availablebettypes_oid`  integer;
alter table `event`   add index fk_event_availablebettypes (`availablebettypes_oid`), add constraint fk_event_availablebettypes foreign key (`availablebettypes_oid`) references `availablebettypes` (`oid`);


-- Result_Bet [rel5]
alter table `result`  add column  `bet_oid`  integer;
alter table `result`   add index fk_result_bet (`bet_oid`), add constraint fk_result_bet foreign key (`bet_oid`) references `bet` (`oid`);


-- Sport_Event [rel6]
alter table `sport`  add column  `event_oid`  integer;
alter table `sport`   add index fk_sport_event (`event_oid`), add constraint fk_sport_event foreign key (`event_oid`) references `event` (`oid`);


-- BetType_AvailableBetTypes [rel7]
alter table `bettype`  add column  `availablebettypes_oid`  integer;
alter table `bettype`   add index fk_bettype_availablebettypes (`availablebettypes_oid`), add constraint fk_bettype_availablebettypes foreign key (`availablebettypes_oid`) references `availablebettypes` (`oid`);


-- Bet_BetType [rel8]
alter table `bettype`  add column  `bet_oid`  integer;
alter table `bettype`   add index fk_bettype_bet (`bet_oid`), add constraint fk_bettype_bet foreign key (`bet_oid`) references `bet` (`oid`);


-- Event_State [rel9]
alter table `state`  add column  `event_oid`  integer;
alter table `state`   add index fk_state_event (`event_oid`), add constraint fk_state_event foreign key (`event_oid`) references `event` (`oid`);


