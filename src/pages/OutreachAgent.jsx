import { useState } from "react";
import { ArrowRight, MessageSquare } from "lucide-react";
import PrivateGate from "../components/PrivateGate";

function Glass({ children, className = "" }) {
  return (
    <div
      className={`border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/40 backdrop-blur-2xl ${className}`}
    >
      {children}
    </div>
  );
}

export default function OutreachAgent() {
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [platform, setPlatform] = useState("email");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function runOutreach(e) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/generate-outreach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName,
          industry,
          platform,
          goal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Outreach Agent failed");
      }

      setResult(data.result);
    } catch {
      setError("No se ha podido ejecutar el Outreach Agent.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PrivateGate>
      <main className="min-h-screen bg-[#050506] px-6 py-10 text-white lg:px-10">
        <div className="mx-auto max-w-7xl">
          <a
            href="/dashboard"
            className="text-sm text-zinc-400 hover:text-white"
          >
            ← Back to dashboard
          </a>

          <div className="mb-12 mt-10 max-w-4xl">
            <p className="text-sm uppercase tracking-[0.38em] text-emerald-300">
              Outreach Agent
            </p>

            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
              Generate high-converting outreach.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Crea emails, DMs y mensajes personalizados para captar clientes
              premium automáticamente.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <Glass className="rounded-[2.3rem] p-6 md:p-8">
              <form onSubmit={runOutreach} className="space-y-5">
                <input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Nombre del negocio"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none"
                  required
                />

                <input
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="Sector"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none"
                  required
                />

                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none"
                >
                  <option value="email">Email</option>
                  <option value="instagram">Instagram DM</option>
                  <option value="linkedin">LinkedIn</option>
                </select>

                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="Objetivo del mensaje"
                  className="min-h-[140px] w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-medium text-black hover:bg-emerald-200 disabled:opacity-60"
                >
                  {loading ? "Generating..." : "Run Outreach Agent"}

                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </Glass>

            <Glass className="min-h-[520px] rounded-[2.3rem] p-6 md:p-8">
              <MessageSquare className="mb-5 h-10 w-10 text-emerald-300" />

              <h2 className="text-2xl font-semibold">
                Outreach Message
              </h2>

              <div className="mt-6">
                {error && (
                  <p className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-red-300">
                    {error}
                  </p>
                )}

                {!result && !error && (
                  <p className="pt-20 text-center text-zinc-500">
                    El mensaje generado aparecerá aquí.
                  </p>
                )}

                {result && (
                  <div className="max-h-[520px] overflow-y-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/35 p-5 text-sm leading-7 text-zinc-300">
                    {result}
                  </div>
                )}
              </div>
            </Glass>
          </div>
        </div>
      </main>
    </PrivateGate>
  );
}
