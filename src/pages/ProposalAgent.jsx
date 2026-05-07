import { useState } from "react";
import { ArrowRight, FileText } from "lucide-react";
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

export default function ProposalAgent() {
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [problem, setProblem] = useState("");
  const [budgetLevel, setBudgetLevel] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function runProposal(e) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName,
          industry,
          problem,
          budgetLevel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Proposal Agent failed");
      }

      setResult(data.result);
    } catch {
      setError(
        "No se ha podido ejecutar el Proposal Agent. Revisa Vercel Logs."
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

          <div className="mb-12 mt-10 max-w-4xl">
            <p className="text-sm uppercase tracking-[0.38em] text-violet-300">
              Proposal Agent
            </p>

            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
              Turn an opportunity into a premium offer.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Genera una propuesta comercial con precio, paquete recomendado,
              beneficios y mensaje para cerrar al cliente.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <Glass className="rounded-[2.3rem] p-6 md:p-8">
              <form onSubmit={runProposal} className="space-y-5">
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

                <textarea
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="Problema principal detectado"
                  className="min-h-[140px] w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none"
                />

                <select
                  value={budgetLevel}
                  onChange={(e) => setBudgetLevel(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none"
                >
                  <option value="low">Presupuesto bajo</option>
                  <option value="medium">Presupuesto medio</option>
                  <option value="high">Presupuesto alto</option>
                </select>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-medium text-black hover:bg-violet-200 disabled:opacity-60"
                >
                  {loading ? "Generating..." : "Run Proposal Agent"}

                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </Glass>

            <Glass className="min-h-[520px] rounded-[2.3rem] p-6 md:p-8">
              <FileText className="mb-5 h-10 w-10 text-violet-300" />

              <h2 className="text-2xl font-semibold">
                Premium Proposal
              </h2>

              <div className="mt-6">
                {error && (
                  <p className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-red-300">
                    {error}
                  </p>
                )}

                {!result && !error && (
                  <p className="pt-20 text-center text-zinc-500">
                    La propuesta aparecerá aquí.
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
