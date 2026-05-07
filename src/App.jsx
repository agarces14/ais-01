import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  CalendarCheck,
  Check,
  Cpu,
  Gauge,
  Layers3,
  LineChart,
  Menu,
  Network,
  Orbit,
  ShieldCheck,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";

const capabilities = [
  {
    icon: BrainCircuit,
    title: "AI Strategy",
    text: "Arquitectura de crecimiento, automatización y posicionamiento premium.",
  },
  {
    icon: Workflow,
    title: "Autonomous Workflows",
    text: "Sistemas que captan, responden, califican, siguen y convierten leads.",
  },
  {
    icon: Layers3,
    title: "Cinematic Web Systems",
    text: "Interfaces oscuras, premium, rápidas y diseñadas para vender percepción.",
  },
  {
    icon: LineChart,
    title: "Revenue Intelligence",
    text: "Dashboards, métricas, embudos y optimización continua.",
  },
];

const agents = ["Research", "Design", "Sales", "Automation", "Analytics", "Optimization"];

const caseStudies = [
  {
    title: "Luxury Barbershop OS",
    type: "Booking + WhatsApp AI",
    stat: "+38%",
    label: "estimated booking lift",
  },
  {
    title: "Premium Clinic Engine",
    type: "Onboarding + Follow-up",
    stat: "24/7",
    label: "AI patient layer",
  },
  {
    title: "Real Estate Lead Core",
    type: "CRM + Lead scoring",
    stat: "3.4x",
    label: "faster lead handling",
  },
];

