import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

/**
 * Acceso privado con Supabase Auth.
 * Los usuarios se crean en Supabase (Authentication → Users); no hay registro público.
 */
export default function PrivateGate({ children }) {
  const [session, setSession] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) setSession(data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function signIn(e) {
    e.preventDefault();
    setSending(true);
    setError("");
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) setError("Email o contraseña incorrectos.");
    setSending(false);
  }

  if (session === undefined) {
    return <main className="min-h-screen bg-[#050506]" />;
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050506] px-6 text-white">
        <form
          onSubmit={signIn}
          className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-center backdrop-blur-2xl"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Private Access</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em]">AIS-01 Protected System</h1>
          <p className="mt-4 text-zinc-400">Inicia sesión para acceder.</p>

          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="mt-8 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-center text-white outline-none placeholder:text-zinc-600 focus:border-cyan-300/40"
          />
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="mt-4 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-center text-white outline-none placeholder:text-zinc-600 focus:border-cyan-300/40"
          />
          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={sending}
            className="mt-6 w-full rounded-2xl bg-cyan-300 px-4 py-4 font-semibold text-black disabled:opacity-50"
          >
            {sending ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <>
      <button
        onClick={() => supabase.auth.signOut()}
        className="fixed right-4 top-4 z-50 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs text-zinc-300 hover:text-white"
      >
        Cerrar sesión
      </button>
      {children}
    </>
  );
}
