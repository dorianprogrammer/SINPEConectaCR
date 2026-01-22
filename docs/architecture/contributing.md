# Guía de Contribución - SINPEConectaCR

## 📋 Cómo Trabajamos con Milestones e Issues

Este documento explica el flujo de trabajo que seguimos para organizar y trackear el progreso del proyecto.

---

## 🎯 Estructura del Proyecto

### Milestones

Los **Milestones** representan las fases principales del proyecto. Cada milestone agrupa un conjunto de funcionalidades relacionadas.

| Milestone           | Descripción                       | Prioridad |
| ------------------- | --------------------------------- | --------- |
| M0 - Fundaciones    | Setup inicial, stack, Docker      | 🔴 Alta   |
| M1 - Autenticación  | JWT, roles, multi-tenant          | 🔴 Alta   |
| M2 - CRM Base       | Contactos, órdenes, dashboard     | 🔴 Alta   |
| M3 - WhatsApp       | Webhooks, mensajes, inbox         | 🟡 Media  |
| M4 - OCR/IA         | Extracción de comprobantes        | 🟡 Media  |
| M5 - Conciliación   | Matching de pagos                 | 🟡 Media  |
| M6 - Automatización | Respuestas automáticas            | 🟢 Normal |
| M7 - Seguridad      | Rate limiting, cifrado, auditoría | 🟢 Normal |
| M8 - Deploy         | Cloud, monitoreo, observabilidad  | 🟢 Normal |

---

## 🔄 Flujo de Trabajo

### 1. Seleccionar un Issue

```
📍 Issues → Filter by Milestone → Elegir issue sin asignar
```

- Ve a la pestaña **Issues**
- Filtra por el milestone actual (empezamos por M0, luego M1, etc.)
- Busca issues con label `ready` o sin asignar
- Asígnate el issue

### 2. Trabajar en el Issue

- Actualiza el label a `in-progress`
- Desarrolla la funcionalidad
- Crea commits descriptivos
- Cuando termines, crea un Pull Request

### 3. Pull Request

Al crear el PR:

- **Título:** Descripción clara del cambio
- **Descripción:** Usar el template
- **Milestone:** Asignar el milestone correspondiente
- **Labels:** Agregar labels relevantes
- **Linked Issues:** Conectar con `Closes #123`

#### Template de PR

```markdown
## Descripción

Breve descripción de los cambios.

## Tipo de cambio

- [ ] Nueva funcionalidad (feature)
- [ ] Corrección de bug (fix)
- [ ] Documentación (docs)
- [ ] Refactorización (refactor)

## Issue relacionado

Closes #123

## Checklist

- [ ] Mi código sigue el estilo del proyecto
- [ ] He añadido tests que prueban mi fix/feature
- [ ] Los tests existentes pasan localmente
- [ ] He actualizado la documentación si es necesario

## Screenshots (si aplica)
```

### 4. Code Review

- Mínimo **1 approval** requerido
- Resolver todos los comentarios
- Pasar todos los checks de CI

### 5. Merge y Cierre

Una vez aprobado:

1. Merge el PR
2. El issue se cierra automáticamente si usaste `Closes #123`
3. El progreso del milestone se actualiza automáticamente

---

## 🏷️ Labels

### Por Tipo

| Label           | Color     | Descripción                       |
| --------------- | --------- | --------------------------------- |
| `feature`       | 🟢 Verde  | Nueva funcionalidad               |
| `bug`           | 🔴 Rojo   | Bug a corregir                    |
| `documentation` | 🔵 Azul   | Documentación                     |
| `enhancement`   | 🟣 Morado | Mejora de funcionalidad existente |

### Por Área

| Label      | Descripción           |
| ---------- | --------------------- |
| `backend`  | Código del servidor   |
| `frontend` | Código del cliente    |
| `database` | Esquemas, migraciones |
| `devops`   | CI/CD, Docker, deploy |
| `security` | Seguridad             |
| `testing`  | Tests                 |

### Por Estado

| Label          | Descripción               |
| -------------- | ------------------------- |
| `ready`        | Listo para trabajar       |
| `in-progress`  | En desarrollo             |
| `needs-review` | Necesita code review      |
| `blocked`      | Bloqueado por dependencia |

