/**
 * Contenido del portafolio de Sergio Velásquez (fuente: CV_Sergio_Velasquez.pdf).
 *
 * Una sola fuente de verdad:
 *  - `npm run seed` sube este contenido a Draftbase.
 *  - Si no hay DRAFTBASE_API_KEY, el sitio lee este archivo directamente (ver src/lib/draftbase.ts).
 */

export const profile = {
	name: "Sergio Velasquez Buitrago",
	headline: "Desarrollador Full Stack · Java & Spring Boot · Flutter",
	bio: `Soy estudiante de Ingeniería de Sistemas en la Universidad de Caldas y desarrollador Full Stack. Construyo sistemas de gestión de punta a punta: API, base de datos, interfaz y despliegue en servidor.

Me enfoco en software que resuelve problemas reales de negocio, como facturación electrónica DIAN, inventarios y puntos de venta, con código limpio y arquitecturas por capas.

## Lo que hago

- **Backend:** APIs REST y comunicación en tiempo real con Java 21, Spring Boot 3, WebSockets (STOMP) y Python (FastAPI).
- **Frontend y móvil:** aplicaciones web, Android e iOS con Flutter y Dart, usando Provider, flutter_bloc y Riverpod.
- **Datos:** modelado y consultas en MongoDB Atlas, PostgreSQL, MySQL y Redis.
- **Despliegue:** contenedores con Docker (multi-stage), Nginx como proxy inverso, HTTPS/SSL, VPS Ubuntu y Firebase Hosting.

## Cómo trabajo

Aplico principios SOLID, DRY y KISS, arquitectura por capas y Clean Architecture, y trabajo con Git flow. Levanto requerimientos directamente con el cliente, pruebo lo que construyo y corrijo errores en producción. Después del despliegue sigo dando soporte y mantenimiento.

## En lo que estoy ahora

Desde enero de 2026 trabajo como desarrollador freelance para Vercy Motos, donde construí un ERP completo con facturación electrónica DIAN y más de 50 pantallas en Flutter Web. En paralelo desarrollo proyectos como Kronnos Restobar, SANE y enBus.

## Más sobre mí

Vivo en Manizales, Caldas. Mi lengua materna es el español y tengo inglés nivel B1. Me gusta aprender de forma constante y construir cosas que la gente use todos los días.`,
	email: "sergiovelaskez23@gmail.com",
	phone: "+57 322 614 7298",
	location: "Manizales, Caldas, Colombia",
	githubUrl: "https://github.com/SergioVelasquez23",
	linkedinUrl: "",
};

export const experience = [
	{
		role: "Desarrollador Full Stack Freelance",
		company: "Vercy Motos",
		location: "Manizales, Caldas",
		period: "01/2026 – Presente",
		order: 1,
		tags: "Java 21, Spring Boot, MongoDB, Flutter Web, WebSockets, DIAN, Docker, Firebase Hosting",
		description: `- Desarrollé un ERP completo para una tienda de repuestos de motos: facturación, pedidos, caja, cartera, inventario, clientes, proveedores y reportes.
- Integré la API de facturación electrónica de la DIAN para emitir facturas y documentos soporte.
- Construí el backend en Java con Spring Boot y MongoDB, y el frontend en Flutter Web con más de 50 pantallas.
- Implementé actualizaciones en tiempo real con WebSockets, exportación a PDF y Excel, e impresión de documentos.
- Levanté requerimientos con el cliente, realicé pruebas y corregí errores del sistema en producción.
- Desplegué el sistema en un VPS Linux con Docker y Firebase Hosting; doy soporte y mantenimiento.`,
	},
];

export const education = [
	{
		degree: "Ingeniería de Sistemas",
		institution: "Universidad de Caldas · Manizales",
		period: "08/2023 – Actual · Semestre 7 · Grado estimado: julio 2028",
		order: 1,
		tags: "Sistemas operativos, Redes, Bases de datos, Sistemas embebidos, Arquitectura de software, Algoritmos, Inteligencia artificial",
		description:
			"Formación en sistemas operativos, redes, diseño de bases de datos, sistemas embebidos, arquitectura de software, análisis y diseño de algoritmos e introducción a la inteligencia artificial.",
	},
];

