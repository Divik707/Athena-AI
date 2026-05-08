import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Menu,
  Plus,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { superbase } from "../utils/superbase";

type Message = {
  role: "user" | "assistant";
  content: string;
  answer?: string;
  followUps?: string[];
};

const API_URL = import.meta.env.VITE_API_URL;

const Conversation = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);

  /*
    ==========================================
    AUTH CHECK
    ==========================================
  */

  useEffect(() => {
    async function checkUser() {
      const {
        data: { session },
      } = await superbase.auth.getSession();

      if (!session) {
        navigate("/auth");
        return;
      }

      setCheckingAuth(false);
    }

    checkUser();

    const {
      data: { subscription },
    } = superbase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          navigate("/auth");
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  /*
    ==========================================
    AUTO SCROLL
    ==========================================
  */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  /*
    ==========================================
    RESPONSE PARSER
    ==========================================
  */

  function parseAthenaResponse(xmlString: string) {
    try {
      const answerMatch = xmlString.match(
        /<ANSWER>([\s\S]*?)<\/ANSWER>/i
      );

      const answer = answerMatch
        ? answerMatch[1].trim()
        : xmlString;

      const followUpsMatch = xmlString.match(
        /<FOLLOW_UPS>([\s\S]*?)<\/FOLLOW_UPS>/i
      );

      let followUps: string[] = [];

      if (followUpsMatch) {
        const questions = followUpsMatch[1].match(
          /<QUESTION>([\s\S]*?)<\/QUESTION>/gi
        );

        if (questions) {
          followUps = questions.map((q) =>
            q.replace(/<\/?QUESTION>/gi, "").trim()
          );
        }
      }

      return {
        answer,
        followUps,
      };
    } catch {
      return {
        answer: xmlString,
        followUps: [],
      };
    }
  }

  /*
    ==========================================
    ASK ATHENA
    ==========================================
  */

  async function askAthena(query: string) {
    if (!query.trim() || loading) return;

    const cleanQuery = query.trim();

    setLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: cleanQuery,
      },
    ]);

    try {
      const {
        data: { session },
      } = await superbase.auth.getSession();

      const token = session?.access_token;

      if (!token) {
        navigate("/auth");
        return;
      }

      const res = await fetch(
        `${API_URL}/ask-Athena`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: cleanQuery,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();

      const raw = data.data || "";

      const { answer, followUps } =
        parseAthenaResponse(raw);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: raw,
          answer,
          followUps,
        },
      ]);
    } catch (err) {
      console.error("Athena Error:", err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong. Please try again.",
          answer:
            "Something went wrong. Please try again.",
          followUps: [],
        },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  }

  /*
    ==========================================
    LOGOUT
    ==========================================
  */

  async function handleLogout() {
    await superbase.auth.signOut();
    navigate("/auth");
  }

  /*
    ==========================================
    LOADING SCREEN
    ==========================================
  */

  if (checkingAuth) {
    return (
      <div className="h-screen bg-[#0D0D0D] flex items-center justify-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-10 h-10 border-2 border-white/10 border-t-white rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0D0D0D] text-white flex overflow-hidden">
      {/* SIDEBAR */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{
              x: -280,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: -280,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              w-[280px]
              bg-black/40
              backdrop-blur-2xl
              border-r
              border-white/5
              flex
              flex-col
            "
          >
            {/* LOGO */}
            <div className="p-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white text-black flex items-center justify-center">
                  <Sparkles size={18} />
                </div>

                <div>
                  <h1 className="font-semibold text-lg">
                    Athena
                  </h1>

                  <p className="text-sm text-white/35">
                    AI Workspace
                  </p>
                </div>
              </div>

              {/* NEW CHAT */}
              <button
                onClick={() => setMessages([])}
                className="
                  mt-6
                  w-full
                  h-12
                  rounded-2xl
                  bg-white
                  text-black
                  flex
                  items-center
                  justify-center
                  gap-2
                  font-medium
                  hover:scale-[1.02]
                  transition
                "
              >
                <Plus size={18} />
                New Chat
              </button>
            </div>

            {/* SIDEBAR CONTENT */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <p className="text-sm text-white/40 leading-relaxed">
                  Your conversations will appear here.
                </p>
              </div>
            </div>

            {/* LOGOUT */}
            <div className="p-4 border-t border-white/5">
              <button
                onClick={handleLogout}
                className="
                  w-full
                  h-12
                  rounded-2xl
                  border
                  border-red-500/10
                  bg-red-500/10
                  text-red-400
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:bg-red-500/20
                  transition
                "
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <div className="h-16 border-b border-white/5 bg-black/30 backdrop-blur-2xl px-5 flex items-center justify-between">
          <button
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
            className="w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center transition"
          >
            <Menu size={19} />
          </button>

          <h1 className="font-medium text-white/80">
            Athena
          </h1>

          <div className="text-sm text-white/30">
            Workspace
          </div>
        </div>

        {/* CHAT */}
        <div className="flex-1 overflow-y-auto px-6 py-10">
          <div className="max-w-4xl mx-auto">
            {/* EMPTY */}
            {messages.length === 0 && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                className="h-[75vh] flex flex-col items-center justify-center text-center"
              >
                <h1 className="text-6xl md:text-7xl font-semibold tracking-tight">
                  How can I help you?
                </h1>

                <p className="mt-6 text-white/40 max-w-xl text-lg leading-relaxed">
                  Ask questions, generate code,
                  brainstorm ideas, and work faster
                  with Athena AI.
                </p>
              </motion.div>
            )}

            {/* MESSAGES */}
            <div className="space-y-8">
              <AnimatePresence>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className={`flex ${
                      m.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[28px] px-6 py-5 text-[15px] leading-8
                      ${
                        m.role === "user"
                          ? `
                            bg-white
                            text-black
                          `
                          : `
                            bg-white/[0.04]
                            border
                            border-white/5
                            backdrop-blur-xl
                            text-white
                          `
                      }`}
                    >
                      <p className="whitespace-pre-wrap">
                        {m.role === "assistant"
                          ? m.answer
                          : m.content}
                      </p>

                      {/* FOLLOW UPS */}
                      {m.followUps?.length ? (
                        <div className="flex flex-wrap gap-2 mt-5">
                          {m.followUps?.map(
                            (f, idx) => (
                              <button
                                key={idx}
                                onClick={() =>
                                  askAthena(f)
                                }
                                className="
                                  px-4
                                  py-2
                                  rounded-full
                                  bg-white/5
                                  hover:bg-white
                                  hover:text-black
                                  text-sm
                                  transition
                                "
                              >
                                {f}
                              </button>
                            )
                          )}
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* LOADING */}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.04] border border-white/5 rounded-full px-5 py-4 flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.12,
                        }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* INPUT */}
        <div className="p-6 border-t border-white/5 bg-black/20 backdrop-blur-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              askAthena(input);
            }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 rounded-[28px] border border-white/10 bg-white/[0.03] px-4 py-3">
              <input
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                placeholder="Message Athena..."
                className="
                  flex-1
                  bg-transparent
                  outline-none
                  text-[15px]
                  text-white
                  placeholder:text-white/30
                "
              />

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{
                  scale: loading ? 1 : 1.05,
                }}
                whileTap={{
                  scale: loading ? 1 : 0.95,
                }}
                className="
                  w-11
                  h-11
                  rounded-2xl
                  bg-white
                  text-black
                  flex
                  items-center
                  justify-center
                  disabled:opacity-50
                "
              >
                <ArrowUp size={18} />
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Conversation;