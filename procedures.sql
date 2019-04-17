-- DADOS:

-- module
/*
insert into module values (1, "area5", "Betting App");


-- group_module
insert into group_module values (1,1);


-- user_group
insert into user_group values (1,1);
insert into user_group values (2,1);
*/

-- group 
insert into bettingwebapp.group(groupname) values ("Normal");
insert into bettingwebapp.group(groupname) values ("Premium");
insert into bettingwebapp.group(groupname) values ("Administrator");

-- users
insert into user(username, password, email, name, balance, group_oid) values ("maria", "pass", "maria@gmail.com", "Maria Carla", 10.0, 1);
insert into user(username, password, email, name, balance, group_oid) values ("joao", "pass", "maria@gmail.com", "Joao", 10.0, 2);
insert into user(username, password, email, name, balance, group_oid) values ("carlos", "pass", "maria@gmail.com", "Joao", 10.0, 3);

-- user_group
insert into user_group(user_oid, group_oid) values (1,1);
insert into user_group(user_oid, group_oid) values (2,2);
insert into user_group(user_oid, group_oid) values (3,1);

-- Sports
insert into sport(name) values("Football");
insert into sport(name) values("Futsal");
insert into sport(name) values("Volleyball");
insert into sport(name) values("Basketball");

-- States
insert into state(name) value("Opened");
insert into state(name) value("Closed");

-- Events

insert into event(startingdate, creationdate, finishingdate, ispremium, description, name, state_oid, sport_oid) values('2019-04-01 0:0', '2019-04-01 0:0', '2019-05-20 0:0', true, "Description of the game", "Benfica x Porto", 1, 1);
insert into event(startingdate, creationdate, finishingdate, ispremium, description, name, state_oid, sport_oid) values('2019-04-01 0:0', '2019-04-01 0:0', '2019-05-20 0:0', true, "Description of the game", "Benfica x Sporting", 1, 1);
insert into event(startingdate, creationdate, finishingdate, ispremium, description, name, state_oid, sport_oid) values('2019-04-01 0:0', '2019-04-01 0:0', '2019-05-20 0:0', true, "Description of the game", "Sporting x Anadia", 1, 2);
insert into event(startingdate, creationdate, finishingdate, ispremium, description, name, state_oid, sport_oid) values('2019-04-01 0:0', '2019-04-01 0:0', '2019-05-20 0:0', true, "Description of the game", "Real Madrid x Barcelona", 1, 2);
insert into event(startingdate, creationdate, finishingdate, ispremium, description, name, state_oid, sport_oid) values('2019-04-01 0:0', '2019-04-01 0:0', '2019-05-20 0:0', true, "Description of the game", "Benfica x Porto", 1, 1);


-- bettypes

Insert into bettype(name) values("1");
Insert into bettype(name) values("X");
Insert into bettype(name) values("2");
Insert into bettype(name) values("1 +0,5 goals");
Insert into bettype(name) values("1 +1,5 goals");
Insert into bettype(name) values("2 +0,5 goals");
Insert into bettype(name) values("2 +1,5 goals");
Insert into bettype(name) values("100 points");

Insert into bettype_sport(bettype_oid, sport_oid) values (1, 1);
Insert into bettype_sport(bettype_oid, sport_oid) values (2, 1);
Insert into bettype_sport(bettype_oid, sport_oid) values (3, 1);
Insert into bettype_sport(bettype_oid, sport_oid) values (4, 1);
Insert into bettype_sport(bettype_oid, sport_oid) values (5, 1);
Insert into bettype_sport(bettype_oid, sport_oid) values (6, 1);
Insert into bettype_sport(bettype_oid, sport_oid) values (7, 1);
Insert into bettype_sport(bettype_oid, sport_oid) values (8, 2);

-- available bet types
insert into availablebettypes(odd, betresult, bettype_oid, event_oid) values (1.35, null, 1, 1);
insert into availablebettypes(odd, betresult, bettype_oid, event_oid) values (1.5, null, 2, 1);
insert into availablebettypes(odd, betresult, bettype_oid, event_oid) values (2, null, 3, 1);

insert into availablebettypes(odd, betresult, bettype_oid, event_oid) values (1.35, null, 1, 2);
insert into availablebettypes(odd, betresult, bettype_oid, event_oid) values (1.5, null, 2, 2);
insert into availablebettypes(odd, betresult, bettype_oid, event_oid) values (2, null, 3, 2);

-- results
insert into result(name) values ("Open");
insert into result(name) values ("Won");
insert into result(name) values ("Lost");

