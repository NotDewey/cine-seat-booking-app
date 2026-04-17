# Cine Seat Booking App

Aplicación web de reservación de asientos de cine desarrollada con enfoque DevOps. El sistema permite consultar películas, seleccionar asientos, registrar reservaciones y visualizar logs de operación.

## Tecnologías utilizadas

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- Contenedores: Docker y Docker Compose
- Automatización: Bash
- Infraestructura en la nube: AWS EC2, AWS S3
- Infraestructura como código: AWS CloudFormation

## Arquitectura

La solución se ejecuta sobre una instancia EC2 en AWS. Dentro de la instancia se despliegan dos contenedores mediante Docker Compose:

- Frontend servido con Nginx
- Backend desarrollado en Node.js con Express

Además, los logs generados por la aplicación se almacenan y respaldan en Amazon S3.

## Estructura del proyecto

```bash
cine-seat-booking-app/
├── backend/
│   ├── logs/
│   ├── Dockerfile
│   ├── app.js
│   └── package.json
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── nginx.conf
├── cloudformation/
│   └── template.yaml
├── docker-compose.yml
├── deploy.sh
├── start_app.sh
├── stop_app.sh
└── README.md
