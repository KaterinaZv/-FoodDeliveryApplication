#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL

create type status_order as enum ('Заказ оформлен', 'Заказ отправлен', 'Заказ оплачен');

create table if not exists "customer"
(
    id bigserial NOT NULL,
    name character varying(200) NOT NULL,
    surname character varying(200) NOT NULL,
    phone character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    photo text NOT NULL,
    password character varying(500) NOT NULL,
    PRIMARY KEY (id)
);

alter table "customer" owner to postgres;

create table if not exists "customer_address"
(
    id bigserial NOT NULL,
    customer_id bigint REFERENCES customer (id),
    address text NOT NULL
);

alter table "customer_address" owner to postgres;

create table if not exists "restaurant"
(
    id bigserial NOT NULL,
    name character varying(200) NOT NULL,
    phone character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    photo text,
    description text,
    password character varying(500) NOT NULL,
    PRIMARY KEY (id)
);

alter table public."restaurant" owner to postgres;

create table if not exists "menu_restaurant"
(
    id bigserial NOT NULL,
    restaurant_id bigint REFERENCES restaurant (id),
    name character varying(200) NOT NULL,
    description text,
    price money NOT NULL DEFAULT 0,
    photo text
);

alter table public."restaurant" owner to postgres;

create table if not exists "customer_restaurants"
(
    id bigserial NOT NULL,
    customer_id bigint REFERENCES customer (id),
    restaurant_id bigint REFERENCES restaurant (id),
    restaurant_name text NOT NULL
);

alter table public."customer_address" owner to postgres;

create table if not exists "orders"
(
    id bigserial NOT NULL,
    customer_id bigint NOT NULL,
    name_menu_restaurant character varying(200) NOT NULL,
    amount varchar NOT NULL DEFAULT 0,
    sum_of_order money NOT NULL DEFAULT 0,
    phone character varying(100) NOT NULL,
	address text NOT NULL,
    created_time date default now(),
    status status_order NOT NULL
);

create table if not exists "order_item_list"
(
	id bigserial NOT NULL,
    customer_id bigint REFERENCES customer (id),
    menu_restaurant_id bigint NOT NULL,
	name_menu_restaurant character varying(200) NOT NULL,
    price money NOT NULL DEFAULT 0,
    amount integer DEFAULT 0,
	UNIQUE (menu_restaurant_id)
);

alter table public."order_item_list" owner to postgres;
EOSQL
