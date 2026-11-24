# AIS-01

Panel privado con agentes de IA: análisis de negocio, auditoría web, propuestas y mensajes de respuesta, con un CRM sencillo en Supabase.

## Seguridad

- **Acceso**: Supabase Auth (email y contraseña). No hay registro público.
- **APIs** (`/api/*`): exigen una sesión válida de Supabase. Si se define `ALLOWED_EMAILS`, solo esos usuarios pueden usarlas.
- **Datos**: la tabla `agent_outputs` debe tener RLS activado (`supabase/rls.sql`).
- **Coste**: límite de longitud de entrada y de tokens de salida por llamada. Configura también un límite mensual en el panel de OpenAI.

## Auditoría web

`/api/website-audit` descarga el HTML real de la web (con protección contra direcciones internas, tiempo máximo y tamaño máximo), extrae hechos observables y la IA solo comenta sobre ellos. Si la web no se puede abrir, no genera auditoría. No evalúa diseño visual ni velocidad.

## Puesta en marcha

1. `cp .env.example .env` y rellena las variables.
2. En Supabase:
   - Ejecuta `supabase/rls.sql`.
   - Desactiva el registro público.
   - Crea tu usuario.
3. En Vercel, define `OPENAI_API_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` y, opcionalmente, `ALLOWED_EMAILS`.
4. `npm ci && npm run dev`.

## Comandos

- `npm run dev`: desarrollo
- `npm run build`: compilación
- `npm run lint`: revisión de código
