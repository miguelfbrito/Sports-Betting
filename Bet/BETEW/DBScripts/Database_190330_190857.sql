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
   `odd`  double precision,
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
   `name`  varchar(255),
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


-- User_Bet [rel10]
alter table `bet`  add column  `user_oid`  integer;
alter table `bet`   add index fk_bet_user (`user_oid`), add constraint fk_bet_user foreign key (`user_oid`) references `user` (`oid`);


-- TeamsPerEvent_Team [rel11]
alter table `teamsperevent`  add column  `team_oid`  integer;
alter table `teamsperevent`   add index fk_teamsperevent_team (`team_oid`), add constraint fk_teamsperevent_team foreign key (`team_oid`) references `team` (`oid`);


-- Event_TeamsPerEvent [rel12]
alter table `teamsperevent`  add column  `event_oid`  integer;
alter table `teamsperevent`   add index fk_teamsperevent_event (`event_oid`), add constraint fk_teamsperevent_event foreign key (`event_oid`) references `event` (`oid`);


-- Team_Player [rel14]
alter table `player`  add column  `team_oid`  integer;
alter table `player`   add index fk_player_team (`team_oid`), add constraint fk_player_team foreign key (`team_oid`) references `team` (`oid`);


-- Bet_Event [rel15]
alter table `bet`  add column  `event_oid`  integer;
alter table `bet`   add index fk_bet_event (`event_oid`), add constraint fk_bet_event foreign key (`event_oid`) references `event` (`oid`);


-- State_Event [rel16]
alter table `event`  add column  `state_oid`  integer;
alter table `event`   add index fk_event_state (`state_oid`), add constraint fk_event_state foreign key (`state_oid`) references `state` (`oid`);


-- Bet_BetType [rel17]
alter table `bet`  add column  `bettype_oid`  integer;
alter table `bet`   add index fk_bet_bettype (`bettype_oid`), add constraint fk_bet_bettype foreign key (`bettype_oid`) references `bettype` (`oid`);


-- BetType_AvailableBetTypes [rel19]
alter table `availablebettypes`  add column  `bettype_oid`  integer;
alter table `availablebettypes`   add index fk_availablebettypes_bettype (`bettype_oid`), add constraint fk_availablebettypes_bettype foreign key (`bettype_oid`) references `bettype` (`oid`);


-- AvailableBetTypes_Event [rel20]
alter table `availablebettypes`  add column  `event_oid`  integer;
alter table `availablebettypes`   add index fk_availablebettypes_event (`event_oid`), add constraint fk_availablebettypes_event foreign key (`event_oid`) references `event` (`oid`);


-- Result_Bet [rel21]
alter table `bet`  add column  `result_oid`  integer;
alter table `bet`   add index fk_bet_result (`result_oid`), add constraint fk_bet_result foreign key (`result_oid`) references `result` (`oid`);


-- Sport_Event [rel22]
alter table `event`  add column  `sport_oid`  integer;
alter table `event`   add index fk_event_sport (`sport_oid`), add constraint fk_event_sport foreign key (`sport_oid`) references `sport` (`oid`);


