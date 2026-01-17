# docs/architecture/monorepo-rules.md

# SINPEConectaCR — Monorepo Rules

## 1. Purpose

This document defines the rules and conventions governing the SINPEConectaCR monorepo.  
The goal is to maintain **clarity, scalability, and safety** as the codebase grows.

---

## 2. Repository Structure

```text
SINPEConectaCR/
├── apps/                  # Backend microservices
│   ├── api-gateway/
│   ├── auth-service/
│   ├── payments-service/
│   ├── crm-service/
│   └── ia-service/
│
├── frontend/              # React application
│
├── docker/                # Shared Docker configs
├── docs/                  # Architecture & planning
│   ├── architecture/
│   ├── milestones/
│   └── diagrams/
│
├── docker-compose.yml
├── turbo.json
├── pnpm-workspace.yaml
└── README.md
```