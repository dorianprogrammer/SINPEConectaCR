<!--
  Database Structure (DBS) — SINPEConectaCR
  Styled with inline HTML + CSS for a clean, readable doc.
-->

<style>
  :root {
    --bg: #0b0f1a;
    --panel: #111827;
    --text: #e5e7eb;
    --muted: #94a3b8;
    --primary: #22d3ee;
    --accent: #a78bfa;
    --green: #34d399;
    --red: #f87171;
    --border: #1f2937;
  }
  .page {
    background: var(--bg);
    color: var(--text);
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
    padding: 24px;
    line-height: 1.6;
  }
  .container {
    max-width: 1100px;
    margin: 0 auto;
  }
  .hero {
    background: radial-gradient(1000px 400px at 10% 0%, rgba(167,139,250,0.20), transparent 60%),
                radial-gradient(1000px 400px at 90% 0%, rgba(34,211,238,0.20), transparent 60%),
                linear-gradient(180deg, rgba(17,24,39,0.80), rgba(17,24,39,0.60));
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 28px;
    box-shadow: 0 0 30px rgba(167,139,250,0.08);
    margin-bottom: 20px;
  }
  .title {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: 0.2px;
  }
  .subtitle {
    font-size: 14px;
    color: var(--muted);
    margin-top: 4px;
  }
  .grid {
    display: grid;
    gap: 16px;
  }
  .two-cols {
    grid-template-columns: 1fr 1fr;
  }
  .panel {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 18px;
  }
  .panel h2 {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 10px 0;
  }
  .panel h3 {
    font-size: 16px;
    font-weight: 700;
    margin: 18px 0 6px 0;
  }
  .panel p, .panel li, .panel code, .panel pre {
    font-size: 14px;
  }
  .muted {
    color: var(--muted);
  }
  .badge {
    display: inline-block;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: linear-gradient(180deg, rgba(31,41,55,0.8), rgba(17,24,39,0.8));
    color: var(--text);
    margin-right: 6px;
  }
  .authors {
    display: grid;
    gap: 14px;
  }
  .author-card {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 14px;
    align-items: center;
    background: linear-gradient(180deg, rgba(31,41,55,0.6), rgba(17,24,39,0.6));
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 14px;
  }
  .avatar {
    width: 72px;
    height: 72px;
    border-radius: 14px;
    background: radial-gradient(100px 80px at 50% 50%, rgba(34,211,238,0.25), rgba(167,139,250,0.15));
    border: 1px solid var(--border);
  }
  .author-name {
    font-weight: 700;
    font-size: 16px;
  }
  .author-role {
    font-size: 12px;
    color: var(--muted);
  }
  .codeblock {
    background: #0b1220;
    border: 1px solid #162034;
    border-radius: 12px;
    padding: 12px;
    overflow: auto;
  }
  .kbd {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 12px;
  }
  .list-dot li::marker { color: var(--accent); }
  @media (max-width: 820px) {
    .two-cols { grid-template-columns: 1fr; }
    .author-card { grid-template-columns: 64px 1fr; }
    .avatar { width: 64px; height: 64px; }
  }
</style>

