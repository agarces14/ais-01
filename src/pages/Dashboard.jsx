import { useState } from "react";
import {
  BrainCircuit,
  Database,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
} from "lucide-react";

export default function Dashboard() {
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
            AIS-01 Dashboard
          </h1>

          <p className="mt-4 text-zinc-400">
            Introduce el código privado para acceder al sistema.
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

  const cards = [
    {
      title: "Lead Intelligence",
      desc: "Analyze businesses and detect opportunities.",
      link: "/#/dashboard/lead-agent",
      hover: "hover:bg-cyan-200",
    },
    {
      title: "Proposal Engine",
      desc: "Generate premium offers and pricing.",
      link: "/#/dashboard/proposal-agent",
      hover: "hover:bg-violet-200",
    },
    {
      title: "Outreach System",
      desc: "Create personalized sales messages.",
      link: "/#/dashboard/outreach-agent",
      hover: "hover:bg-emerald-200",
    },
    {
        title: "Website Audit",
     desc: "Analyze websites, UX, conversion and premium perception.",
     link: "/#/dashboard/website-audit",
        hover: "hover:bg-cyan-200",
},
    {
      title: "CRM History",
      desc: "View saved agent outputs and lead intelligence.",
      link: "/#/dashboard/crm",
      hover: "hover:bg-cyan-200",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050506] text-white">
      <div className="flex">
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
              ["Overview", LayoutDashboard, "/#/dashboard"],
              ["Lead Agent", BrainCircuit, "/#/dashboard/lead-agent"],
              ["Proposal Agent", FileText, "/#/dashboard/proposal-agent"],
              ["Outreach Agent", MessageSquare, "/#/dashboard/outreach-agent"],
              ["CRM History", Database, "/#/dashboard/crm"],
              ["Settings", Settings, "#"],
            ].map(([label, Icon, link]) => (
              <a
                key={label}
                href={link}
                className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left text-zinc-300 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.06]"
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </a>
            ))}
          </nav>
        </aside>

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

          <div className="grid gap-5 lg:grid-cols-4">
            {cards.map((card) => (
              <div
                key={card.title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl"
              >
                <div className="mb-6 h-32 rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-cyan-300/10 to-violet-400/10" />

                <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                  {card.title}
                </h3>

                <p className="mt-3 leading-7 text-zinc-400">{card.desc}</p>

                <a
                  href={card.link}
                  className={`mt-8 inline-block rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition ${card.hover}`}
                >
                  Open
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
