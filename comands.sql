-- select needed schema
set search_path to iskor;

-- auto increment
create sequence customer_id_seq;
alter table customers alter column customer_id set default nextval('customer_id_seq');
alter sequence customer_id_seq owned by customer.customer_id;

-- получить список заказов
select date, end_user, state from orders where customer_id = 3;

-- получить список моделей заказа
select model, qty, desired_price, end_user
from order_partnumber inner join orders using(order_id)
inner join part_numbers using(part_number_id) where customer_id = 3 and order_id = 5

-- создать заказ с моделями
insert into orders (customer_id, end_user)
values (4, 'NUTS');
insert into order_partnumber values
((select order_id from orders order by order_id desc limit 1), 2, 8, 113),
((select order_id from orders order by order_id desc limit 1), 4, 4, 310);