<div class="page">
  <div class="container">
    <section class="hero">
      <div class="title">Database Structure (DBS) · SINPEConectaCR</div>
      <div class="subtitle">Arquitectura con separación por dominios y procedimientos, llamadas calificadas por schema</div>
      <div style="margin-top:10px">
        <span class="badge">PostgreSQL</span>
        <span class="badge">Schemas</span>
        <span class="badge">Stored Procedures</span>
        <span class="badge">Multi-tenant</span>
        <span class="badge">DBS</span>
      </div>
    </section>

    <section class="panel">
      <h2>Authors</h2>
      <div class="authors">
        <div class="author-card">
          <div class="avatar" aria-hidden="true"></div>
          <div>
            <div class="author-name">👑 Dorian Rodríguez Ruiz</div>
            <div class="author-role">Autor principal · Software Developer · IA aplicada a PYMES (Costa Rica)</div>
            <div class="muted" style="margin-top:6px">
              <span class="badge">IA & Arquitectura</span>
              <span class="badge">Project Lead</span>
              <span class="badge">WhatsApp API</span>
            </div>
          </div>
        </div>

        <div class="author-card">
          <div class="avatar" aria-hidden="true"></div>
          <div>
            <div class="author-name">💻 David Artavia Arias</div>
            <div class="author-role">Coautor · Full Stack Developer · Arquitectura de Datos & Sistemas (Costa Rica)</div>
            <div class="muted" style="margin-top:6px">
              <span class="badge">DB Architecture</span>
              <span class="badge">Backend Services</span>
              <span class="badge">Frontend Dev</span>
            </div>
          </div>
        </div>
      </div>
      <div class="muted" style="margin-top:10px">Fecha: 2026-01-24</div>
    </section>

    <section class="grid two-cols">
      <div class="panel">
        <h2>Principios de Arquitectura</h2>
        <ul class="list-dot">
          <li>Separación por dominios con <span class="kbd">schemas</span> dedicados.</li>
          <li>Procedimientos almacenados organizados por esquema de lógica (<span class="kbd">auth_proc</span>, <span class="kbd">crm_proc</span>).</li>
          <li>Llamadas desde la app usando nombres con <em>schema calificado</em> (sin <span class="kbd">search_path</span>, sin wrappers en <span class="kbd">public</span>).</li>
          <li>Archivos SQL pequeños por responsabilidad: tablas, SPs, índices, datos iniciales.</li>
        </ul>
      </div>

      <div class="panel">
        <h2>Orden de Provisionamiento</h2>
        <ol>
          <li>02-Schemas.sql</li>
          <li>03-Tables/*</li>
          <li>04-Procedures/*</li>
          <li>07-Indexes/*</li>
          <li>08-Initial_Loads.sql</li>
        </ol>
        <p class="muted">Nota: 01-Create_DB.sql es informativo; la creación de la base suele ejecutarse fuera de migraciones.</p>
      </div>
    </section>

    <section class="panel">
      <h2>Schemas</h2>
      <div class="grid two-cols">
        <div>
          <h3>Dominio</h3>
          <ul class="list-dot">
            <li><strong>core</strong>: businesses, users</li>
            <li><strong>crm</strong>: contacts, orders, order_items</li>
            <li><strong>payments</strong>: ingestión/normalización SINPE (futuro)</li>
            <li><strong>ia</strong>: OCR/LLM (futuro)</li>
            <li><strong>audit</strong>: auditoría y logs</li>
            <li><strong>util</strong>: auxiliares</li>
            <li><strong>repo</strong>: vistas y reportería</li>
            <li><strong>secu</strong>: datos sensibles (opcional)</li>
          </ul>
        </div>
        <div>
          <h3>Procedimientos</h3>
          <ul class="list-dot">
            <li><strong>auth_proc</strong>: SPs de autenticación</li>
            <li><strong>crm_proc</strong>: SPs del CRM</li>
          </ul>
        </div>
      </div>
      <div class="codeblock">
        <pre><code>CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE SCHEMA IF NOT EXISTS core;
CREATE SCHEMA IF NOT EXISTS crm;
CREATE SCHEMA IF NOT EXISTS payments;
CREATE SCHEMA IF NOT EXISTS ia;
CREATE SCHEMA IF NOT EXISTS audit;
CREATE SCHEMA IF NOT EXISTS util;
CREATE SCHEMA IF NOT EXISTS repo;
CREATE SCHEMA IF NOT EXISTS auth_proc;
CREATE SCHEMA IF NOT EXISTS crm_proc;
CREATE SCHEMA IF NOT EXISTS secu;</code></pre>
      </div>
    </section>

    <section class="panel">
      <h2>Estructura de Carpetas (DBS)</h2>
      <div class="codeblock">
        <pre><code>DBS/
└── Base Product/
    ├── 01-Create_DB.sql
    ├── 02-Schemas.sql
    ├── 03-Tables/
    │   ├── CORE_BUSINESSES.sql
    │   ├── CORE_USERS.sql
    │   ├── AUDIT_AUTH_AUDIT_LOGS.sql
    │   ├── CRM_CONTACTS.sql
    │   ├── CRM_ORDERS.sql
    │   └── CRM_ORDER_ITEMS.sql
    ├── 04-Procedures/
    │   ├── AUTH_SP_AUTH_REGISTER.sql
    │   ├── AUTH_SP_AUTH_LOGIN.sql
    │   ├── CRM_SP_CRM_DASHBOARD_SUMMARY.sql
    │   ├── CRM_SP_CRM_ORDER_LIST.sql
    │   ├── CRM_SP_CRM_ORDER_CREATE.sql
    │   ├── CRM_SP_CRM_ORDER_UPDATE.sql
    │   ├── CRM_SP_CRM_ORDER_UPDATE_STATUS.sql
    │   ├── CRM_SP_CRM_ORDER_DELETE.sql
    │   ├── CRM_SP_CRM_CONTACT_LIST.sql
    │   ├── CRM_SP_CRM_CONTACT_CREATE.sql
    │   ├── CRM_SP_CRM_CONTACT_UPDATE.sql
    │   └── CRM_SP_CRM_CONTACT_DELETE.sql
    ├── 05-Primary_Keys.sql
    ├── 06-Foreign_Keys.sql
    ├── 07-Indexes/
    │   ├── CORE_IDX_USERS_EMAIL.sql
    │   ├── CORE_IDX_USERS_BUSINESS_ID.sql
    │   ├── AUDIT_IDX_AUTH_LOGS.sql
    │   ├── CRM_IDX_CONTACTS.sql
    │   └── CRM_IDX_ORDERS.sql
    ├── 08-Initial_Loads.sql</code></pre>
      </div>
    </section>

    <section class="panel">
      <h2>Tablas · ejemplos</h2>
      <h3>core.businesses</h3>
      <div class="codeblock"><pre><code>CREATE TABLE IF NOT EXISTS core.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);</code></pre></div>

      <h3>core.users</h3>
      <div class="codeblock"><pre><code>CREATE TABLE IF NOT EXISTS core.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'PYME')),
  business_id UUID NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_users_business
    FOREIGN KEY (business_id)
    REFERENCES core.businesses(id)
    ON DELETE RESTRICT
);</code></pre></div>

      <h3>audit.auth_audit_logs</h3>
      <div class="codeblock"><pre><code>CREATE TABLE IF NOT EXISTS audit.auth_audit_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID,
  business_id UUID,
  action VARCHAR(50) NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);</code></pre></div>
    </section>

    <section class="panel">
      <h2>Procedimientos · ejemplos</h2>
      <h3>auth_proc.SP_AUTH_REGISTER</h3>
      <div class="codeblock"><pre><code>-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Registra negocio y usuario, audita y retorna USER_ID, EMAIL, ROLE, BUSINESS_ID
CREATE OR REPLACE FUNCTION auth_proc.SP_AUTH_REGISTER(
  P_BUSINESS_NAME   VARCHAR,
  P_BUSINESS_PHONE  VARCHAR,
  P_EMAIL           VARCHAR,
  P_PASSWORD        VARCHAR,
  P_IP              VARCHAR DEFAULT NULL,
  P_USER_AGENT      TEXT DEFAULT NULL
)
RETURNS TABLE (USER_ID UUID, EMAIL VARCHAR, ROLE VARCHAR, BUSINESS_ID UUID)
LANGUAGE plpgsql
AS $$ ... $$;</code></pre></div>

      <h3>auth_proc.SP_AUTH_LOGIN</h3>
      <div class="codeblock"><pre><code>-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Valida credenciales, audita éxito/fallo y retorna USER_ID, EMAIL, ROLE, BUSINESS_ID
CREATE OR REPLACE FUNCTION auth_proc.SP_AUTH_LOGIN(
  P_EMAIL VARCHAR,
  P_PASSWORD VARCHAR,
  P_IP VARCHAR DEFAULT NULL,
  P_USER_AGENT TEXT DEFAULT NULL
)
RETURNS TABLE (USER_ID UUID, EMAIL VARCHAR, ROLE VARCHAR, BUSINESS_ID UUID)
LANGUAGE plpgsql
AS $$ ... $$;</code></pre></div>
      <p class="muted">Todos los SPs del CRM siguen el mismo patrón en <span class="kbd">crm_proc</span> con nombres calificados.</p>
    </section>

    <section class="panel">
      <h2>Índices · ejemplos</h2>
      <div class="grid two-cols">
        <div class="codeblock"><pre><code>CREATE INDEX IF NOT EXISTS idx_users_email ON core.users(email);
CREATE INDEX IF NOT EXISTS idx_users_business_id ON core.users(business_id);</code></pre></div>
        <div class="codeblock"><pre><code>CREATE INDEX IF NOT EXISTS idx_audit_business_id ON audit.auth_audit_logs(business_id);
CREATE INDEX IF NOT EXISTS idx_audit_user_id ON audit.auth_audit_logs(user_id);</code></pre></div>
      </div>
    </section>

    <section class="panel">
      <h2>Integración con la Aplicación</h2>
      <ul class="list-dot">
        <li>Invocar SPs con nombre calificado por schema (ej. <span class="kbd">auth_proc.SP_AUTH_LOGIN</span>).</li>
        <li>Evitar <span class="kbd">search_path</span> y wrappers en <span class="kbd">public</span>.</li>
        <li>Separación por responsabilidad: <span class="kbd">core</span> (entidades), <span class="kbd">crm</span> (dominio CRM), <span class="kbd">audit</span> (trazabilidad), <span class="kbd">auth_proc/crm_proc</span> (procedimientos).</li>
      </ul>
    </section>

    <section class="panel">
      <h2>Buenas Prácticas</h2>
      <ul class="list-dot">
        <li>Convenciones de nombres claras (English, snake_case para columnas).</li>
        <li>Constraints cercanos a las definiciones de tablas para legibilidad.</li>
        <li>Índices explícitos por consultas frecuentes y claves foráneas con intención.</li>
        <li>Para producción: considerar roles por microservicio (mínimo privilegio).</li>
      </ul>
    </section>

    <section class="panel">
      <h2>Resumen</h2>
      <p>La arquitectura DBS estandariza la separación por dominios y procedimientos, favorece mantenibilidad, claridad y seguridad. Todas las llamadas se realizan con nombres calificados por schema, alineando la práctica con la lógica del negocio de SINPEConectaCR.</p>
    </section>
  </div>
</div>
