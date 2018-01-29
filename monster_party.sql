-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 12 Ian 2018 la 22:40
-- Versiune server: 10.1.22-MariaDB
-- PHP Version: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `monster_party`
--

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `map`
--

CREATE TABLE `map` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(256) NOT NULL,
  `TYPE` varchar(256) NOT NULL,
  `DIFICULTY` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Salvarea datelor din tabel `map`
--

INSERT INTO `map` (`ID`, `NAME`, `TYPE`, `DIFICULTY`) VALUES
(1, 'GEO1', 'SINGLE', 'MEDIUM'),
(2, 'GEO2', 'COOP', 'HARD'),
(3, 'DEEA1', 'COOP', 'HARD'),
(4, 'DEEA2', 'SINGLE', 'MEDIUM'),
(5, 'ROBI1', 'COOP', 'HARD');

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `USERNAME` varchar(256) NOT NULL,
  `PASSWORD` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Salvarea datelor din tabel `user`
--

INSERT INTO `user` (`ID`, `USERNAME`, `PASSWORD`) VALUES
(0, 'User0', 'password'),
(1, 'User1', 'password'),
(2, 'User2', 'password'),
(3, 'User3', 'password'),
(4, 'User4', 'password'),
(5, 'User5', 'password'),
(6, 'User6', 'password'),
(7, 'User7', 'password'),
(8, 'User8', 'password'),
(9, 'User9', 'password'),
(10, 'User10', 'password'),
(11, 'User11', 'password'),
(12, 'User12', 'password'),
(13, 'User13', 'password'),
(14, 'User14', 'password'),
(15, 'User15', 'password');

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `user_map`
--

CREATE TABLE `user_map` (
  `ID` int(11) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  `MAP_ID` int(11) NOT NULL,
  `SCORE` int(11) NOT NULL,
  `TIME` time NOT NULL,
  `ATTEMPTS` int(11) NOT NULL,
  `COMPLETED` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Salvarea datelor din tabel `user_map`
--

INSERT INTO `user_map` (`ID`, `USER_ID`, `MAP_ID`, `SCORE`, `TIME`, `ATTEMPTS`, `COMPLETED`) VALUES
(1, 1, 2, 506, '00:00:00', 2, 1),
(2, 1, 5, 300, '00:00:00', 6, 1),
(3, 0, 1, 500, '00:00:00', 3, 1),
(4, 0, 2, 510, '00:00:00', 3, 1),
(5, 0, 3, 750, '00:00:00', 9, 1),
(8, 9, 4, 120, '00:00:00', 1, 1),
(9, 9, 1, 489, '00:00:00', 1, 1),
(10, 9, 2, 481, '00:00:00', 1, 1),
(11, 0, 5, 480, '00:00:00', 5, 1),
(12, 7, 3, 750, '00:00:00', 2, 1),
(13, 7, 4, 190, '00:00:00', 1, 1),
(14, 7, 5, 240, '00:00:00', 1, 1),
(15, 3, 5, 100, '00:00:00', 1, 1),
(16, 6, 5, 60, '00:00:00', 1, 1);


--
-- Indexes for dumped tables
--

--
-- Indexes for table `map`
--
ALTER TABLE `map`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `NAME` (`NAME`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `USERNAME` (`USERNAME`);

--
-- Indexes for table `user_map`
--
ALTER TABLE `user_map`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `map`
--
ALTER TABLE `map`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `user_map`
--
ALTER TABLE `user_map`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
