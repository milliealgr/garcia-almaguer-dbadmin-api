use logiexpress_db;

insert into client (id, name, state, creditLimit) values
(1, 'Elba Ginon', 'active', 10000),
(2, 'Lucho Portuano', 'active', 8000),
(3, 'Yola Prieto', 'active', 5000),
(4, 'Paco Gerte', 'inactive', 3000);

insert into address (id, originAddress, destinationAddress, idClient) values
(1, 'aca', 'alla', 1),
(2, 'alla', 'por ahi', 2),
(3, 'por ahi', 'sabra dios', 3);

insert into warehouse (id, name, location, maxCapacity) values
(1, 'si cabe', 'aca', 10),
(2, 'apretado', 'alla', 1),
(3, 'al fondo', 'sabra dios', 5);

insert into shipment (id, idSender, idRecipient, totalCost, date, state) values
(1, 1, 2, 180.00, '2026-11-09 09:00:00', 'delivered'),
(2, 2, 3, 95.50, '2026-11-10 11:30:00', 'in_transit'),
(3, 3, 1, 120.00, '2026-11-11 14:00:00', 'registered'),
(4, 1, 3, 75.00, '2026-11-12 08:00:00', 'registered');

insert into package (id, weight, dimensions, contents, idShipment, idWarehouse) values
(1, 1.15, '30 x 20 x 15 cm', 'squishies', 1, 1),
(2, 0.80, '20 x 15 x 10 cm', 'book', 2, 2),
(3, 2.24, '25 x 20 x 10 cm', 'switch2', 3, 1),
(4, 0.15, '20 x 15 x 5 cm', 'steam deck', 3, 1),
(5, 1.30, '25 x 18 x 2 cm', 'molina', 4, 1);

insert into tracking_history (id, date, currentLocation, eventState, remarks, idShipment) values
(1, '2026-11-09 09:00:00', 'aca', 'registered', 'shipment registered', 1),
(2, '2026-11-09 14:00:00', 'aca', 'in_transit', 'left the warehouse', 1),
(3, '2026-11-10 09:00:00', 'alla', 'delivered', 'received by Lucho Portuano', 1),
(4, '2026-11-10 11:30:00', 'alla', 'registered', 'shipment registered', 2),
(5, '2026-11-10 16:00:00', 'alla', 'in_transit', 'ready for transfer to "por ahi"', 2),
(6, '2026-11-11 14:00:00', 'aca', 'registered', 'two packages received at "si cabe"', 3),
(7, '2026-11-12 08:00:00', 'aca', 'registered', 'shipment registered at "si cabe"', 4);

-- the audit trigger fills shipment_audit 