### Por Prioridad

| Label                | Descripción              |
| -------------------- | ------------------------ |
| `priority: critical` | Urgente, bloquea release |
| `priority: high`     | Alta prioridad           |
| `priority: medium`   | Prioridad normal         |
| `priority: low`      | Puede esperar            |

---

## 📊 Ejemplo Visual del Flujo

```
┌─────────────────────────────────────────────────────────────────┐
│                        MILESTONE 1                               │
│                 Autenticación y Multi-Tenencia                   │
│                                                                  │
│  Progress: ████████░░░░░░░░░░░░ 40% (2/5 issues)                │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
   ┌─────────┐          ┌─────────┐          ┌─────────┐
   │ Issue 1 │          │ Issue 2 │          │ Issue 3 │
   │  ✅ Done │          │  ✅ Done │          │ 🔄 Open │
   │         │          │         │          │         │
   │ JWT Auth│          │  Roles  │          │ Multi-  │
   │         │          │         │          │ tenant  │
   └─────────┘          └─────────┘          └─────────┘
```

---

## 🚀 Ciclo de Vida de un Issue

```
                    ┌──────────────┐
                    │   BACKLOG    │
                    │   (Open)     │
                    └──────┬───────┘
                           │
                           │ Desarrollador se asigna
                           ▼
                    ┌──────────────┐
                    │ IN PROGRESS  │
                    │              │
                    └──────┬───────┘
                           │
                           │ Crear PR
                           ▼
                    ┌──────────────┐
                    │   REVIEW     │
                    │ (PR Open)    │
                    └──────┬───────┘
                           │
               ┌───────────┴───────────┐
               │                       │
               ▼                       ▼
        ┌─────────────┐         ┌─────────────┐
        │  APPROVED   │         │  CHANGES    │
        │             │         │  REQUESTED  │
        └──────┬──────┘         └──────┬──────┘
               │                       │
               │                       │ Fix + Push
               │                       └──────┐
               │                              │
               ▼                              │
        ┌─────────────┐                       │
        │   MERGED    │◄──────────────────────┘
        │  (Closed)   │
        └─────────────┘
               │
               │ Auto-update
               ▼
        ┌─────────────┐
        │  MILESTONE  │
        │  Progress++ │
        └─────────────┘
```

---

## 📝 Checklist del Desarrollador

```markdown
### Antes de empezar

- [ ] Revisar si hay PRs pendientes de review
- [ ] Verificar issues asignados a mí
- [ ] Sincronizar con la rama principal

### Durante el desarrollo

- [ ] Commits pequeños y frecuentes
- [ ] Correr tests localmente

### Al terminar

- [ ] Crear PR con descripción completa
- [ ] Asignar reviewers
- [ ] Linkear issue con `Closes #XX`
- [ ] Verificar que CI pasa
```

---

## 🔗 Links Útiles

- [Issues del Proyecto](https://github.com/dorianprogrammer/SINPEConectaCR/issues)
- [Milestones](https://github.com/dorianprogrammer/SINPEConectaCR/milestones)
- [Pull Requests](https://github.com/dorianprogrammer/SINPEConectaCR/pulls)

---

## ❓ FAQ

### ¿Puedo trabajar en issues de milestones futuros?

Preferiblemente no. Seguimos el orden de milestones para mantener dependencias claras. Si M0 no está completo, no deberíamos empezar M1.

### ¿Qué hago si mi issue está bloqueado?

1. Agrega el label `blocked`
2. Comenta en el issue explicando qué lo bloquea
3. Toma otro issue mientras tanto

### ¿Cómo reporto un bug?

1. Crea un nuevo issue
2. Usa el label `bug`
3. Describe: pasos para reproducir, comportamiento esperado vs actual
4. Asigna al milestone correspondiente

### ¿Puedo crear issues nuevos?

¡Sí! Si encuentras algo que falta o una mejora, crea el issue y asígnalo al milestone apropiado.

---

> 💡 **Tip:** Mantén la comunicación en los issues. Es mejor sobre-comunicar que sub-comunicar.
