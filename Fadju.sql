CREATE DATABASE Fadju;

USE Fadju;

CREATE TABLE `Preuve` (
  `id` int auto_increment,
  `nom` varchar(100),
  `url` varchar(100),
  CONSTRAINT pk_Preuve PRIMARY KEY (id)
);

CREATE TABLE `Utilisateur` (
  `id` int auto_increment,
  `nom` varchar(50),
  `prenom` varchar(100),
  `adresse` varchar(200),
  `mail` varchar(100),
  `password` varchar(70),
  `conf_password` varchar(70),
  CONSTRAINT pk_Utilisateur PRIMARY KEY (id)
);

CREATE TABLE `Demande` (
  `num_demande` int auto_increment,
  `id` int,
  `maladie` varchar(200),
  `cout` int,
  `besoins` varchar(200),
  `date` datetime,
  CONSTRAINT pk_Demande PRIMARY KEY (num_demande)
);

CREATE TABLE `Contribution` (
  `Id_util` int auto_increment,
  `num_demande` int,
  `som_impliq` int,
  CONSTRAINT fk_Util FOREIGN KEY (Id_util) REFERENCES Utilisateur (id),
  CONSTRAINT fk_Demand FOREIGN KEY (num_demande) REFERENCES Demande (num_demande)
);