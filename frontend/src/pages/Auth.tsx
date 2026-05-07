import { motion } from "framer-motion";
import { ArrowRight} from "lucide-react";
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
    <div className="min-h-screen bg-white text-black flex overflow-hidden">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-[45%] flex items-center justify-center px-8 md:px-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div>
            <h1 className="text-5xl font-semibold tracking-tight">
              Athena
            </h1>

            <p className="mt-4 text-black/50 text-lg leading-relaxed">
              Sign in to continue your AI workspace.
            </p>
          </div>

          {/* Auth Buttons */}
          <div className="mt-14 space-y-4">
            <button
              onClick={() => auth("google")}
              className="group w-full h-16 rounded-2xl border border-black/10 px-6 flex items-center justify-between hover:bg-black hover:text-white transition-all duration-300"
            >

                <span className="text-[16px] font-medium">
                  Continue with Google
                </span>

              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </button>

            <button
              onClick={() => auth("github")}
              className="group w-full h-16 rounded-2xl border border-black/10 px-6 flex items-center justify-between hover:bg-black hover:text-white transition-all duration-300"
            >

                <span className="text-[16px] font-medium">
                  Continue with GitHub
                </span>
              

              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </button>
          </div>

          {/* Footer */}
          <p className="mt-10 text-sm text-black/35 leading-relaxed">
            Secure authentication powered by Supabase.
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex flex-1 relative bg-[#f5f5f7] items-center justify-center overflow-hidden">
        {/* glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-200 rounded-full blur-3xl opacity-40" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 max-w-xl px-12"
        >
          <h2 className="text-6xl font-semibold tracking-tight leading-[1.05]">
            Think.
            <br />
            Create.
            <br />
            Faster.
          </h2>

          <p className="mt-8 text-black/50 text-xl leading-relaxed">
            A beautifully minimal AI experience inspired by simplicity,
            speed, and clarity.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;