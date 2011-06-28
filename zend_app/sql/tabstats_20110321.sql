-- phpMyAdmin SQL Dump
-- version 2.11.7.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 21, 2011 at 09:19 PM
-- Server version: 5.0.41
-- PHP Version: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `tabstats`
--

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL auto_increment,
  `date` varchar(255) NOT NULL,
  `location_id` int(11) NOT NULL,
  `season_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `opposing_team_id` int(11) NOT NULL,
  `opposing_team_score` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `games`
--

INSERT INTO `games` VALUES(1, '2011-02-03', 2, 1, 1, 4, 80);

-- --------------------------------------------------------

--
-- Table structure for table `game_player`
--

CREATE TABLE `game_player` (
  `id` int(11) NOT NULL auto_increment,
  `player_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `fgm` int(11) NOT NULL,
  `fga` int(11) NOT NULL,
  `ftm` int(11) NOT NULL,
  `fta` int(11) NOT NULL,
  `3pm` int(11) NOT NULL,
  `3pa` int(11) NOT NULL,
  `oreb` int(11) NOT NULL,
  `dreb` int(11) NOT NULL,
  `ast` int(11) NOT NULL,
  `stl` int(11) NOT NULL,
  `blks` int(11) NOT NULL,
  `to` int(11) NOT NULL,
  `pf` int(11) NOT NULL,
  `pts` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `game_player`
--

INSERT INTO `game_player` VALUES(1, 1, 1, 3, 15, 2, 3, 0, 1, 0, 6, 1, 0, 0, 4, 0, 8);
INSERT INTO `game_player` VALUES(2, 2, 1, 2, 6, 1, 2, 0, 0, 0, 4, 3, 0, 0, 3, 0, 5);
INSERT INTO `game_player` VALUES(3, 3, 1, 5, 10, 2, 2, 0, 0, 0, 11, 1, 0, 0, 3, 0, 12);
INSERT INTO `game_player` VALUES(4, 4, 1, 0, 6, 0, 0, 0, 2, 0, 4, 1, 0, 1, 0, 0, 0);
INSERT INTO `game_player` VALUES(5, 5, 1, 3, 7, 0, 0, 0, 1, 0, 4, 1, 2, 0, 8, 0, 6);
INSERT INTO `game_player` VALUES(6, 6, 1, 1, 9, 1, 6, 1, 3, 0, 1, 1, 1, 0, 7, 0, 4);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `player_id` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `images`
--


-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` VALUES(1, 'Beaverton Hoop Ct #4');
INSERT INTO `locations` VALUES(2, 'Beaverton Hoop Ct #1');
INSERT INTO `locations` VALUES(3, 'Beaverton Hoop Ct #2');
INSERT INTO `locations` VALUES(4, 'Beaverton Hoop Ct #3');
INSERT INTO `locations` VALUES(5, 'Cascade College');
INSERT INTO `locations` VALUES(6, 'Portland Courts');
INSERT INTO `locations` VALUES(7, 'SPARC');
INSERT INTO `locations` VALUES(8, 'Ballys Fitness Back Gym');
INSERT INTO `locations` VALUES(9, 'Ballys Fitness Front Gym');

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL auto_increment,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `jersey_number` int(11) NOT NULL,
  `height_feet` int(11) NOT NULL,
  `height_inches` int(11) NOT NULL default '0',
  `weight` int(11) NOT NULL,
  `age` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `image_id` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `players`
--

INSERT INTO `players` VALUES(1, 'Gerardo', 'Rodriguez', 14, 5, 9, 178, 28, 1, 1);
INSERT INTO `players` VALUES(2, 'Damir', 'Tuka', 8, 6, 0, 0, 0, 1, 1);
INSERT INTO `players` VALUES(3, 'Jeff', 'Homuth', 0, 6, 0, 0, 0, 1, 1);
INSERT INTO `players` VALUES(4, 'Dave', 'Montgomery', 0, 6, 0, 0, 0, 1, 1);
INSERT INTO `players` VALUES(5, 'Chris', 'Rohde', 4, 6, 0, 0, 0, 1, 1);
INSERT INTO `players` VALUES(6, 'Chris (Kit)', 'Dennett', 11, 6, 0, 0, 0, 1, 1);
INSERT INTO `players` VALUES(7, 'Earl', 'Swigert', 22, 6, 0, 0, 0, 1, 1);
INSERT INTO `players` VALUES(8, 'Patrick', 'Brandimore', 0, 6, 0, 0, 0, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `seasons`
--

CREATE TABLE `seasons` (
  `id` int(11) NOT NULL auto_increment,
  `season_title_id` int(11) NOT NULL,
  `start_date` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `seasons`
--

INSERT INTO `seasons` VALUES(1, 4, '2011-01-24');

-- --------------------------------------------------------

--
-- Table structure for table `seasons_titles`
--

CREATE TABLE `seasons_titles` (
  `id` int(11) NOT NULL auto_increment,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `seasons_titles`
--

INSERT INTO `seasons_titles` VALUES(1, 'Fall 1');
INSERT INTO `seasons_titles` VALUES(2, 'Fall 2');
INSERT INTO `seasons_titles` VALUES(3, 'Winter 1');
INSERT INTO `seasons_titles` VALUES(4, 'Winter 2');
INSERT INTO `seasons_titles` VALUES(5, 'Spring 1');
INSERT INTO `seasons_titles` VALUES(6, 'Spring 2');
INSERT INTO `seasons_titles` VALUES(7, 'Summer 1');
INSERT INTO `seasons_titles` VALUES(8, 'Summer 2');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` VALUES(1, 'Hardwood Addicts');
INSERT INTO `teams` VALUES(2, 'Gladstoners');
INSERT INTO `teams` VALUES(3, 'Verbal Kints');
INSERT INTO `teams` VALUES(4, 'Beaverton Arsenal');
INSERT INTO `teams` VALUES(5, 'Team Friendship');
INSERT INTO `teams` VALUES(6, 'Double Dribble');
INSERT INTO `teams` VALUES(7, 'The Andre Miller Express');
INSERT INTO `teams` VALUES(8, 'Rasheed''s Bald Spot');
INSERT INTO `teams` VALUES(9, 'Trees');
INSERT INTO `teams` VALUES(10, 'Haymakers');
INSERT INTO `teams` VALUES(11, 'High Jumpers');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL auto_increment,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` VALUES(1, 'Gerardo ', 'Rodriguez', 'ger.rod34@gmail.com', 'gerardo_rodriguez', '20OTYu/sN1G72');
INSERT INTO `users` VALUES(2, 'G', 'R', 'asdf', 'asdf', '91UyKrVyfn.AM');

-- --------------------------------------------------------

--
-- Table structure for table `user_season`
--

CREATE TABLE `user_season` (
  `id` int(11) NOT NULL auto_increment,
  `user_id` int(11) NOT NULL,
  `season_id` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `user_season`
--

