import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { superbase } from "../utils/superbase";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Plus,
  LogOut,
  Sparkles,
  ArrowUp,
  MessageSquare,
} from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
  answer?: string;
  followUps?: string[];
};

type ConversationType = {
  id: string;
  title: string;
  messages?: any[];
  createdAt?: string;
};

const Conversation = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<
    ConversationType[]
  >([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const loadConversations = async () => {
    try {
      const {
        data: { session },
      } = await superbase.auth.getSession();

      const token = session?.access_token;

      const res = await fetch(
        "http://localhost:3001/Athena/conversations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setConversations(data.conversations || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

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

      return { answer, followUps };
    } catch {
      return {
        answer: xmlString,
        followUps: [],
      };
    }
  }

  async function askAthena(query: string) {
    if (!query.trim()) return;

    setLoading(true);

    const userMessage: Message = {
      role: "user",
      content: query,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const {
        data: { session },
      } = await superbase.auth.getSession();

      const token = session?.access_token;

      const res = await fetch(
        "http://localhost:3001/ask-Athena",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query }),
        }
      );

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
    } finally {
      setLoading(false);
      setInput("");
    }
  }

  const handleLogout = async () => {
    await superbase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="h-screen bg-[#f7f7f8] text-black flex overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-200/50 rounded-full blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.1, 0.95, 1.1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-200/50 rounded-full blur-[140px]"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_50%)]" />
      </div>

      {/* FLOATING PARTICLES */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
          }}
          className="absolute w-1 h-1 bg-black/10 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* SIDEBAR */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{
              x: -320,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: -320,
              opacity: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
              w-[300px]
              bg-white/70
              backdrop-blur-3xl
              border-r
              border-black/5
              flex
              flex-col
              z-20
              shadow-[0_10px_50px_rgba(0,0,0,0.05)]
            "
          >
            {/* Logo */}
            <div className="px-6 py-6 border-b border-black/5">

              <div className="flex items-center gap-3">

                <div
                  className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-gradient-to-br
                  from-blue-500
                  to-purple-500
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-lg
                "
                >
                  <Sparkles size={18} />
                </div>

                <div>
                  <h1
                    className="
                    text-xl
                    font-semibold
                    tracking-tight
                    bg-gradient-to-r
                    from-black
                    to-gray-500
                    text-transparent
                    bg-clip-text
                  "
                  >
                    Athena
                  </h1>

                  <p className="text-sm text-black/40">
                    At your service
                  </p>
                </div>
              </div>

              <button
                onClick={() => setMessages([])}
                className="
                  mt-6
                  w-full
                  h-12
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-500
                  to-purple-500
                  text-white
                  font-medium
                  flex
                  items-center
                  justify-center
                  gap-2
                  shadow-lg
                  hover:scale-[1.02]
                  transition-all
                  duration-300
                "
              >
                <Plus size={18} />
                New Chat
              </button>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
              {conversations.map((c) => (
                <motion.div
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  key={c.id}
                  className="
                    group
                    p-4
                    rounded-3xl
                    bg-white/60
                    hover:bg-white
                    border
                    border-black/5
                    transition-all
                    duration-300
                    cursor-pointer
                    hover:shadow-lg
                  "
                >
                  <div className="flex items-start gap-3">

                    <div className="mt-1 text-blue-500">
                      <MessageSquare size={16} />
                    </div>

                    <div>
                      <h2 className="font-medium text-sm text-black line-clamp-1">
                        {c.title}
                      </h2>

                      <p className="text-xs text-black/40 mt-1">
                        Conversation
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Logout */}
            <div className="p-4 border-t border-black/5">
              <button
                onClick={handleLogout}
                className="
                  w-full
                  h-12
                  rounded-2xl
                  bg-red-50
                  text-red-500
                  border
                  border-red-100
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:bg-red-100
                  transition-all
                "
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN */}
      <div className="flex-1 flex flex-col relative z-10">

        {/* TOPBAR */}
        <div
          className="
            h-16
            px-6
            bg-white/60
            backdrop-blur-3xl
            border-b
            border-black/5
            flex
            items-center
            justify-between
          "
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-11 h-11 rounded-xl hover:bg-black/5 flex items-center justify-center transition"
          >
            <Menu size={20} />
          </button>

          <motion.div
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <h1
              className="
                text-lg
                font-semibold
                bg-gradient-to-r
                from-black
                via-gray-700
                to-gray-400
                text-transparent
                bg-clip-text
              "
            >
              Athena AI
            </h1>
          </motion.div>

          <div className="text-xs text-black/40 font-medium">
            Minimal Intelligence
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
                className="h-[70vh] flex flex-col items-center justify-center text-center"
              >
                <motion.h1
                  initial={{
                    y: 20,
                  }}
                  animate={{
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="
                    text-7xl
                    md:text-8xl
                    font-semibold
                    tracking-[-0.06em]
                    leading-none
                    bg-gradient-to-b
                    from-black
                    to-gray-400
                    text-transparent
                    bg-clip-text
                  "
                >
                  Ask anything.
                </motion.h1>

                <p className="mt-6 text-lg text-black/45 max-w-xl leading-relaxed">
                  Beautiful AI conversations with Apple inspired
                  design and fluid interactions.
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
                      y: 40,
                      scale: 0.96,
                      filter: "blur(10px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className={`flex ${
                      m.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-[30px] px-6 py-5 border text-[15px] leading-8 tracking-[0.01em]
                      ${
                        m.role === "user"
                          ? `
                            bg-gradient-to-r
                            from-blue-500
                            to-purple-500
                            text-white
                            border-transparent
                            shadow-lg
                          `
                          : `
                            bg-white/70
                            backdrop-blur-3xl
                            border-black/5
                            text-black
                            shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                          `
                      }`}
                    >
                      <p className="whitespace-pre-wrap font-medium">
                        {m.role === "assistant"
                          ? m.answer
                          : m.content}
                      </p>

                      {/* FOLLOWUPS */}
                      {m.followUps?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-5">
                          {m.followUps.map((f, idx) => (
                            <motion.button
                              whileHover={{
                                scale: 1.04,
                              }}
                              whileTap={{
                                scale: 0.96,
                              }}
                              key={idx}
                              onClick={() => askAthena(f)}
                              className="
                                px-4
                                py-2
                                rounded-full
                                bg-black/5
                                hover:bg-gradient-to-r
                                hover:from-blue-500
                                hover:to-purple-500
                                hover:text-white
                                text-black
                                text-sm
                                transition-all
                                duration-300
                              "
                            >
                              {f}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* LOADING */}
              {loading && (
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  className="flex justify-start"
                >
                  <div className="bg-white/80 border border-black/5 rounded-full px-6 py-4 flex gap-2 backdrop-blur-2xl shadow-lg">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* INPUT */}
        <div className="p-6 border-t border-black/5 bg-white/60 backdrop-blur-3xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              askAthena(input);
            }}
            className="max-w-4xl mx-auto"
          >
            <div
              className="
                relative
                flex
                items-center
                bg-white/80
                border
                border-black/5
                rounded-[30px]
                backdrop-blur-3xl
                shadow-[0_10px_40px_rgba(0,0,0,0.05)]
                px-3
                py-3
                transition-all
                duration-500
                focus-within:border-blue-300
                focus-within:shadow-[0_10px_50px_rgba(59,130,246,0.15)]
              "
            >
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
                  px-4
                  text-[15px]
                  font-medium
                  text-black
                  placeholder:text-black/35
                "
              />

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-500
                  to-purple-500
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  transition-all
                  duration-300
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