import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, BrainCircuit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/70 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            Athena
          </h1>

          <button
            onClick={() => navigate("/auth")}
            className="px-5 py-2 rounded-full bg-black text-white text-sm hover:scale-105 transition"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Background Glow */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-200 rounded-full blur-3xl opacity-30" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white shadow-sm text-sm"
          >
            <Sparkles size={16} />
            Next Generation AI Assistant
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="mt-8 text-6xl md:text-8xl font-semibold tracking-tight leading-[0.95]"
          >
            AI built for
            <br />
            clarity and speed.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-8 text-lg md:text-xl text-black/60 max-w-2xl mx-auto leading-relaxed"
          >
            Athena helps you search, think, create, and work faster —
            with a clean experience inspired by simplicity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <button
              onClick={() => navigate("/auth")}
              className="group px-7 py-4 rounded-full bg-black text-white flex items-center gap-2 text-lg hover:scale-105 transition"
            >
              Get Started
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </button>

            <button className="px-7 py-4 rounded-full border border-black/10 bg-white hover:bg-black/5 transition text-lg">
              Learn More
            </button>
          </motion.div>

          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="mt-24"
          >
            <div className="mx-auto max-w-5xl rounded-[40px] border border-black/10 bg-gradient-to-b from-white to-gray-100 shadow-2xl p-4">
              <div className="rounded-[32px] overflow-hidden bg-black">
                <img
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
                  alt="AI Dashboard"
                  className="w-full h-[600px] object-cover opacity-90"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-black/40">
              Why Athena
            </p>

            <h2 className="mt-4 text-5xl md:text-6xl font-semibold tracking-tight">
              Designed to feel effortless.
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-24">
  {[
    {
      icon: <BrainCircuit size={30} strokeWidth={1.5} />,
      title: "Smarter Responses",
      desc: "Experience AI that understands context, adapts instantly, and delivers fluid conversations.",
      gradient: "from-blue-500/20 via-cyan-400/10 to-transparent",
    },
    {
      icon: <ShieldCheck size={30} strokeWidth={1.5} />,
      title: "Private by Design",
      desc: "Built with secure authentication, protected sessions, and a privacy-first architecture.",
      gradient: "from-purple-500/20 via-pink-400/10 to-transparent",
    },
    {
      icon: <Sparkles size={30} strokeWidth={1.5} />,
      title: "Minimal Experience",
      desc: "A distraction-free interface crafted with precision, motion, and clean typography.",
      gradient: "from-orange-400/20 via-yellow-300/10 to-transparent",
    },
  ].map((feature, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{
        y: -12,
        scale: 1.02,
      }}
      className="group relative overflow-hidden rounded-[36px] border border-black/10 bg-white/70 backdrop-blur-xl p-8 md:p-10 shadow-[0_10px_60px_rgba(0,0,0,0.06)]"
    >
      {/* glow */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br ${feature.gradient}`}
      />

      {/* top blur orb */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-black/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />

      {/* content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="w-16 h-16 rounded-3xl bg-black text-white flex items-center justify-center shadow-lg group-hover:rotate-6 transition duration-500">
            {feature.icon}
          </div>

          <span className="text-sm text-black/30 font-medium">
            0{index + 1}
          </span>
        </div>

        <h3 className="mt-10 text-3xl font-semibold tracking-tight">
          {feature.title}
        </h3>

        <p className="mt-5 text-black/55 leading-relaxed text-[15px]">
          {feature.desc}
        </p>

        <div className="mt-10 flex items-center gap-2 text-sm font-medium text-black">
          Explore Feature
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition"
          />
        </div>
      </div>

      {/* border shine */}
      <div className="absolute inset-0 rounded-[36px] border border-white/40 pointer-events-none" />
    </motion.div>
  ))}
</div>
        </div>
      </section>

      {/* BIG TEXT SECTION */}
      <section className="py-40 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-semibold tracking-tight leading-none"
          >
            Think faster.
            <br />
            Build smarter.
          </motion.h2>

          <p className="mt-10 text-xl text-black/50 leading-relaxed">
            Crafted with precision and simplicity — inspired by the
            elegance of modern product design.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto rounded-[40px] bg-black text-white py-24 px-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight">
              Ready to start?
            </h2>

            <p className="mt-6 text-white/70 text-lg max-w-2xl mx-auto">
              Join Athena and experience a beautifully designed AI workflow.
            </p>

            <button
              onClick={() => navigate("/auth")}
              className="mt-10 px-8 py-4 rounded-full bg-white text-black text-lg hover:scale-105 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;