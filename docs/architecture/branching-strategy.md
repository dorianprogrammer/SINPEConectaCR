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
- Actúa como punto central de integración para todo el código relacionado con una versión específica.
- Se crea como una **copia exacta** de `producción` cuando se inicia el trabajo en una nueva versión.

**Nota:**  
Cuando se incrementa la versión (por ejemplo, de `v1.0.6` a `v1.0.7`), se crea la nueva rama `development-v1.0.7` como una copia de `producción`.

---

### Ramas de Colaboradores
Cada desarrollador trabaja en una rama personalizada derivada de `development-vx.x.x`. Las ramas de colaboradores para una nueva versión (`dev-vx.x.x-Nombre`) se regeneran con cada incremento de versión.

Ejemplo:  
- `dev-v1.0.6-David` → Aporta cambios a `development-v1.0.6`.  
- `dev-v1.0.7-David` → Aporta cambios a `development-v1.0.7` en la nueva versión.

**Utilización:**  
- Espacio aislado para el desarrollo individual con menor riesgo de conflictos.  
- Los cambios se validan mediante PR hacia la rama de desarrollo correspondiente (`development-vx.x.x`).

---

### Ramas de Respaldo y Restauración
Las ramas de respaldo (`bkp-*`) y restauración (`reset-*`) garantizan que las versiones anteriores permanezcan accesibles para referencia o recuperación.

Ejemplo:  
- `bkp-development-v1.0.6`  
- `reset-development-v1.0.6`

**Utilización:**  
- Para archivado o recuperación de versiones anteriores.  

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
    B --> A %% PR solo hacia development-v1.0.6
    C --> A %% PR solo hacia development-v1.0.6
    A --> D %% Versión aprobada en QA pasa a producción
    D --> E %% Se fusiona producción con main
    D --> F %% Nueva rama creada como copia exacta de producción
    F --> G %% Desarrollo para nueva versión: David
    F --> H %% Desarrollo para nueva versión: Dorian
    G --> F %% PR hacia nueva rama de desarrollo
    H --> F %% PR hacia nueva rama de desarrollo
```

---

## Explicación del Proceso

### 1. Finalización de la Versión Actual (`v1.0.6`)
- Los desarrolladores (`dev-v1.0.6-David`, `dev-v1.0.6-Dorian`) trabajan en sus respectivas ramas.
- Las contribuciones de código se envían mediante Pull Requests (PRs) hacia `development-v1.0.6`.
- Una vez QA aprueba la versión, se realiza un PR desde `development-v1.0.6` hacia `producción`. Esto marca el final de la versión.

### 2. Creación de la Nueva Versión (`v1.0.7`)
- Se crea una nueva rama `development-v1.0.7` como **una copia exacta** de `producción`. Esto asegura que el trabajo en la nueva versión comience desde una base funcional y estable.
- Las ramas individuales de los desarrolladores (`dev-v1.0.7-David`, `dev-v1.0.7-Dorian`) se recrean, derivando de la nueva rama de desarrollo (`development-v1.0.7`).

### 3. Flujo de Trabajo en la Nueva Versión
- Los desarrolladores trabajan en sus respectivas ramas (`dev-v1.0.7-David`, `dev-v1.0.7-Dorian`) y envían sus contribuciones hacia `development-v1.0.7`.
- Una vez completada y aprobada la nueva versión, el ciclo se repite:  
   - PR de `development-v1.0.7` hacia `producción`.
   - Creación de la siguiente versión (`v1.0.8`).

---

## Beneficios de Esta Estrategia

- **Organización:** Se realizan transiciones claras entre versiones, recreándose ramas individuales y de desarrollo con cada incremento.
- **Estabilidad:** Las bases de nuevas versiones se toman de ramas probadas en producción, proporcionando un punto de partida confiable.
- **Control:** Las ramas individuales garantizan que cada colaborador tenga un espacio dedicado para trabajar, reduciendo conflictos mientras se controlan los PRs hacia ramas de versión.
