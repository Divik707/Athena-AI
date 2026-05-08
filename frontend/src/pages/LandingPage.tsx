import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  BrainCircuit,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white overflow-hidden">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">
            Athena
          </h1>

          <button
            onClick={() => navigate("/auth")}
            className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:scale-105 transition"
          >
            Log in
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-green-500/10 blur-[180px] rounded-full" />
          <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
          >
            <Sparkles size={15} className="text-green-400" />

            <span className="text-sm text-white/70">
              GPT-powered productivity assistant
            </span>
          </motion.div>

          {/* heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 1 }}
            className="mt-10 text-6xl md:text-8xl font-semibold tracking-tight leading-[0.92]"
          >
            The AI workspace
            <br />
            that feels natural.
          </motion.h1>

          {/* subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1 }}
            className="mt-8 text-lg md:text-xl text-white/55 leading-relaxed max-w-2xl mx-auto"
          >
            Ask questions, generate ideas, write code, and organize
            your workflow — all in one elegant AI experience.
          </motion.p>

          {/* buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-10 flex items-center justify-center gap-4 flex-wrap"
          >
            <button
              onClick={() => navigate("/auth")}
              className="group px-7 py-4 rounded-full bg-white text-black flex items-center gap-2 text-lg font-medium hover:scale-105 transition"
            >
              Start chatting

              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </button>

            <button className="px-7 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition text-lg text-white/80">
              Watch demo
            </button>
          </motion.div>

          {/* CHATGPT STYLE MOCKUP */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1.2 }}
            className="mt-24"
          >
            <div className="mx-auto max-w-5xl rounded-[34px] border border-white/10 bg-[#111111] shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* topbar */}
              <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                <div className="text-sm text-white/40">
                  Athena Workspace
                </div>

                <div />
              </div>

              {/* chat area */}
              <div className="p-8 md:p-10 space-y-8 text-left">
                {/* assistant */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-green-500 flex items-center justify-center flex-shrink-0">
                    <BrainCircuit size={18} />
                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-3xl px-6 py-5 max-w-2xl">
                    <p className="text-white/85 leading-relaxed">
                      I analyzed your project architecture and found
                      opportunities to improve performance by 37%.
                    </p>
                  </div>
                </div>

                {/* user */}
                <div className="flex gap-4 justify-end">
                  <div className="bg-white text-black rounded-3xl px-6 py-5 max-w-xl">
                    <p className="leading-relaxed">
                      Can you optimize the backend and explain the
                      bottlenecks?
                    </p>
                  </div>
                </div>

                {/* assistant */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-green-500 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={18} />
                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-3xl px-6 py-5 max-w-3xl">
                    <p className="text-white/85 leading-relaxed">
                      Absolutely. I identified inefficient Prisma
                      queries, missing indexes, and unnecessary React
                      re-renders. Here’s a cleaner production-ready
                      structure...
                    </p>
                  </div>
                </div>

                {/* input */}
                <div className="pt-6">
                  <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-black px-5 py-4">
                    <input
                      placeholder="Message Athena..."
                      className="bg-transparent outline-none flex-1 text-white placeholder:text-white/30"
                    />

                    <button className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-white/30">
              Features
            </p>

            <h2 className="mt-5 text-5xl md:text-6xl font-semibold tracking-tight">
              Built for modern AI workflows.
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-24">
            {[
              {
                icon: <BrainCircuit size={28} strokeWidth={1.5} />,
                title: "Context Aware",
                desc: "Athena understands conversations deeply and responds with precision.",
              },
              {
                icon: <ShieldCheck size={28} strokeWidth={1.5} />,
                title: "Secure Sessions",
                desc: "Authentication and data handling designed with privacy first.",
              },
              {
                icon: <Sparkles size={28} strokeWidth={1.5} />,
                title: "Minimal Interface",
                desc: "Clean typography, subtle motion, and zero distractions.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                }}
                className="rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center">
                  {feature.icon}
                </div>

                <h3 className="mt-8 text-2xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 text-white/50 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1]">
            Start building
            <br />
            with Athena today.
          </h2>

          <p className="mt-8 text-white/50 text-lg max-w-2xl mx-auto">
            A modern conversational AI experience inspired by clarity,
            speed, and focus.
          </p>

          <button
            onClick={() => navigate("/auth")}
            className="mt-10 px-8 py-4 rounded-full bg-white text-black text-lg font-medium hover:scale-105 transition"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;