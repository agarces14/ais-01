import { useState } from "react";
import { ArrowRight, BrainCircuit } from "lucide-react";
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

export default function LeadAgent() {
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function runAgent(e) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/analyze-business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName,
          industry,
          website,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Agent failed");
      }

      setResult(data.result);
    } catch {
      setError(
        "No se ha podido ejecutar el agente. Revisa Vercel Logs."
      );
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

          <div className="mt-10 mb-12 max-w-4xl">
            <p className="text-sm uppercase tracking-[0.38em] text-cyan-300">
              Lead Intelligence Agent
            </p>

            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
              Analyze a business opportunity.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Detecta problemas, oportunidades de automatización y propuestas
              de mejora para vender sistemas AIS-01.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <Glass className="rounded-[2.3rem] p-6 md:p-8">
              <form onSubmit={runAgent} className="space-y-5">
                <input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Nombre del negocio"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none placeholder:text-zinc-600"
                  required
                />

                <input
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="Sector"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none placeholder:text-zinc-600"
                  required
                />

                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Web actual"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none placeholder:text-zinc-600"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-medium text-black hover:bg-cyan-200 disabled:opacity-60"
                >
                  {loading ? "Analyzing..." : "Run Lead Agent"}

                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </Glass>

            <Glass className="min-h-[520px] rounded-[2.3rem] p-6 md:p-8">
              <BrainCircuit className="mb-5 h-10 w-10 text-cyan-300" />

              <h2 className="text-2xl font-semibold">
                Lead Intelligence Report
              </h2>

              <div className="mt-6">
                {error && (
                  <p className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-red-300">
                    {error}
                  </p>
                )}

                {!result && !error && (
                  <p className="pt-20 text-center text-zinc-500">
                    El output aparecerá aquí.
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
