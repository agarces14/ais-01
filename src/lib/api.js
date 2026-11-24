import { supabase } from "./supabase";

/** POST JSON a /api/* enviando el token de la sesión de Supabase. */
export async function apiPost(path, body) {
  const { data } = await supabase.auth.getSession();
  const token = data?.session?.access_token;

  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(json.error || `Error ${response.status}`);
  }
  return json;
}
