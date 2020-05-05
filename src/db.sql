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