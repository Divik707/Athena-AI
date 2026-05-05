import { createClient, User } from '@supabase/supabase-js'
import { VITE_SUPABASE_PUBLISHABLE_KEY, VITE_SUPABASE_URL } from '@/config';
import { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';

const superbase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY)

export const Conversation = () => {
  const naviagte = useNavigate();
  const [user, setUser] = useState<User | null>();
  useEffect(() => {
    async function conversations() {
      const { data, error } = await superbase.auth.getUser();
      if(data.user) {
        setUser(data.user);
      }
      if(error) {
        alert("SORRY! Athena could not get you old conversations")
      }
    }
    conversations();
  }, [])
  return (
    <div>
      {!user?.email ? <button onClick={() => naviagte('/auth')}>
        sign up
      </button> : user?.email}
    </div>
  )
}