const pricing = [
  {
    name: "Launch System",
    price: "1.200€+",
    desc: "Web premium lista para vender percepción y captar leads.",
    features: ["Landing premium", "Copy estratégico", "Motion básico", "Responsive", "Deploy"],
  },
  {
    name: "Growth Automation",
    price: "2.500€+",
    desc: "Sistema con web, captación, CRM inicial y automatizaciones.",
    features: ["Web premium", "Formulario inteligente", "CRM", "Automaciones", "Dashboard"],
    featured: true,
  },
  {
    name: "AIS-01 OS",
    price: "Retainer",
    desc: "Infraestructura IA continua para operar, crecer y optimizar.",
    features: ["Agentes IA", "Lead systems", "Dashboards", "Optimización", "Soporte estratégico"],
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Glow({ className }) {
  return <div className={cn("pointer-events-none absolute rounded-full blur-[100px]", className)} />;
}

function Badge({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-zinc-300 shadow-2xl shadow-black/40 backdrop-blur-2xl">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
      </span>
      {children}
    </div>
  );
}

function Glass({ children, className = "" }) {
  return (
    <div className={cn("border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/40 backdrop-blur-2xl", className)}>
      {children}
    </div>
  );
}

function FloatingInterface() {
  const [active, setActive] = useState(1);

  return (
    <div className="relative mx-auto w-full max-w-[680px]">
      <motion.div
        animate={{ y: [0, -14, 0], rotateX: [0, 2, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-r from-cyan-500/25 via-violet-500/15 to-blue-500/25 blur-3xl" />

        <Glass className="relative overflow-hidden rounded-[2.4rem] p-3">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(34,211,238,0.2),transparent_32%),radial-gradient(circle_at_90%_0%,rgba(168,85,247,0.18),transparent_36%)]" />

          <div className="relative rounded-[1.8rem] border border-white/10 bg-black/65 p-5">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black">
                  <Orbit className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.32em] text-zinc-500">AIS-01 Core</p>
                  <p className="text-lg font-semibold text-white">Autonomous Command</p>
                </div>
              </div>

              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                Live
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.15fr]">
              <div className="space-y-3">
                {agents.map((agent, i) => (
                  <button key={agent} onMouseEnter={() => setActive(i)} className="w-full text-left">
                    <motion.div
                      animate={{ opacity: active === i ? 1 : 0.48, x: active === i ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm",
                        active === i
                          ? "border-cyan-300/35 bg-cyan-300/[0.08] text-white shadow-lg shadow-cyan-500/10"
                          : "border-white/10 bg-white/[0.03] text-zinc-500"
                      )}
                    >
                      <span>{agent} Agent</span>
                      <span className={cn("h-2 w-2 rounded-full", active === i ? "bg-cyan-300" : "bg-zinc-700")} />
                    </motion.div>
                  </button>
                ))}
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950/90 p-4">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
                    <Network className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Execution Layer</p>
                    <p className="text-xs text-zinc-500">Multi-agent orchestration</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex justify-between text-xs text-zinc-500">
                      <span>Revenue Readiness</span>
                      <span>{82 + active}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400"
                        animate={{ width: `${62 + active * 6}%` }}
                        transition={{ duration: 0.45 }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[["42", "leads"], ["18", "flows"], ["3", "offers"]].map(([n, l]) => (
                      <div key={l} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                        <p className="text-2xl font-semibold tracking-[-0.05em] text-white">{n}</p>
                        <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">{l}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.06] p-3 text-sm leading-6 text-zinc-300">
                    AIS-01 detected 12 conversion leaks, generated 3 proposals and activated follow-up automation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Glass>
      </motion.div>

      <motion.div
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-10 -left-5 hidden rounded-3xl border border-white/10 bg-black/70 p-4 shadow-2xl shadow-black/50 backdrop-blur-2xl md:block"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-300">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Proposal generated</p>
            <p className="text-xs text-zinc-500">2.500€ automation system</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 -top-8 hidden rounded-3xl border border-white/10 bg-black/70 p-4 shadow-2xl shadow-black/50 backdrop-blur-2xl md:block"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Lead qualified</p>
            <p className="text-xs text-zinc-500">Clinic · high intent</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function BentoSection() {
  return (
    <section id="systems" className="relative z-10 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-4xl">
          <p className="text-sm uppercase tracking-[0.38em] text-cyan-300">Infrastructure</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] md:text-7xl">
            A complete operating layer, not another agency website.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          <Glass className="relative overflow-hidden rounded-[2rem] p-7 lg:col-span-7 lg:min-h-[390px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.17),transparent_34%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-semibold tracking-[-0.05em] md:text-5xl">AI Lead Hunter</h3>
                <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-400">
                  Detecta negocios con webs débiles, analiza oportunidades, genera auditorías premium y prepara propuestas personalizadas.
                </p>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[["Scan", "business discovery"], ["Audit", "conversion leaks"], ["Pitch", "premium proposal"]].map(([a, b]) => (
                  <div key={a} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="font-medium text-white">{a}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-zinc-500">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </Glass>

          <Glass className="rounded-[2rem] p-7 lg:col-span-5">
            <div className="mb-7 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-300">
                <Gauge className="h-6 w-6" />
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">Live metrics</span>
            </div>

            <h3 className="text-3xl font-semibold tracking-[-0.05em]">Revenue dashboard</h3>

            <div className="mt-7 space-y-4">
              {[["Qualified leads", "72%"], ["Follow-up automation", "91%"], ["Proposal readiness", "84%"]].map(([label, value]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm text-zinc-400">
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-violet-400" style={{ width: value }} />
                  </div>
                </div>
              ))}
            </div>
          </Glass>

          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <Glass
                key={item.title}
                className="group rounded-[2rem] p-6 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/[0.045] lg:col-span-3"
              >
                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.055] text-cyan-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{item.text}</p>
              </Glass>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CaseStudies() {
  return (
    <section id="work" className="relative z-10 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.38em] text-cyan-300">Demo Systems</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.06em] md:text-7xl">
              Portfolio that feels like software, not templates.
            </h2>
          </div>
          <p className="max-w-md text-lg leading-8 text-zinc-400">
            Cada demo parece una empresa real: visual premium, automatización vendible y propuesta clara.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {caseStudies.map((item) => (
            <motion.div key={item.title} whileHover={{ y: -8 }} transition={{ duration: 0.25 }} className="group">
              <Glass className="relative min-h-[470px] overflow-hidden rounded-[2.3rem] p-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_10%,rgba(34,211,238,0.17),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.055),transparent_55%)]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-5 flex items-center justify-between">
                      <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs text-zinc-400">
                        {item.type}
                      </span>
                      <ArrowRight className="h-4 w-4 text-zinc-600 transition group-hover:translate-x-1 group-hover:text-cyan-300" />
                    </div>

                    <div className="relative mb-7 h-56 overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/45 p-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/10 via-transparent to-violet-400/10" />
                      <div className="relative mb-4 flex gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                      </div>

                      <div className="relative grid h-[170px] grid-cols-6 grid-rows-5 gap-2">
                        <div className="col-span-2 row-span-5 rounded-2xl bg-white/[0.06]" />
                        <div className="col-span-4 row-span-2 rounded-2xl bg-gradient-to-br from-cyan-300/25 to-blue-500/10" />
                        <div className="col-span-2 row-span-3 rounded-2xl bg-white/[0.05]" />
                        <div className="col-span-2 row-span-3 rounded-2xl bg-violet-400/10" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold tracking-[-0.045em] md:text-3xl">{item.title}</h3>
                  </div>

                  <div className="mt-8 rounded-[1.7rem] border border-white/10 bg-black/35 p-5">
                    <p className="text-6xl font-semibold tracking-[-0.08em]">{item.stat}</p>
                    <p className="mt-2 text-sm text-zinc-500">{item.label}</p>
                  </div>
                </div>
              </Glass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="relative z-10 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-4xl">
          <p className="text-sm uppercase tracking-[0.38em] text-cyan-300">Monetizable Offers</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] md:text-7xl">
            Packages designed to close, then scale.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pricing.map((plan) => (
            <Glass
              key={plan.name}
              className={cn(
                "relative overflow-hidden rounded-[2.3rem] p-7",
                plan.featured && "border-cyan-300/40 bg-cyan-300/[0.06]"
              )}
            >
              {plan.featured && (
                <div className="absolute right-5 top-5 rounded-full bg-cyan-300 px-3 py-1 text-xs font-medium text-black">
                  Best entry
                </div>
              )}

              <h3 className="text-2xl font-semibold tracking-[-0.04em]">{plan.name}</h3>
              <p className="mt-4 min-h-[56px] text-sm leading-7 text-zinc-400">{plan.desc}</p>
              <p className="mt-8 text-5xl font-semibold tracking-[-0.07em]">{plan.price}</p>

              <div className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">
                      <Check className="h-3 w-3" />
                    </span>
                    {feature}
                  </div>
                ))}
              </div>
            </Glass>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AIS01LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050506] text-white selection:bg-cyan-300 selection:text-black">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "78px 78px",
          maskImage: "radial-gradient(ellipse at top, black, transparent 72%)",
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(168,85,247,0.12),transparent_30%)]" />

      <section className="relative z-10 px-6 pb-24 pt-6 lg:px-10 lg:pb-36">
        <Glow className="left-1/2 top-[-160px] h-[520px] w-[780px] -translate-x-1/2 bg-cyan-500/24" />
        <Glow className="right-[-220px] top-[240px] h-[480px] w-[480px] bg-violet-500/16" />
        <Glow className="bottom-[-230px] left-[-190px] h-[520px] w-[520px] bg-blue-500/12" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/35 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
              <Orbit className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.3em]">AIS-01</p>
              <p className="hidden text-[10px] uppercase tracking-[0.22em] text-zinc-500 sm:block">Autonomous Intelligence</p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
            <a href="#systems" className="transition hover:text-white">Systems</a>
            <a href="#work" className="transition hover:text-white">Work</a>
            <a href="#pricing" className="transition hover:text-white">Pricing</a>
            <a href="/#/dashboard" className="transition hover:text-white">Platform</a>
          </div>

          <a href="/#/dashboard" className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-cyan-200 sm:inline-flex">
            Access Platform
          </a>

          <Menu className="h-5 w-5 text-zinc-400 md:hidden" />
        </nav>

        <div className="mx-auto grid max-w-7xl items-center gap-20 pt-20 lg:grid-cols-[1.02fr_0.98fr] lg:pt-28">
          <div>
            <Badge>AI-native operating studio · Premium automation</Badge>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              className="mt-8 max-w-5xl text-5xl font-semibold tracking-[-0.08em] md:text-7xl lg:text-[7.2rem] lg:leading-[0.84]"
            >
              Build the system your competitors will copy too late.
            </motion.h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
              AIS-01 creates AI-native web systems, automation workflows and revenue infrastructure for businesses that want to look premium, operate faster and convert better.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="/#/dashboard" className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-medium text-black transition hover:bg-cyan-200">
                Access AIS-01 Platform
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>

              <a href="#work" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.055] px-6 py-4 font-medium text-white backdrop-blur-xl transition hover:bg-white/[0.09]">
                See demo systems
              </a>
            </div>

            <div className="mt-14 grid max-w-2xl grid-cols-3 gap-3">
              {[["AI", "agents"], ["18+", "workflows"], ["0→1", "launch engine"]].map(([n, l]) => (
                <Glass key={l} className="rounded-2xl p-4">
                  <p className="text-3xl font-semibold tracking-[-0.06em]">{n}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">{l}</p>
                </Glass>
              ))}
            </div>
          </div>

          <FloatingInterface />
        </div>
      </section>

      <BentoSection />
      <CaseStudies />

      <section id="process" className="relative z-10 px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.6rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/40 backdrop-blur-2xl md:p-12">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.38em] text-cyan-300">Execution Protocol</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] md:text-7xl">From objective to operating system.</h2>
            </div>

            <div className="grid gap-4">
              {[
                ["Audit", "Detectamos fugas de percepción, conversión y operación."],
                ["Architect", "Diseñamos interfaz, sistema, automatización y oferta."],
                ["Deploy", "Lanzamos web, formularios, flujos y dashboards."],
                ["Optimize", "Medimos, iteramos y escalamos lo que genera dinero."],
              ].map(([title, desc], i) => (
                <div key={title} className="flex gap-5 rounded-3xl border border-white/10 bg-black/28 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-black">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Pricing />

      <section id="contact" className="relative z-10 px-6 py-28 lg:px-10">
        <Glow className="left-1/2 top-1/2 h-[520px] w-[760px] -translate-x-1/2 -translate-y-1/2 bg-cyan-500/16" />

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.8rem] border border-white/10 bg-white/[0.045] p-8 text-center shadow-2xl shadow-black/50 backdrop-blur-2xl md:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.16),transparent_36%)]" />

          <div className="relative">
            <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] text-cyan-300">
              <Zap className="h-8 w-8" />
            </div>

            <h2 className="text-5xl font-semibold tracking-[-0.075em] md:text-7xl">
              Start with the system. Scale into the company.
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
              First we build the premium web system. Then we connect automation. Then we turn the business into an AI-native operation.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a href="/#/dashboard" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-medium text-black transition hover:bg-cyan-200">
                Access AIS-01 Platform
                <ArrowRight className="h-4 w-4" />
              </a>

              <a href="#pricing" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-4 font-medium text-white transition hover:bg-white/[0.08]">
                <CalendarCheck className="h-4 w-4" />
                See packages
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-zinc-500 md:flex-row">
          <p>AIS-01 — Autonomous Intelligence System</p>
          <p>AI-native infrastructure for premium digital operations.</p>
        </div>
      </footer>
    </main>
  );
}
