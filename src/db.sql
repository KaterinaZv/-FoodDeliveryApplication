
CREATE TABLE public."customer"
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

ALTER TABLE public."customer"
    OWNER to postgres;


CREATE TABLE public."customer_address"
(
    id bigserial NOT NULL,
    customer_id bigint REFERENCES customer (id),
    address text NOT NULL
);

ALTER TABLE public."customer_address"
    OWNER to postgres;

CREATE TABLE public."restaurant"
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

ALTER TABLE public."restaurant"
    OWNER to postgres;

CREATE TABLE public."menu_restaurant"
(
    id bigserial NOT NULL,
    restaurant_id bigint REFERENCES restaurant (id),
    name character varying(200) NOT NULL,
    description text,
    price money NOT NULL DEFAULT 0,
    photo text,
);

ALTER TABLE public."restaurant"
    OWNER to postgres;

CREATE TABLE public."customer_restaurants"
(
    id bigserial NOT NULL,
    customer_id bigint REFERENCES customer (id),
    restaurant_id bigint REFERENCES restaurant (id),
    restaurant_name text NOT NULL
);

ALTER TABLE public."customer_address"
    OWNER to postgres;

CREATE TABLE public."orders"
(
    id bigserial NOT NULL,
    customer_id bigint NOT NULL,
    name_menu_restaurant character varying(200) NOT NULL,
    amount money NOT NULL DEFAULT 0,
    sum_of_order money NOT NULL DEFAULT 0,
    phone character varying(100) NOT NULL,
	address text NOT NULL,
    created_time date default now(),
    status status_order NOT NULL
);

CREATE TABLE public."order_item_list"
(
	id bigserial NOT NULL,
    customer_id bigint REFERENCES customer (id),
    menu_restaurant_id bigint NOT NULL,
	name_menu_restaurant character varying(200) NOT NULL,
    price money NOT NULL DEFAULT 0,
    amount integer DEFAULT 0,
	UNIQUE (menu_restaurant_id)
);

ALTER TABLE public."order_item_list"
    OWNER to postgres;

create type status_order as enum ('Заказ оформлен', 'Заказ отправлен', 'Заказ оплачен');