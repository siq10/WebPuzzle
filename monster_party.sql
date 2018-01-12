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
(1, 'MAP0', 'SINGLEPLAYER', 'EASY'),
(2, 'MAP1', 'SINGLEPLAYER', 'MEDIUM');

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
(1, 'User0', 'password'),
(2, 'User1', 'password'),
(3, 'User2', 'password'),
(4, 'User3', 'password'),
(5, 'User4', 'password'),
(6, 'User5', 'password'),
(7, 'User6', 'password'),
(8, 'User7', 'password'),
(9, 'User8', 'password'),
(10, 'User9', 'password'),
(11, 'User10', 'password'),
(12, 'User11', 'password'),
(13, 'User12', 'password'),
(14, 'User13', 'password'),
(15, 'User14', 'password'),
(16, 'User15', 'password'),
(17, 'juan', 'roby');

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
(1, 0, 1, 2000, '00:01:20', 4, 1),
(2, 0, 2, 100, '00:01:20', 4, 1),
(3, 1, 1, 0, '00:01:20', 0, 0),
(4, 1, 2, 0, '00:01:20', 0, 0),
(5, 2, 1, 0, '00:01:20', 0, 0),
(6, 2, 2, 100, '00:01:20', 4, 1),
(7, 3, 1, 200, '00:01:20', 4, 1),
(8, 3, 2, 100, '00:01:20', 4, 1),
(9, 4, 1, 0, '00:01:20', 3, 0),
(10, 4, 2, 200, '00:01:20', 4, 1),
(11, 5, 1, 20, '00:01:20', 4, 1),
(12, 5, 2, 100, '00:01:20', 4, 1),
(13, 6, 1, 10, '00:01:20', 4, 1),
(14, 6, 2, 100, '00:01:20', 4, 1),
(15, 7, 1, 20, '00:01:20', 4, 1),
(16, 7, 2, 50, '00:01:20', 4, 1),
(17, 8, 1, 2000, '00:01:20', 4, 1),
(18, 8, 2, 1100, '00:01:20', 4, 1),
(19, 9, 1, 2000, '00:01:20', 4, 1),
(20, 9, 2, 1000, '00:01:20', 4, 1),
(21, 10, 1, 200, '00:01:20', 4, 1),
(22, 10, 2, 100, '00:01:20', 4, 1),
(23, 11, 1, 0, '00:01:20', 0, 0),
(24, 11, 2, 0, '00:01:20', 0, 0),
(25, 12, 1, 0, '00:01:20', 0, 0),
(26, 12, 2, 100, '00:01:20', 4, 1),
(27, 13, 1, 0, '00:01:20', 0, 0),
(28, 13, 2, 0, '00:01:20', 0, 0),
(29, 14, 1, 0, '00:01:20', 0, 0),
(30, 14, 2, 0, '00:01:20', 3, 0),
(31, 15, 1, 0, '00:01:20', 0, 0),
(32, 15, 2, 0, '00:01:20', 0, 0);

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
