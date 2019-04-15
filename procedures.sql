-- DADOS:

-- module
/*
insert into module values (1, "area5", "Betting App");

-- group 
insert into bettingwebapp.group values (1, "Normal", 1);

-- group_module
insert into group_module values (1,1);


-- user_group
insert into user_group values (1,1);
insert into user_group values (2,1);
*/

-- users
insert into user(username, password, email, name, balance) values ("maria", "pass", "maria@gmail.com", "Maria Carla", 15.0);
insert into user(username, password, email, name, balance) values ("joao", "pass", "maria@gmail.com", "Joao", 15.0);

-- Sports
insert into sport(name) values("Soccer");
insert into sport(name) values("Futsal");
insert into sport(name) values("Volleyball");
insert into sport(name) values("Basketball");

-- States
insert into state(name) value("Opened");
insert into state(name) value("Closed");

-- Events

insert into event(startingdate, creationdate, finishingdate, ispremium, description, name, state_oid, sport_oid) values('2019-04-01 0:0', '2019-04-01 0:0', '2019-05-20 0:0', true, "Description of the game", "Benfica x Porto", 1, 1);

insert into event(startingdate, creationdate, finishingdate, ispremium, description, name, state_oid, sport_oid) values('2019-04-01 0:0', '2019-04-01 0:0', '2019-05-20 0:0', true, "Description of the game", "Benfica x Sporting", 1, 1);

insert into event(startingdate, creationdate, finishingdate, ispremium, description, name, state_oid, sport_oid) values('2019-04-01 0:0', '2019-04-01 0:0', '2019-05-20 0:0', true, "Description of the game", "Sporting x Anadia", 1, 1);

insert into event(startingdate, creationdate, finishingdate, ispremium, description, name, state_oid, sport_oid) values('2019-04-01 0:0', '2019-04-01 0:0', '2019-05-20 0:0', true, "Description of the game", "Real Madrid x Barcelona", 1, 1);

insert into event(startingdate, creationdate, finishingdate, ispremium, description, name, state_oid, sport_oid) values('2019-04-01 0:0', '2019-04-01 0:0', '2019-05-20 0:0', true, "Description of the game", "Benfica x Porto", 1, 1);


-- bettypes

Insert into bettype(name) values("1 +2,5 golos");
Insert into bettype(name) values("1 -2,5 golos");
Insert into bettype(name) values("2 +2,5 golos");
Insert into bettype(name) values("2 -2,5 golos");
Insert into bettype(name) values("1 Vence primeiro set");

Insert into bettype_sport values (1, 1);
Insert into bettype_sport values (2, 1);
Insert into bettype_sport values (3, 1);
Insert into bettype_sport values (4, 1);
Insert into bettype_sport values (5, 2);
/*
-- PROCEDURES:

------------------------------------------------------------------------------------------------------------------------------------------
--place_bet

CREATE DEFINER=`userEW`@`localhost` PROCEDURE `place_bet`(IN wager float, IN userid integer, IN Eventid integer, IN betTypeid integer, IN resultid integer, OUT place boolean)
BEGIN
	update user set balance = (balance - wager) where oid = userid;
    insert into bet(wager, user_oid, event_oid, bettype_oid, result_oid) values(wager, userid, Eventid, betTypeid, resultid);
	set place =true;
END

-------------------------------------------------------------------------------------------------------------------------------------------

--Add_User

CREATE DEFINER=`userEW`@`localhost` PROCEDURE `Add_User`(In inid integer, IN inusername varchar(255), IN inpassword varchar(255), IN inname varchar(255), IN inemail varchar(255), IN inbalance float, out estado varchar(255))
BEGIN
	DECLARE iduser integer;
	select user.oid into iduser from user where user.username = inusername;
    if(iduser is null) then
		INSERT INTO `bettest`.`user` (`oid`, `username`, `password`, `email`, `name`, `balance`) VALUES (inid, inusername, inpassword, inemail, inname, inbalance);
        set estado = "Adicionado";
	else
		set estado = "Username já existe";
	end if;
END

-------------------------------------------------------------------------------------------------------------------------------------------

*/
