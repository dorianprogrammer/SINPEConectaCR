🇨🇷 SINPEConectaCR

SINPEConectaCR es una plataforma inteligente para PYMES en Costa Rica que conecta WhatsApp + SINPE Móvil + CRM, permitiendo validar pagos automáticamente mediante mensajes o imágenes enviados por los clientes, y asociarlos a órdenes, clientes y montos dentro de un sistema centralizado.

El proyecto está diseñado como un producto SaaS moderno, escalable y orientado a automatización financiera y atención al cliente.

🎯 Objetivo del Proyecto

Automatizar la validación de pagos SINPE Móvil recibidos por WhatsApp.
Reducir errores humanos en la confirmación de pagos.
Centralizar clientes, órdenes y pagos en un mini-CRM.
Servir como proyecto de alto valor técnico y de marca personal.
Preparar la base para futuras integraciones (facturación, IA conversacional, analytics).

🚀 Funcionalidades Principales (MVP)

📩 Recepción de mensajes e imágenes desde WhatsApp
🧠 Lectura inteligente de:
Número telefónico
Número de orden
Nombre del cliente
Monto pagado
Fecha (extraída del comprobante SINPE)
🔍 Validación automática contra órdenes existentes
✅ Marcado de órdenes como Pagadas
📊 Panel básico de pagos y clientes

🧱 Arquitectura General
Arquitectura basada en microservicios, desacoplada y preparada para crecer.

[ WhatsApp Business API ]
            │
            ▼
   [ API Gateway ]
            │
 ┌──────────┼──────────┐
 ▼          ▼          ▼
Auth     Payments     CRM
Service   Service    Service
 │          │          │
 └──────────┴──────────┘
            │
      [ PostgreSQL ]
            │
        [ Redis ]
            │
     [ IA / OCR Engine ]


🛠️ Stack Tecnológico
🔹 Backend
Node.js
Express.js
Prisma ORM
PostgreSQL
Redis (cache, idempotencia, eventos)
JWT (autenticación)
Docker

🔹 Frontend
React
Vite
Tailwind CSS
Microfrontends (Single-SPA) (fase futura)

🔹 Inteligencia Artificial
OCR para lectura de imágenes de SINPE
NLP para interpretación de mensajes de texto
Motor IA desacoplado como servicio independiente

🔹 DevOps
Docker Compose (local)
Kubernetes (producción)
Nginx / API Gateway
CI/CD (GitHub Actions – futuro)

📁 Estructura del Repositorio

SINPEConectaCR/
│
├─ apps/
│   ├─ api-gateway/
│   ├─ auth-service/
│   ├─ payments-service/
│   ├─ crm-service/
│   └─ ia-service/
│
├─ frontend/
│
├─ docker/
│
├─ docs/
│   ├─ architecture/
│   ├─ milestones/
│   └─ diagrams/
│
├─ docker-compose.yml
└─ README.md

🗺️ Roadmap (Alto Nivel)
✅ Diseño de arquitectura
⏳ MVP WhatsApp + SINPE
⏳ OCR de comprobantes
⏳ Dashboard CRM
⏳ IA conversacional
⏳ Facturación electrónica CR
⏳ SaaS multi-tenant

🧠 Visión a Futuro

SINPEConectaCR busca convertirse en el asistente financiero inteligente para PYMES costarricenses, integrando pagos, clientes, automatización y análisis, todo desde WhatsApp.

     
