import {
  BrainCircuit,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
} from "lucide-react";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#050506] text-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="flex min-h-screen w-[280px] flex-col border-r border-white/10 bg-black/30 p-6 backdrop-blur-2xl">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              AIS-01
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.06em]">
              Dashboard
            </h1>
          </div>

          <nav className="space-y-3">
            {[
              ["Overview", LayoutDashboard],
              ["Lead Agent", BrainCircuit],
              ["Proposal Agent", FileText],
              ["Outreach Agent", MessageSquare],
              ["Settings", Settings],
            ].map(([label, Icon]) => (
              <button
                key={label}
                className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left text-zinc-300 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.06]"
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <section className="flex-1 p-8">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
              Autonomous Intelligence System
            </p>

            <h2 className="mt-4 text-6xl font-semibold tracking-[-0.07em]">
              Welcome back.
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
              Manage agents, generate proposals, analyze businesses and
              automate operations from a unified AI-native dashboard.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {[
              [
                "Lead Intelligence",
                "Analyze businesses and detect opportunities.",
                "/dashboard/lead-agent",
                "hover:bg-cyan-200",
              ],
              [
                "Proposal Engine",
                "Generate premium offers and pricing.",
                "/dashboard/proposal-agent",
                "hover:bg-violet-200",
              ],
              [
                "Outreach System",
                "Create personalized sales messages.",
                "#",
                "hover:bg-white",
              ],
            ].map(([title, desc, link, hover]) => (
              <div
                key={title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl"
              >
                <div className="mb-6 h-32 rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-cyan-300/10 to-violet-400/10" />

                <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                  {title}
                </h3>

                <p className="mt-3 leading-7 text-zinc-400">
                  {desc}
                </p>

                <a
                  href={link}
                  className={`mt-8 inline-block rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition ${hover}`}
                >
                  Open Agent
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