-- bets
insert into bet(wager, user_oid, event_oid, bettype_oid, result_oid) values (2, 1, 1, 1, 1);
insert into bet(wager, user_oid, event_oid, bettype_oid, result_oid) values (4, 2, 1, 2, 1);
insert into bet(wager, user_oid, event_oid, bettype_oid, result_oid) values (4, 1, 2, 2, 1);


-- PROCEDURES

-- fechar um evento [ainda não terminado]
DELIMITER //
CREATE PROCEDURE close_event(IN i_eventId integer)
BEGIN
    declare v_sport_name varchar(15);
    declare v_bettype_id integer;
    declare v_oid integer;
    declare v_finished integer default 0;
    
    declare bets_validacao cursor for select oid, bettype_oid from availablebettypes where event_oid = i_eventId;    
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_finished = 1;
    
	-- obtem o nome do desporto associado ao evento
    select s.name into v_sport_name from event e, sport s where e.sport_oid = s.oid and e.event_oid = i_eventId;
    
    -- fecha o evento -> passa Closed, id = 2
    update event set event.state_oid = 2 where event.event_oid = i_eventId;
    
    -- obtém todas as AvailableBetTypes e define-as como válidas/inválidas
    
    open bets_validacao;
    avaliar: LOOP
		fetch bets_validacao into v_oid, v_bettype_id;
               
        call validar_bettype_com_stats(v_oid, v_bettype_id);
        
        -- verificar noutro procedimento com o switch
        -- obter se é valido/inválido e definir na tabela
        
        if v_finished = 1 then 
			leave avaliar;
        end if;
	
    end loop avaliar;
    close bets_validacao;
    
    -- de acordo com o desporto, validar com as respetivas estatisticas
    /*case v_sport_name
		when 'Soccer' then select 'hiii';
        when 'Futsal' then select 'futsal';
	end case;
    */
    -- Inserir as STATS? Adicionar stats anteriormente e passa-se para este procedimento o id da tabela [Stats].
    
END //
DELIMITER ;


-- validar apostas de acordo com a string do bettype
DELIMITER //
create procedure validar_bettype_com_stats(IN i_oid integer, IN i_bettype_id integer)
BEGIN
	declare v_sport_name varchar(50);
    
	select sport.name into v_sport_name from event, sport  where event.sport_oid = sport.oid and event.event_oid = i_oid;
    
    case v_sport_name
		when 'Football' then call validar_bettype_football(i_oid, i_bettype_id);
        when 'Basketball' then call validar_bettype_basketball(i_oid, i_bettype_id);
        else begin end;
	end case;
    
END //
DELIMITER ;




-- validar apostas para futebol
DELIMITER //
create procedure validar_bettype_football(IN i_oid integer, IN i_bettype_id integer)
BEGIN
    declare v_bet_name varchar(50);
    declare v_valid boolean;
    declare v_home_goals integer;
    declare v_away_goals integer;
    
	set v_valid = false;
    
    -- gameduration,awayyellowcards, homeyellowcards, awayredcards, homeredcards
    select name into v_bet_name from bettype where bettype.oid = i_bettype_id;
    
    select homegoals, awaygoals into v_home_goals, v_away_goals from event, stats, footballstats
    where stats.event_event_oid = event.event_oid and stats.oid = footballstats.stats_oid and event.event_oid = i_oid;
    
	select i_oid, v_home_goals, v_away_goals, v_valid;
  
    case v_bet_name
            WHEN '1' THEN 
				if v_home_goals > v_away_goals then
					set v_valid = true;
                    select 'Ganhou casa';
				end if;
            WHEN 'X' THEN if v_home_goals = v_away_goals then set v_valid = true; end if;
            WHEN '2' THEN if v_home_goals < v_away_goals then set v_valid = true; end if;
			WHEN '1 +0.5 goals' THEN if (v_home_goals - v_away_goals) > 0.5 then set v_valid = true; end if;
            WHEN '1 +1.5 goals' then if (v_home_goals - v_away_goals) > 1.5 then set v_valid = true; end if;
        else begin
			select 'nenhuma condicao';
        end;
	end case;
    
    
  
    
    -- result = 1 válida, 0 - perdida
    if v_valid then
		update availablebettypes set betresult = 1 where oid=i_oid;
	else 
		update availablebettypes set betresult = 0 where oid=i_oid;
	end if;

END //
DELIMITER ;


