import { useEffect, useState } from "react";
import { Database } from "lucide-react";
import PrivateGate from "../components/PrivateGate";
import { supabase } from "../lib/supabase";

export default function CRM() {
  const [outputs, setOutputs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadOutputs() {
    setLoading(true);

    const { data, error } = await supabase
      .from("agent_outputs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setOutputs(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadOutputs();
  }, []);

  return (
    <PrivateGate>
      <main className="min-h-screen bg-[#050506] px-6 py-10 text-white lg:px-10">
        <div className="mx-auto max-w-7xl">
          <a href="/#/dashboard" className="text-sm text-zinc-400 hover:text-white">
            ← Back to dashboard
          </a>

          <div className="mb-12 mt-10 max-w-4xl">
            <p className="text-sm uppercase tracking-[0.38em] text-cyan-300">
              AIS-01 CRM
            </p>

            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
              Agent output history.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Guarda y revisa análisis, propuestas y mensajes generados por tus agentes.
            </p>
          </div>

          <div className="rounded-[2.3rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <Database className="h-6 w-6 text-cyan-300" />
                <h2 className="text-2xl font-semibold">Saved outputs</h2>
              </div>

              <button
                onClick={loadOutputs}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-cyan-200"
              >
                Refresh
              </button>
            </div>

            {loading && (
              <p className="py-20 text-center text-zinc-500">Loading CRM...</p>
            )}

            {!loading && outputs.length === 0 && (
              <p className="py-20 text-center text-zinc-500">
                Todavía no hay outputs guardados.
              </p>
            )}

            <div className="space-y-4">
              {outputs.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-black/35 p-5"
                >
                  <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                        {item.agent_type}
                      </p>

                      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                        {item.business_name || "Unnamed business"}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-400">
                        {item.industry || "No industry"} ·{" "}
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>

                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                      Score: {item.score || 0}
                    </span>
                  </div>

                  <div className="max-h-[260px] overflow-y-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/35 p-4 text-sm leading-7 text-zinc-300">
                    {item.result}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </PrivateGate>
  );
}