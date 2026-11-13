use logiexpress_db;

-- Trigger 1 - after_update_shipment_cost
-- logs changes to shipment.totalCost in shipment_audit

drop trigger if exists after_update_shipment_cost;
create trigger after_update_shipment_cost
after update on shipment
for each row
begin
    if old.totalCost != new.totalCost then
        insert into shipment_audit (idShipment, previousCost, newCost, `user`, `date`)
        values (new.id, old.totalCost, new.totalCost, user(), now());
    end if;
end

-- Trigger 2 - before_insert_package_warehouse
-- rejects the package insertion with "SIGNAL SQLSTATE '45000'" if adding the package would exceed the warehouse's maxCapacity

drop trigger if exists before_insert_package_warehouse;
create trigger before_insert_package_warehouse
before insert on package
for each row
begin
    declare currentPackages int;
    declare maxCapacity int;

    select count(*) into currentPackages
    from package p
    where p.idWarehouse = new.idWarehouse;

    select w.maxCapacity into maxCapacity
    from warehouse w
    where w.id = new.idWarehouse;

    if currentPackages >= maxCapacity then
        signal sqlstate '45000'
            set message_text = 'Inserting package exceeds warehouse capacity';
    end if;
end

-- Trigger 3 - after_insert_tracking_history
-- sets shipment.state to 'delivered' when a new tracking_history entry for that shipment has a 'delivered' eventState

drop trigger if exists after_insert_tracking_history;
create trigger after_insert_tracking_history
after insert on tracking_history
for each row
begin
    if new.eventState = 'delivered' then
        update shipment
        set state = 'delivered'
        where id = new.idShipment;
    end if;
end

-- Tests ----------------------------------------------------------------------------------------------------------------

show triggers;

-- shipment cost audit
start transaction;

update shipment
    set totalCost = totalCost + 10
    where id = 1;

select idShipment, previousCost, newCost, `user`, `date`
    from shipment_audit
    where idShipment = 1
    order by id desc
    limit 1;

rollback;

select totalCost from shipment where id = 1;

-- warehouse capacity limit
select w.maxCapacity, count(p.id) as currentPackages
from warehouse w
left join package p 
    on p.idWarehouse = w.id
where w.id = 2
group by w.id, w.maxCapacity;

start transaction;

insert into package (weight, dimensions, contents, idShipment, idWarehouse)
values (0.50, '10 x 10 x 10 cm', 'Capacity test', 1, 2);

rollback;

-- delivery status update
start transaction;

select state as beforeState
from shipment
where id = 2;

insert into tracking_history (date, currentLocation, eventState, remarks, idShipment)
values (now(), 'Destination', 'delivered', 'Delivery trigger test', 2);

select state as afterState
from shipment
where id = 2;

rollback;