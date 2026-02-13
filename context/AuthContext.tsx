import { supabase } from "@/lib/supabase";
import type { Session } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    session: any,
    loading: boolean,
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children}:{ children: React.ReactNode }) => {
    const [ session, setSession ] = useState<Session | null>(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setLoading(false);
        });

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
              setSession(session)
            }
        )

        return () => {
            listener.subscription.unsubscribe()
          }
    }, [])

    return (
        <AuthContext.Provider value={{ session, loading }}>
          {children}
        </AuthContext.Provider>
      )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
  }