-- validar apostas para basketball
DELIMITER //
create procedure validar_bettype_basketball(IN i_oid integer, IN i_bettype_id integer)
BEGIN
    declare v_bet_name varchar(50);
	declare v_valid boolean;
    declare v_home_points integer;
    declare v_away_points integer;
    declare v_home_triples integer;
    declare v_away_triples integer;
    
	set v_valid = false;
    set v_home_points = 103;
    set v_away_points = 90;
    set v_home_triples = 10;
    set v_away_triples = 6;
    
    select name into v_bet_name from bettype where bettype.oid = i_bettype_id;
    
    case v_bet_name
            WHEN '1' THEN if v_home_points > v_away_points then set v_valid = true; end if;
            WHEN 'X' THEN if v_home_points = v_away_points then set v_valid = true; end if;
            WHEN '2' THEN if v_home_points < v_away_points then set v_valid = true; end if;
        else begin end;
	end case;
    
    -- result = 1 válida, 0 - perdida
    if v_valid then
		update availablebettypes set betresult = 1 where oid=i_oid;
	end if;
    
    select i_oid;
END //
DELIMITER ;



-- definir bet results para todas as bets de um evento

DELIMITER //
create procedure set_result_of_bets_by_event(IN i_eventId integer)
BEGIN
	
    declare v_bet_id integer;
    declare v_bet_result integer;
    declare v_user_id integer;
    declare v_wager float;
    declare v_odd float;
    declare v_user_balance float;
    declare v_balance float;
    declare v_finished integer default 0;
    declare v_result_oid integer;
    
    declare bets_results cursor for select b.oid, availablebettypes.betresult,b.user_oid, b.wager, availablebettypes.odd, b.result_oid from event e, bet b, availablebettypes 
	where e.event_oid = i_eventId and
	    b.event_oid = e.event_oid and
        availablebettypes.bettype_oid = b.bettype_oid 
        and availablebettypes.event_oid = i_eventId;
        
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_finished = 1;
    
    select b.oid, availablebettypes.betresult,b.user_oid, b.wager, availablebettypes.odd, b.result_oid from event e, bet b, availablebettypes where e.event_oid = 1 and
	    b.event_oid = e.event_oid and
        availablebettypes.bettype_oid = b.bettype_oid and availablebettypes.event_oid = 1;
	
    open bets_results;
    percorrer_bets: LOOP

		fetch bets_results into v_bet_id, v_bet_result, v_user_id, v_wager, v_odd, v_result_oid;
        
        select v_bet_id, v_bet_result, v_user_id, v_wager, v_odd, v_result_oid, i_eventId;
        -- verifica se a bet ainda se encontra como resultado OPENED
        if v_result_oid = 1 then
			-- id ganho = 2, perdido = 3
			if v_bet_result = 1 then
				set v_result_oid = 2;
				update bet set bet.result_oid = v_result_oid where bet.oid = v_bet_id;
				select balance into v_balance from user where user.oid = v_user_id;
				set v_balance = v_balance + v_wager * v_odd;
				update user set balance = round(v_balance, 2) where user.oid = v_user_id;
			else
				set v_result_oid = 3;
				update bet set bet.result_oid = v_result_oid where bet.oid = v_bet_id;
			end if;	
        end if;
        
        if v_finished = 1 then 
			leave percorrer_bets;
		end if;
        
    END LOOP;
    close bets_results;

END //
DELIMITER ;

-- alterar
DELIMITER //
CREATE PROCEDURE place_bet(IN wager float, IN userid integer, IN Eventid integer, IN betTypeid integer, IN resultid integer, OUT place boolean)
BEGIN
	declare current_balance float;
    select balance into current_balance from user where user.oid = userid;
    
    -- TODO : verificar se o evento ainda não terminou
    
    if current_balance > wager then
		update user set balance = (balance - wager) where oid = userid;
		insert into bet(wager, user_oid, event_oid, bettype_oid, result_oid) values(wager, userid, Eventid, betTypeid, resultid);
		set place = true;
	else
		set place = false;
	end if;
END //
DELIMITER ;


-- Check premium 
DELIMITER //
CREATE PROCEDURE Check_Premium(IN inid INT, out prem boolean)
BEGIN
    declare idgroup integer;
    declare groupuser varchar(255);
    select user_group.group_oid into idgroup from user_group where user_oid = inid;
    select bettest.group.groupname into groupuser from bettest.group where bettest.group.oid = idgroup;
    if(groupuser="PremiumUser")then
        set prem=true;
    end if;
END //
DELIMITER ;


