create table roles (
	id uuid primary key default uuid_generate_v4(),
	name varchar(30) not null
);

insert into public.roles (name) values ('admin');
insert into public.roles (name) values ('customer');
insert into public.roles (name) values ('vendor');
insert into public.roles (name) values ('distributor');

select * from public.roles;

create table users (
	id uuid primary key default uuid_generate_v4(),
	username varchar(30) not null,
	password varchar not null,
	role_id uuid not null default '86dc2068-da46-439f-855c-e2979837d7ee',
	foreign key (role_id) references public.roles (id)
);

ALTER TABLE public.users ALTER COLUMN "rolesId" set default '1eccd50e-d770-4554-b399-d8b97962d20b';

insert into public.users (id, username, password) values (uuid_generate_v4(), 'vasya', '123123');

select
	public.users.id,
	public.users.username,
	public.roles.name as role
from
	public.users
left outer join
	public.roles
on
	"rolesId" = public.roles.id;




select
 	public.users.id,
 	public.users.username,
 	public.roles.name as role,
	public.permissions.name as permission
from
 	public.users
join
 	public.roles
on
	"rolesId" = public.roles.id
join
	public.rolespermissions
on
	"rolesId" = public.rolespermissions.roleid
join
	public.permissions
on
	"permissionid" = public.permissions.id;


-- каскадное удаление для foreign key
ALTER TABLE public.contacts ADD FOREIGN KEY ("usersId")
REFERENCES public.users(id) ON DELETE CASCADE;


-- 73b71694-9d9f-4cc6-915d-8fd4eb5a7797 admin
-- 586ecc04-b76f-42a3-9986-1ddb4c97d3ff customer
-- 65bfe98f-835e-4b90-adfe-5091fb8828c2 vendor
-- 01d79d4c-8c6c-447c-929f-abbd879caa25 distributor


-- 67c6a705-3c8b-4283-8df4-8604659059ae
-- 52f4dd37-abb3-4832-aa11-8f933fb50771
-- f71fa5e8-faf6-419d-8a77-6285232a60cb
-- e0b09cc6-8a9a-411e-bef5-2589c77b8266
-- a2a94bcb-22d7-4b77-b9b9-23792d4366f3

select
	g.name,
	p.cost,
	d.discount,
	m.margin,
	de.vendor,
	de.description
from good g
left join price p on g.id = p."goodId"
left join discount d on g.id = d."goodId"
left join margin m on g.id = m."goodId"
left join description de on g.id = de."goodId"
