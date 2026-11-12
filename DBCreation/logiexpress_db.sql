create database if not exists `logiexpress_db`;
use `logiexpress_db`;

create table `client` (
    `id` int auto_increment primary key,
    `name` varchar(255) not null,
    `state` varchar(20) not null check (`state` in ('active', 'inactive')),
    `creditLimit` int not null
);

create table `address` (
    `id` int auto_increment primary key,
    `originAddress` varchar(255) not null,
    `destinationAddress` varchar(255) not null,
    `idClient` int not null,

    foreign key (`idClient`) references `client` (`id`)
);

create table `shipment` (
    `id` int auto_increment primary key,
    `idSender` int not null,
    `idRecipient` int not null,
    `totalCost` decimal(10, 2) not null,
    `date` datetime not null,
    `state` varchar(20) not null
        check (`state` in ('registered', 'in_transit', 'delivered', 'canceled')),

    foreign key (`idSender`) references `client` (`id`),
    foreign key (`idRecipient`) references `client` (`id`)
);

create table `warehouse` (
    `id` int auto_increment primary key,
    `name` varchar(255) not null,
    `location` varchar(255) not null,
    `maxCapacity` int not null
);

create table `package` (
    `id` int auto_increment primary key,
    `weight` decimal(10, 2) not null,
    `dimensions` varchar(255) not null,
    `contents` varchar(255) not null,
    `idShipment` int not null,
    `idWarehouse` int not null,

    foreign key (`idShipment`) references `shipment` (`id`),
    foreign key (`idWarehouse`) references `warehouse` (`id`)
);

create table `tracking_history` (
    `id` int auto_increment primary key,
    `date` datetime not null,
    `currentLocation` varchar(255) not null,
    `eventState` varchar(255) not null,
    `remarks` varchar(255) not null,
    `idShipment` int not null,

    foreign key (`idShipment`) references `shipment` (`id`)
);

create table `shipment_audit` (
    `id` int auto_increment primary key,
    `previousCost` decimal(10, 2) not null,
    `newCost` decimal(10, 2) not null,
    `user` varchar(255) not null,
    `date` datetime not null,
    `idShipment` int not null,

    foreign key (`idShipment`) references `shipment` (`id`)
);