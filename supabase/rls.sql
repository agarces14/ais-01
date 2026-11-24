-- Ejecutar en Supabase → SQL Editor.
-- Activa la seguridad por filas en agent_outputs: sin sesión iniciada no se puede
-- leer ni escribir nada, aunque alguien tenga la clave pública (anon).

alter table public.agent_outputs enable row level security;

drop policy if exists "auth_select_agent_outputs" on public.agent_outputs;
drop policy if exists "auth_insert_agent_outputs" on public.agent_outputs;
drop policy if exists "auth_update_agent_outputs" on public.agent_outputs;
drop policy if exists "auth_delete_agent_outputs" on public.agent_outputs;

create policy "auth_select_agent_outputs" on public.agent_outputs
  for select to authenticated using (true);
create policy "auth_insert_agent_outputs" on public.agent_outputs
  for insert to authenticated with check (true);
create policy "auth_update_agent_outputs" on public.agent_outputs
  for update to authenticated using (true) with check (true);
create policy "auth_delete_agent_outputs" on public.agent_outputs
  for delete to authenticated using (true);

-- Revoca cualquier permiso del rol anónimo sobre la tabla.
revoke all on public.agent_outputs from anon;

-- Importante: en Authentication → Providers → Email, desactiva "Allow new users to sign up"
-- para que nadie pueda crearse una cuenta. Crea tu usuario en Authentication → Users.
