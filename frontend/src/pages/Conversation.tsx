import axios from "axios";
import { createClient, User } from "@supabase/supabase-js";
import {
  BACKEND_URL,
  VITE_SUPABASE_PUBLISHABLE_KEY,
  VITE_SUPABASE_URL,
} from "@/config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  VITE_SUPABASE_URL,
  VITE_SUPABASE_PUBLISHABLE_KEY
);

export const Conversation = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function conversations() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          alert("Could not get session");
          return;
        }

        const session = data.session;

        if (!session) {
          return;
        }

        setUser(session.user);

        const token = session.access_token;

        const resp = await axios.get(
          `${BACKEND_URL}/Athena/conversations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("getting axios here--------------------------------------------------")
        console.log(resp.data);
      } catch (err) {
        console.log(err);
      }
    }

    conversations();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();

    setUser(null);

    navigate("/");
  };

  return (
    <div>
      {!user ? (
        <button onClick={() => navigate("/auth")}>
          Login
        </button>
      ) : (
        <div>
          {user.email}

          <button onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};