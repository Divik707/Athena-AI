import { createClient } from '@supabase/supabase-js'
import { VITE_SUPABASE_PUBLISHABLE_KEY, VITE_SUPABASE_URL } from '@/config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const superbase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY)

const Auth = () => {

    const navigate = useNavigate();
    async function login(provider: "google" | "github") {
        const { data, error } = await superbase.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo: "http://localhost:3000/conversation"
        }
    })
    if(error) {
        alert("error while login")
    } else {
        alert("user login")
    }
    }

    useEffect(() => {
        async function handleSession() {
            const {data} = await superbase.auth.getSession();
            if(data.session) {
                navigate('/conversation')
            } 
        }
        handleSession();
        const {data: listener} = superbase.auth.onAuthStateChange(
                (event, session) => {
                    if(event === 'SIGNED_IN') 
                        navigate('/conversation');
                }
            )
        return () => {
            listener.subscription.unsubscribe
        }
    }, [])
  return (
    <div>
        <button onClick={() => login("google")}>
            Login with Google
        </button>
        <button onClick={() => login("github")}>
            Login with Github
        </button>
    </div>
  )
}

export default Auth