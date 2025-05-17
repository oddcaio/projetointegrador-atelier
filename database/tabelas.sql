CREATE TABLE IF NOT EXISTS public.tb_lembretes (
    id integer NOT NULL DEFAULT nextval('lembretes_id_seq' :: regclass),
    lembrete character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT lembretes_pkey PRIMARY KEY (id)
)
-------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tb_status (
    id integer NOT NULL DEFAULT nextval('tb_status_id_seq' :: regclass),
    nome character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tb_status_pkey PRIMARY KEY (id)
)
-------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tb_pedidos
(
    id integer NOT NULL DEFAULT nextval('tb_pedidos_id_seq'::regclass),
    descricao character varying(255) COLLATE pg_catalog."default" NOT NULL,
    recebido date NOT NULL,
    prazo date NOT NULL,
    entregue date,
    status integer NOT NULL,
    CONSTRAINT tb_pedidos_pkey PRIMARY KEY (id, descricao),
    CONSTRAINT tb_pedidos_status_fkey FOREIGN KEY (status)
        REFERENCES public.tb_status (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
-------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tb_contatos
(
    id integer NOT NULL DEFAULT nextval('tb_contatos_id_seq'::regclass),
    nome character varying(50) COLLATE pg_catalog."default" NOT NULL,
    telefone character varying(15) COLLATE pg_catalog."default" NOT NULL,
    tipo character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tb_contatos_pkey PRIMARY KEY (id)
)
