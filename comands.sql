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