export const skills = [
	{ category: "Backend", order: 1, items: "Java 21, Spring Boot 3, Spring Data MongoDB, WebSockets (STOMP), REST APIs, Maven, Python (FastAPI), Node.js" },
	{ category: "Frontend y móvil", order: 2, items: "Flutter (Web, Android, iOS), Dart, Provider, flutter_bloc, Riverpod, Dio, HTML, CSS, JavaScript" },
	{ category: "Bases de datos", order: 3, items: "MongoDB Atlas, PostgreSQL, MySQL, Redis" },
	{ category: "Autenticación", order: 4, items: "JWT, Firebase Authentication" },
	{ category: "Infraestructura", order: 5, items: "Docker (multi-stage), Nginx reverse proxy, HTTPS/SSL, VPS Ubuntu, Firebase Hosting, GitHub Actions" },
	{ category: "Integraciones", order: 6, items: "Facturación electrónica DIAN, PDF y Excel, impresión de tickets, códigos de barras" },
	{ category: "Buenas prácticas", order: 7, items: "SOLID, DRY, KISS, arquitectura por capas, Clean Architecture, Git flow" },
	{ category: "Idiomas", order: 8, items: "Español (nativo), Inglés (B1 · intermedio)" },
];

export const projects = [
	{
		title: "Vercy Motos — ERP para tienda de repuestos",
		slug: "vercy-motos-erp",
		summary: "ERP completo con facturación electrónica DIAN, inventario, caja, cartera y reportes.",
		year: 2026,
		featured: true,
		cover: { url: "vercy-motos.png", altText: "Dashboard del ERP de Vercy Motos" },
		tech: "Java 21, Spring Boot, MongoDB, Flutter Web, WebSockets, Docker, Firebase Hosting",
		body: `## El problema

Una tienda de repuestos de motos necesitaba gestionar en un solo sistema la facturación, los pedidos, la caja, la cartera, el inventario, los clientes, los proveedores y los reportes.

## Lo que construí

- Backend en **Java con Spring Boot** y **MongoDB**.
- Frontend en **Flutter Web** con más de 50 pantallas.
- Integración con la **API de facturación electrónica de la DIAN** para facturas y documentos soporte.
- Actualizaciones en tiempo real con **WebSockets**, exportación a **PDF y Excel** e impresión de documentos.

## Operación

Levantamiento de requerimientos con el cliente, pruebas y corrección de errores en producción. Desplegado en un VPS Linux con Docker y Firebase Hosting, con soporte y mantenimiento continuos.`,
	},
	{
		title: "Kronnos Restobar — Sistema para restaurante y bar",
		slug: "kronnos-restobar",
		cover: { url: "kronnos-restobar.png", altText: "Pantalla de mesas de Kronnos ERP" },
		summary: "Backend para pedidos, mesas y comunicación en tiempo real con WebSockets y broker STOMP.",
		featured: true,
		tech: "Java 21, Spring Boot, MongoDB Atlas, WebSockets, Docker, Nginx",
		body: `## Qué es

Backend para la gestión de pedidos y mesas de un restaurante y bar, con comunicación en tiempo real mediante **WebSockets** y un broker **STOMP**.

## Infraestructura

Contenerizado con **Docker multi-stage** y publicado detrás de **Nginx** con **HTTPS**.`,
	},
	{
		title: "SANE — Navegador de legalización empresarial",
		slug: "sane",
		summary: "Plataforma que guía a emprendedores en sus trámites legales con diagnóstico de riesgo y rutas paso a paso.",
		featured: true,
		tech: "Flutter, flutter_bloc, FastAPI, MongoDB Atlas, Firebase",
		body: `## Qué es

Plataforma que guía a emprendedores en sus trámites legales con diagnóstico de riesgo, rutas paso a paso, indicadores de avance y un asistente virtual.

## Stack

Frontend en **Flutter** (Web y móvil) con **flutter_bloc**; backend en **FastAPI** con autenticación de **Firebase**.`,
	},
	{
		title: "enBus — Tarifa estudiantil para transporte público",
		slug: "enbus",
		summary: "App móvil que valida la tarifa estudiantil con códigos QR temporales.",
		featured: false,
		tech: "Flutter, PostgreSQL, Redis, JWT",
		body: `## Qué es

App móvil que valida la tarifa estudiantil con **códigos QR temporales**.

## Stack

Tokens QR con expiración en **Redis**, datos en **PostgreSQL** y autenticación **JWT**. Cliente en **Flutter**.`,
	},
];

export const faqs = [];
