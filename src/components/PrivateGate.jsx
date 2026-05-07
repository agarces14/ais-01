import { useState } from "react";

export default function PrivateGate({ children }) {
  const [accessCode, setAccessCode] = useState("");

  const hasAccess = accessCode === "agente007";

  if (!hasAccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050506] px-6 text-white">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-center backdrop-blur-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
            Private Access
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em]">
            AIS-01 Protected System
          </h1>

          <p className="mt-4 text-zinc-400">
            Introduce el código privado para acceder.
          </p>

          <input
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Access code"
            className="mt-8 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-center text-white outline-none placeholder:text-zinc-600 focus:border-cyan-300/40"
          />
        </div>
      </main>
    );
  }

  return children;
}
