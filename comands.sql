create table roles (
	id uuid primary key,
	name varchar(30) not null
);

insert into public.roles (id, name) values (uuid_generate_v4(), 'admin');
insert into public.roles (id, name) values (uuid_generate_v4(), 'customer');
insert into public.roles (id, name) values (uuid_generate_v4(), 'vendor');
insert into public.roles (id, name) values (uuid_generate_v4(), 'distributor');

select * from public.roles;

create table users (
	id uuid primary key,
	username varchar(30) not null,
	password varchar not null,
	role_id uuid not null default 'e39d67be-d37c-4f15-8f9a-89b270db61c8',
	foreign key (role_id) references public.roles (id)
);

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
	(public.users.role_id = public.roles.id);

