use logiexpress_db;

-- Procedure 1 Monthly Client Report
-- Should return the total amount billed, the number of delivered shipments, and the average delivery time

drop procedure if exists sp_monthly_client_report;
create procedure sp_monthly_client_report(p_clientId int, p_month int, p_year int)
begin
    select sum(s.totalCost) as totalBilled,
           count(case when s.state = 'delivered' then 1 end) as deliveredShipments,
           round(avg(timestampdiff(hour, s.date, h.deliveryDate)), 2) as avgDeliveryHours
    from shipment s
    left join (
        select idShipment, min(date) as deliveryDate
        from tracking_history
        where eventState = 'delivered'
        group by idShipment
    ) as h 
        on h.idShipment = s.id 
        and s.state = 'delivered'
    where s.idSender = p_clientId
      and month(s.date) = p_month
      and year(s.date) = p_year
      and s.state != 'canceled';
end

call sp_monthly_client_report(1, 11, 2026);

-- Procedure 2 Shipment Route and Tracking History Sheet
-- Takes a shipment ID as input.
-- Should return the package details, sender and recipient info, and the shipment's tracking history in chronological order

drop procedure if exists sp_get_shipment_route_history;
create procedure sp_get_shipment_route_history(p_shipmentId int)
begin
    select s.id as shipmentId,
       sender.name as sender,
       recipient.name as recipient,
       s.date as shipmentDate,
       s.state as shipmentState,
       s.totalCost,

       p.id as packageId,
       p.weight,
       p.dimensions,
       p.contents,
       p.idWarehouse,

       th.date as trackingDate,
       th.currentLocation,
       th.eventState,
       th.remarks
    from shipment s
    join client sender 
        on sender.id = s.idSender
    join client recipient 
        on recipient.id = s.idRecipient
    left join package p 
        on p.idShipment = s.id
    left join tracking_history th 
        on th.idShipment = s.id
    where s.id = p_shipmentId
    order by th.date, th.id, p.id;
end

call sp_get_shipment_route_history(1);