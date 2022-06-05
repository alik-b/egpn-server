-- Course Project Phase II
-- Team Members: Aaron Gitell, Alik Balika, Alibile Ugas

--CREATE DATABASE EGPN;

-- ******************************** --
-- Part A: Create tables
-- ******************************** --
DROP TABLE IF EXISTS Players;
CREATE TABLE Players (
    team VARCHAR(20),
    tag VARCHAR(20) NOT NULL UNIQUE,
    game VARCHAR(20) NOT NULL,
    Primary key( tag)
);
DROP TABLE IF EXISTS Apex_Playoff_Teams;
CREATE TABLE Apex_Playoff_Teams (
    team VARCHAR(30),
    placement INT CHECK (placement >= 0),
    points INT CHECK (points >= 0),
    team_kills INT CHECK (team_kills >= 0),
    match_point VARCHAR(3) DEFAULT 'NO',
    PRIMARY KEY (TEAM)
);

DROP TABLE IF EXISTS Apex_Playoff_Players;
CREATE TABLE Apex_Playoff_Players (
    tag VARCHAR(20) NOT NULL REFERENCES Players (tag)
    ON DELETE CASCADE,
    team VARCHAR(30) NOT NULL,
    player_kills INT CHECK (player_kills >= 0),
    PRIMARY KEY (tag)
);

DROP TABLE IF EXISTS Valorant;
CREATE TABLE Valorant (
    tag VARCHAR(30) NOT NULL REFERENCES Players (tag)
    ON DELETE CASCADE,
    team VARCHAR(30) NOT NULL,
    rounds_played INT DEFAULT 0,
    kills INT DEFAULT 0,
    deaths INT DEFAULT 0,
    cl_percent INT DEFAULT 0,
    kd FLOAT DEFAULT 0,
    PRIMARY KEY (tag)
);

DROP TABLE IF EXISTS Call_Of_Duty;
CREATE TABLE Call_Of_Duty (
    tag VARCHAR(15) PRIMARY KEY REFERENCES Players (tag)
    ON DELETE CASCADE,
    kd FLOAT CHECK (kd >= 0),
    damage_per_life FLOAT CHECK (damage_per_life >= 0),
    kills_per_9_rounds FLOAT CHECK (kills_per_9_rounds >= 0),
    plants_per_round FLOAT CHECK (plants_per_round >= 0)
);

DROP TABLE IF EXISTS League_Of_Legends;
CREATE TABLE League_Of_Legends (
    tag VARCHAR(15) PRIMARY KEY REFERENCES Players (tag)
    ON DELETE CASCADE,
    wins INT CHECK (wins >= 0),
    losses INT CHECK (losses >= 0),
    total_kills INT CHECK (total_kills >= 0),
    total_deaths INT CHECK (total_deaths >= 0),
    total_assists INT CHECK (total_assists >= 0)
);



DROP TABLE IF EXISTS Siege;
Create Table Siege(
 tag		varchar(20) NOT NULL references Players(tag) On delete cascade,
 rating		float Check(rating >= 0) Default 0,
 kpr		float Check(kpr >= 0) Default 0,
 atkop		varchar(10) NOT NULL,
 defop		varchar(10) NOT NULL,
 Primary Key(Tag)
);
DROP TABLE IF EXISTS Rocket_League;    
 Create Table Rocket_League (
	 team	 VARCHAR(20) NOT NULL,
	 tag	 varchar(20)	NOT NULL references Players(tag) On delete cascade,
	 wins	 int Check(wins>=0) Default 0,
	 goals	 int Check(goals>=0) Default 0,
	 assists int Check(assists>=0) Default 0,
	 Primary key(Tag)
	 );

