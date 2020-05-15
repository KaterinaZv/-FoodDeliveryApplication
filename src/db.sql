
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

