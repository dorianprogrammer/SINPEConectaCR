# Estrategia para el Uso de Ramas en GitHub

## Introducción

La siguiente estrategia define una forma estructurada de trabajar con las ramas en un repositorio de GitHub. Este enfoque optimiza la colaboración entre desarrolladores, garantiza la estabilidad del código funcional y facilita una integración controlada en producción.

## Estructura de las Ramas

### Rama Main (`main`)
La rama `main` contiene código estable y listo para producción. Solo recibe actualizaciones desde la rama `producción` después de pruebas exhaustivas.

**Utilización:**  
- Exclusivamente para lanzamientos a producción.  
- Protegida contra sobrescrituras accidentales.

---

### Rama Producción (`producción`)
La rama `producción` sirve como la puerta final antes de integrar el código en `main`. Todas las versiones aprobadas y probadas en QA se promueven desde `development-vx.x.x` hacia `producción`.

**Utilización:**  
- Para pruebas finales en entornos de preproducción.  
- Solo se fusiona después de recibir un PR desde `development-vx.x.x`.

---

### Rama de Desarrollo por Versión (`development-vx.x.x`)
Cada versión tiene su propia rama específica de desarrollo (`development-vx.x.x`). Esta rama:
- Actúa como punto central de integración para todo el código relacionado con una versión.
- Se crea como una **copia exacta** de `producción` cuando se inicia el trabajo en una nueva versión.

**Nota:**  
Al incrementar una versión (por ejemplo, de `v1.0.6` a `v1.0.7`), se crea la nueva rama `development-v1.0.7` como una copia de `producción`.

---

### Ramas de Colaboradores
Cada desarrollador trabaja en una rama personalizada derivada de `development-vx.x.x`. Las ramas de colaboradores se regeneran con cada incremento de versión.

Ejemplo:  
- `dev-v1.0.6-David` → Aporta cambios a `development-v1.0.6`.  
- `dev-v1.0.7-David` → Aporta cambios a `development-v1.0.7`.

**Utilización:**  
- Espacio aislado para el desarrollo individual, minimizando conflictos.  
- Los cambios se validan mediante Pull Requests (PRs) a la rama de desarrollo (`development-vx.x.x`).

---

### Ramas de Respaldo y Restauración
Las ramas de respaldo (`bkp-*`) y restauración (`reset-*`) garantizan que las versiones anteriores permanezcan accesibles para referencia o recuperación.

Ejemplo:  
- `bkp-development-v1.0.6`  
- `reset-development-v1.0.6`

**Utilización:**  
- Para archivado o recuperación de estados anteriores.  
- Para correcciones mayores donde se necesite restaurar versiones específicas.

---

## Representación en Diagrama de Estrategia

```mermaid
graph TD
    A[main]
    B[producción]
    C[development-v1.0.6]
    D1[dev-v1.0.6-David]
    D2[dev-v1.0.6-Dorian]
    E1[reset-development-v1.0.6]
    E2[bkp-development-v1.0.6]

    A <-- B
    B --> C
    C --> D1
    C --> D2
    C --> E1
    C --> E2
```

---

## Representación en Diagrama: Cambio de Versión

```mermaid
graph TD
    A[development-v1.0.6]
    B[dev-v1.0.6-David]
    C[dev-v1.0.6-Dorian]
    D[producción]
    E[main]
    F[development-v1.0.7]
    G[dev-v1.0.7-David]
    H[dev-v1.0.7-Dorian]

    A --> B
    A --> C
    B --> A %% PR hacia development-v1.0.6
    C --> A %% PR hacia development-v1.0.6
    A --> D %% Versión aprobada que pasa a producción
    D --> E %% Producción fusionada con main
    D --> F %% Nueva rama creada como copia exacta de producción
    F --> G %% Ramas dev para David creadas desde development-v1.0.7
    F --> H %% Ramas dev para Dorian creadas desde development-v1.0.7
    G --> F %% PR de David hacia nueva rama development
    H --> F %% PR de Dorian hacia nueva rama development
```

---

## Explicación del Proceso

### 1. Finalización de la Versión Actual (`v1.0.6`)
- Los desarrolladores (`dev-v1.0.6-David`, `dev-v1.0.6-Dorian`) trabajan en sus respectivas ramas.
- Realizan Pull Requests (PRs) hacia `development-v1.0.6`.
- Una vez aprobada en QA, la versión `development-v1.0.6` se fusiona en `producción`.

### 2. Creación de la Nueva Versión (`v1.0.7`)
- Se genera una rama `development-v1.0.7` como una **copia exacta** de `producción`. Esto garantiza iniciar la nueva versión desde un estado funcional.
- Las ramas individuales (`dev-v1.0.7-David`, `dev-v1.0.7-Dorian`) se recrean derivadas de `development-v1.0.7`.

### 3. Flujo de Trabajo en la Nueva Versión
- Los desarrolladores trabajan en sus ramas individuales (`dev-v1.0.7-David`, `dev-v1.0.7-Dorian`).
- Envían PRs hacia `development-v1.0.7` y continúan el proceso hasta que la nueva versión esté lista para QA y pase a `producción`.

---

## Beneficios de Esta Estrategia

- **Organización:** Se crean ramas claras entre versiones y se racionaliza el trabajo de los desarrolladores.
- **Estabilidad:** La nueva versión siempre parte de un estado probado y confiable (`producción`).
- **Control:** Las ramas individuales aseguran un flujo controlado, evitando conflictos y validando los cambios antes de integrarlos.