-- Add_User
DELIMITER //
CREATE PROCEDURE Add_User(In inid integer, IN inusername varchar(255), IN inpassword varchar(255), IN inname varchar(255), IN inemail varchar(255), IN inbalance float, out estado varchar(255))
BEGIN
	DECLARE iduser integer;
	select user.oid into iduser from user where user.username = inusername;
    if(iduser is null) then
		INSERT INTO `bettest`.`user` (`oid`, `username`, `password`, `email`, `name`, `balance`) VALUES (inid, inusername, inpassword, inemail, inname, inbalance);
        set estado = "Adicionado";
	else
		set estado = "Username já existe";
	end if;
END //
DELIMITER ;


-- football stats
DELIMITER //
CREATE PROCEDURE add_football_stats(IN i_gameduration integer, IN i_eventid integer, In i_awaygoals integer, In i_awayredcards integer,In i_awayyellowcards integer,In i_homegoals integer,In i_homeredcards integer,In i_homeyellowcards integer, OUT msg varchar(255))
BEGIN
    declare v_statsid Integer;
    declare v_checkstatsid Integer;
    select oid into v_checkstatsid from stats where event_event_oid = i_eventid;
    if(v_checkstatsid is null) then
    Insert into stats(gameduration, event_event_oid) values (i_gameduration, i_eventid);
    SELECT LAST_INSERT_ID() into v_statsid;
    insert into footballstats(stats_oid, homegoals, awaygoals, awayyellowcards, homeyellowcards, awayredcards, homeredcards) values (v_statsid, i_homegoals, i_awaygoals, i_awayyellowcards, i_homeyellowcards, i_awayredcards, i_homeredcards);
    set msg = "Stats added with success";
    else
    set msg = "Stats already added";
    end if;
END //
DELIMITER ;

-- basketball stats
DELIMITER //
CREATE PROCEDURE add_basketball_stats(IN i_gameduration integer, IN i_eventid integer, In i_homepoints integer, In i_awaytriples integer,In i_hometriples integer,In i_awaypoints integer, OUT msg varchar(255))
BEGIN
    declare v_statsid Integer;
    declare v_checkstatsid Integer;
    select oid into v_checkstatsid from stats where event_event_oid = i_eventid;
    if(v_checkstatsid is null) then
    Insert into stats(gameduration, event_event_oid) values (i_gameduration, i_eventid);
    SELECT LAST_INSERT_ID() into v_statsid;
    insert into basketballstats(stats_oid, homepoints, awaytriples, hometriples, awaypoints) 
    values (v_statsid, i_homepoints, i_awaytriples, i_hometriples, i_awaypoints);
    set msg = "Stats added with success";
    else
    set msg = "Stats already added";
    end if;
END //
DELIMITER ;

-- deposito de balance num utilizador
DELIMITER //
create procedure deposit_balance(IN i_userid integer, IN i_balance float)
BEGIN 
	declare max_deposit float;
    set max_deposit = 100;
    
    if i_balance <= max_deposit then
		update user set balance = round(balance + i_balance, 2) where user.oid = i_userid;
    end if;
END //
DELIMITER ;

-- levantamento de balance
DELIMITER //
create procedure withdraw_balance(IN i_userid integer, IN i_value float)
BEGIN 
	declare max_withdraw float;
    
    select balance into max_withdraw from user where user.oid = i_userid;
    
    if i_value <= max_withdraw then
		update user set balance = round(balance - max_withdraw, 2) where user.oid = i_userid;
    end if;
END //
DELIMITER ;



-- Dados de procedimentos
-- add_football_stats(i_gameduration, i_eventid ,i_awaygoals,i_awayredcards, i_awayyellowcards, i_homegoals,
-- i_homeredcards, i_homeyellowcards, OUT msg varchar(255))

call add_football_stats(95, 1, 0, 1,2,3,0,3, @msg);
call close_event(1);
call set_result_of_bets_by_event(1);


select b.oid, a.betresult,b.user_oid, b.wager, a.odd, b.result_oid from event e, bet b, availablebettypes a where 
    b.event_oid = e.event_oid and b.bettype_oid = a.bettype_oid and e.event_oid = 1;
    
select * from event e, availablebettypes a where e.event_oid = 1 and
	    a.event_oid = e.event_oid;

select * from availablebettypes;

select b.oid, availablebettypes.betresult,b.user_oid, b.wager, availablebettypes.odd, b.result_oid from event e, bet b, availablebettypes where e.event_oid = 1 and
	    b.event_oid = e.event_oid and
        availablebettypes.bettype_oid = b.bettype_oid and availablebettypes.event_oid = 1;
select * from bet;