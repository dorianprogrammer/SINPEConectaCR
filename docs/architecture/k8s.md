# 📁 SINPEConectaCR – Project Structure (KIND + Kubernetes)

Este repositorio está organizado como un **monorepo** orientado a microservicios, preparado para ejecutarse localmente usando **KIND (Kubernetes IN Docker)** y escalar fácilmente a otros entornos.

---

## 🌳 Árbol de directorios

```bash
SINPECONECTACR/
├── .husky/                     # Hooks de git (pre-commit, lint, etc.)
│
├── apps/                       # Microservicios backend
│   ├── api-gateway/            # API Gateway (auth, routing, rate-limit)
│   ├── auth-service/           # Autenticación y autorización (JWT, roles)
│   ├── crm-service/            # Lógica CRM (clientes, conversaciones)
│   ├── ia-service/             # IA / OCR / procesamiento inteligente
│   └── payments-service/       # Validación de pagos SINPE
│
├── docs/
│   └── architecture/
│       ├── monorepo-rules.md   # Reglas del monorepo
│       └── tech-stack.md       # Stack tecnológico del proyecto
│
├── frontend/                   # Frontend web (CRM UI)
│
├── k8s/                        # Infraestructura Kubernetes
│   ├── 00-namespace.yaml       # Namespace del proyecto
│   ├── 01-configmap.yaml       # Variables de entorno no sensibles
│   ├── 02-postgres.yaml        # Base de datos PostgreSQL
│   ├── 03-redis.yaml           # Redis (cache / colas)
│   ├── 04-nats.yaml            # NATS (mensajería/eventos)
│   ├── 10-api-gateway.yaml     # Deployment + Service API Gateway
│   ├── 11-auth-service.yaml    # Deployment + Service Auth
│   ├── 12-payments-service.yaml# Deployment + Service Payments
│   ├── 13-crm-service.yaml     # Deployment + Service CRM
│   ├── 14-ia-service.yaml      # Deployment + Service IA
│   ├── 20-frontend.yaml        # Deployment + Service Frontend
│   ├── 30-ingress.yaml         # Ingress (exposición externa)
│   └── kustomization.yaml      # Orquestación con Kustomize
│
├── kind-config.yaml            # Configuración del cluster KIND
│
├── node_modules/               # Dependencias (monorepo)
│
├── .editorconfig               # Configuración de editor
├── .eslintrc.cjs               # ESLint
├── .gitignore
├── .prettierignore
├── .prettierrc
├── commitlint.config.cjs       # Convención de commits
│
├── package.json                # Scripts raíz del monorepo
├── pnpm-lock.yaml
├── pnpm-workspace.yaml         # Workspace PNPM
│
├── README.md                   # README principal
├── SINPEConectaCR.png          # Imagen / branding del proyecto
└── turbo.json                  # Turborepo (build, cache, pipelines)
```