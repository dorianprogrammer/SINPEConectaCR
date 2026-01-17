# docs/architecture/tech-stack.md

# SINPEConectaCR — Tech Stack

## 1. Overview

SINPEConectaCR is a modular, event-driven SaaS platform designed for Costa Rican PYMES.  
It validates SINPE Móvil payments received via WhatsApp (text or image), links them to CRM orders, and exposes business insights through a unified interface.

The stack is intentionally **production-oriented**, prioritizing:
- Data correctness (payments)
- Scalability (microservices)
- Fault tolerance (async events)
- Developer velocity (TypeScript + monorepo)

---

## 2. Core Principles

- **Type safety first**: avoid silent financial errors
- **Service isolation**: each domain owns its logic and data
- **Event-driven communication**: reduce coupling
- **Dev–Prod parity**: Docker everywhere
- **Explicit contracts**: no implicit data shapes

---

## 3. Backend Stack

### 3.1 Language & Runtime
- **Node.js 20 (LTS)**
- **TypeScript**
- ES Modules (ESM)

### 3.2 Microservices

| Service | Responsibility |
|------|---------------|
| api-gateway | Single entry point, routing, auth forwarding |
| auth-service | Authentication, JWT, roles, tenants |
| payments-service | SINPE ingestion, normalization, validation |
| crm-service | Clients, orders, payment status |
| ia-service | OCR + LLM parsing, confidence scoring |

Each service:
- Owns its domain logic
- Exposes REST APIs
- Emits domain events

---

### 3.3 Communication

- **REST (sync)**: external + gateway communication
- **NATS (async)**: internal events  
  Examples:
  - `payment.validated`
  - `payment.rejected`
  - `order.paid`

---

### 3.4 Data & Infrastructure

- **PostgreSQL**: primary datastore
- **Redis**: caching, rate-limiting, ephemeral state
- **Docker**: containerization
- **Docker Compose**: local orchestration

---

### 3.5 Observability (Base)

- Structured logging (Pino or equivalent)
- Health endpoints (`GET /health`)
- Explicit error responses

---

## 4. Frontend Stack

- **React**
- **Vite**
- **TypeScript**
- **Ant Design** or **Tailwind CSS** (single choice)
- **Axios**
- **React Query**

Frontend communicates only with **api-gateway**.

---

## 5. Development Tooling

- **pnpm** — package manager
- **TurboRepo** — task orchestration
- **ESLint** — linting
- **Prettier** — formatting
- **Husky + lint-staged** — commit hygiene
- **commitlint** — conventional commits

---

## 6. Security Baseline

- JWT (access + refresh)
- Role-based access control (RBAC)
- Input validation at service boundaries
- No direct frontend → internal service access

---

## 7. Future-Ready Decisions

- Stack supports:
  - Horizontal scaling
  - Multi-tenant isolation
  - AI model replacement
  - Additional payment providers
- No vendor lock-in

---

## 8. Summary

This stack is designed to scale from:
> **Personal project → Production SaaS**

Without architectural rewrites.