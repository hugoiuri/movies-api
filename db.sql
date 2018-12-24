CREATE DATABASE moviedb2;

USE moviedb2;

CREATE TABLE `Movie` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `photo_url` char(32) NOT NULL,
  `length` int(11) NOT NULL,
  `released_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

CREATE TABLE `Star` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `photo_url` char(32) NOT NULL,
  `is_actor` tinyint(1) NOT NULL,
  `is_director` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

CREATE TABLE `User` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `fbToken` varchar(300) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `photo_url` char(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

CREATE TABLE `StarMovie` (
  `id` int(10) unsigned NOT NULL,
  `movie_id` int(10) unsigned NOT NULL,
  `star_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_MovieID_idx` (`movie_id`),
  KEY `FK_StarID_idx` (`star_id`),
  CONSTRAINT `FK_MovieID` FOREIGN KEY (`movie_id`) REFERENCES `Movie` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_StarID` FOREIGN KEY (`star_id`) REFERENCES `Star` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `UserMovie` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `toWatch` tinyint(1) NOT NULL,
  `watched` tinyint(1) NOT NULL,
  `favorite` tinyint(1) NOT NULL,
  `review` tinyint(4) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `movie_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_UserMovieID_idx` (`movie_id`),
  KEY `FK_UserID_idx` (`user_id`),
  CONSTRAINT `FK_UserID` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_UserMovieID` FOREIGN KEY (`movie_id`) REFERENCES `Movie` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

INSERT INTO Movie VALUES (1,'The Matrix','the-matrix.jpg',136,'1999-03-31'),(2,'The Matrix Reloaded','the-matrix.jpg-2',138,'2003-05-15'),(3,'The Matrix Revolution','the-matrix.jpg-3',129,'2003-11-05');

INSERT INTO Star VALUES (1,'Keanu Reeves','keanu_reeves.jpg',1,0),(3,'Laurence Fishburne','laurence_fishburne.jpg',1,0);

INSERT INTO User VALUES (1,'bob@gmail.com','','Rafael Reis','rafael-reis.jpg');

INSERT INTO StarMovie VALUES (0,1,1),(1,1,3);

INSERT INTO UserMovie VALUES (1,0,1,1,9,1,1);