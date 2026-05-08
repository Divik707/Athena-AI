import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useEffect } from "react";
import { superbase } from "../utils/superbase";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  async function auth(provider: "google" | "github") {
    await superbase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/conversation`,
      },
    });
  }

  useEffect(() => {
    async function checkSession() {
      const { data } = await superbase.auth.getSession();

      if (data.session) {
        navigate("/conversation");
      }
    }

    checkSession();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex overflow-hidden relative">
      {/* background glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-500/10 blur-[160px] rounded-full" />

      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative border-r border-white/5">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-xl px-12 relative z-10"
        >
          {/* badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
            <Sparkles size={15} className="text-green-400" />

            <span className="text-sm text-white/60">
              AI-powered workspace
            </span>
          </div>

          {/* heading */}
          <h1 className="mt-8 text-7xl font-semibold tracking-tight leading-[0.95]">
            Welcome
            <br />
            back.
          </h1>

          {/* subtitle */}
          <p className="mt-8 text-xl text-white/45 leading-relaxed max-w-lg">
            Continue your conversations, generate ideas, write code,
            and work faster with Athena.
          </p>

          {/* mock ui */}
          <div className="mt-14 rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles size={18} />
                </div>

                <div className="bg-white/5 rounded-2xl px-5 py-4 max-w-sm">
                  <p className="text-sm text-white/75 leading-relaxed">
                    Athena can help optimize your backend architecture
                    and improve performance.
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-white text-black rounded-2xl px-5 py-4 max-w-xs">
                  <p className="text-sm leading-relaxed">
                    Show me how to scale my API efficiently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-[42%] flex items-center justify-center px-8 md:px-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full max-w-md"
        >
          {/* logo */}
          <div>
            <h2 className="text-4xl font-semibold tracking-tight">
              Athena
            </h2>

            <p className="mt-4 text-white/45 text-lg leading-relaxed">
              Sign in to access your AI workspace.
            </p>
          </div>

          {/* auth card */}
          <div className="mt-12 rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6">
            <div className="space-y-4">
              {/* google */}
              <button
                onClick={() => auth("google")}
                className="group w-full h-16 rounded-2xl border border-white/10 bg-white/5 px-6 flex items-center justify-between hover:bg-white hover:text-black transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[15px] font-medium">
                    Continue with Google
                  </span>
                </div>

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />
              </button>

              {/* github */}
              <button
                onClick={() => auth("github")}
                className="group w-full h-16 rounded-2xl border border-white/10 bg-white/5 px-6 flex items-center justify-between hover:bg-white hover:text-black transition-all duration-300"
              >
                <div className="flex items-center gap-4">

                  <span className="text-[15px] font-medium">
                    Continue with GitHub
                  </span>
                </div>

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />
              </button>
            </div>

            {/* divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-white/10" />

              <span className="text-sm text-white/30">
                secure authentication
              </span>

              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* footer */}
            <p className="text-sm text-white/35 leading-relaxed">
              Powered by Supabase authentication with encrypted secure
              sessions and OAuth login support.
            </p>
          </div>

          {/* bottom text */}
          <p className="mt-8 text-center text-sm text-white/25">
            By continuing, you agree to Athena’s terms and privacy
            policy.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;