--
-- PostgreSQL database dump
--

-- Dumped from database version 14.17 (Homebrew)
-- Dumped by pg_dump version 14.17 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alumnos; Type: TABLE; Schema: public; Owner: benjir
--

CREATE TABLE public.alumnos (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    ap_pat character varying(50) NOT NULL,
    ap_mat character varying(50) NOT NULL,
    matricula character varying(20) NOT NULL,
    correo character varying(100),
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    nivel character(3),
    fecha_nacimiento date,
    CONSTRAINT matricula_longitud_check CHECK ((char_length((matricula)::text) = 10))
);


ALTER TABLE public.alumnos OWNER TO benjir;

--
-- Name: alumnos_id_seq; Type: SEQUENCE; Schema: public; Owner: benjir
--

CREATE SEQUENCE public.alumnos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.alumnos_id_seq OWNER TO benjir;

--
-- Name: alumnos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: benjir
--

ALTER SEQUENCE public.alumnos_id_seq OWNED BY public.alumnos.id;


--
-- Name: grados; Type: TABLE; Schema: public; Owner: benjir
--

CREATE TABLE public.grados (
    id integer NOT NULL,
    nombre character varying(20) NOT NULL
);


ALTER TABLE public.grados OWNER TO benjir;

--
-- Name: grados_id_seq; Type: SEQUENCE; Schema: public; Owner: benjir
--

CREATE SEQUENCE public.grados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.grados_id_seq OWNER TO benjir;

--
-- Name: grados_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: benjir
--

ALTER SEQUENCE public.grados_id_seq OWNED BY public.grados.id;


--
-- Name: niveles; Type: TABLE; Schema: public; Owner: benjir
--

CREATE TABLE public.niveles (
    codigo character(3) NOT NULL,
    nombre character varying(20) NOT NULL
);


ALTER TABLE public.niveles OWNER TO benjir;

--
-- Name: tipos_roles; Type: TABLE; Schema: public; Owner: benjir
--

CREATE TABLE public.tipos_roles (
    codigo_rol character(5) NOT NULL,
    nombre_rol character varying(50) NOT NULL
);


ALTER TABLE public.tipos_roles OWNER TO benjir;

--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: benjir
--

CREATE TABLE public.usuarios (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    nombre character varying(50) NOT NULL,
    ap_pat character varying(50) NOT NULL,
    ap_mat character varying(50) NOT NULL,
    rol_codigo character(5) NOT NULL,
    is_active boolean DEFAULT true,
    fecha_registro timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.usuarios OWNER TO benjir;

--
-- Name: alumnos id; Type: DEFAULT; Schema: public; Owner: benjir
--

ALTER TABLE ONLY public.alumnos ALTER COLUMN id SET DEFAULT nextval('public.alumnos_id_seq'::regclass);


--
-- Name: grados id; Type: DEFAULT; Schema: public; Owner: benjir
--

ALTER TABLE ONLY public.grados ALTER COLUMN id SET DEFAULT nextval('public.grados_id_seq'::regclass);


--
-- Data for Name: alumnos; Type: TABLE DATA; Schema: public; Owner: benjir
--

COPY public.alumnos (id, nombre, ap_pat, ap_mat, matricula, correo, fecha_registro, nivel, fecha_nacimiento) FROM stdin;
\.


--
-- Data for Name: grados; Type: TABLE DATA; Schema: public; Owner: benjir
--

COPY public.grados (id, nombre) FROM stdin;
\.


--
-- Data for Name: niveles; Type: TABLE DATA; Schema: public; Owner: benjir
--

COPY public.niveles (codigo, nombre) FROM stdin;
\.


--
-- Data for Name: tipos_roles; Type: TABLE DATA; Schema: public; Owner: benjir
--

COPY public.tipos_roles (codigo_rol, nombre_rol) FROM stdin;
ADMIN	Administrador
GESCO	Gestor Escolar
DOCEN	Docente
ALUMN	Alumno
TUTOR	Tutor
ASPIR	Aspirante
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: benjir
--

COPY public.usuarios (id, email, password_hash, nombre, ap_pat, ap_mat, rol_codigo, is_active, fecha_registro) FROM stdin;
eedbca03-fb21-4a2c-b6f1-3195b2e73149	test@exam.com	$2a$12$lRBWSC.DnqPFF6LHyzKIeuIcusPWMuToVXs.S1n.K85mEI2y0AGz.	Tester	Prueba	User	ADMIN	t	2025-06-18 18:03:43.579466-06
\.


--
-- Name: alumnos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: benjir
--

SELECT pg_catalog.setval('public.alumnos_id_seq', 1, false);


--
-- Name: grados_id_seq; Type: SEQUENCE SET; Schema: public; Owner: benjir
--

SELECT pg_catalog.setval('public.grados_id_seq', 1, false);


--
-- Name: alumnos alumnos_matricula_key; Type: CONSTRAINT; Schema: public; Owner: benjir
--

ALTER TABLE ONLY public.alumnos
    ADD CONSTRAINT alumnos_matricula_key UNIQUE (matricula);


--
-- Name: alumnos alumnos_pkey; Type: CONSTRAINT; Schema: public; Owner: benjir
--

ALTER TABLE ONLY public.alumnos
    ADD CONSTRAINT alumnos_pkey PRIMARY KEY (id);


--
-- Name: grados grados_pkey; Type: CONSTRAINT; Schema: public; Owner: benjir
--

ALTER TABLE ONLY public.grados
    ADD CONSTRAINT grados_pkey PRIMARY KEY (id);


--
-- Name: niveles niveles_pkey; Type: CONSTRAINT; Schema: public; Owner: benjir
--

ALTER TABLE ONLY public.niveles
    ADD CONSTRAINT niveles_pkey PRIMARY KEY (codigo);


--
-- Name: tipos_roles tipos_roles_nombre_rol_key; Type: CONSTRAINT; Schema: public; Owner: benjir
--

ALTER TABLE ONLY public.tipos_roles
    ADD CONSTRAINT tipos_roles_nombre_rol_key UNIQUE (nombre_rol);


--
-- Name: tipos_roles tipos_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: benjir
--

ALTER TABLE ONLY public.tipos_roles
    ADD CONSTRAINT tipos_roles_pkey PRIMARY KEY (codigo_rol);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: benjir
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: benjir
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: alumnos fk_nivel; Type: FK CONSTRAINT; Schema: public; Owner: benjir
--

ALTER TABLE ONLY public.alumnos
    ADD CONSTRAINT fk_nivel FOREIGN KEY (nivel) REFERENCES public.niveles(codigo);


--
-- Name: usuarios fk_rol_codigo; Type: FK CONSTRAINT; Schema: public; Owner: benjir
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT fk_rol_codigo FOREIGN KEY (rol_codigo) REFERENCES public.tipos_roles(codigo_rol) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

