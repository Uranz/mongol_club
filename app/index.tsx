import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        router.replace("/(tabs)/home"); // logged in → go to main app
      } else {
        router.replace("/(auth)/login"); // not logged in → go to login
      }
    });
  }, []);

  return null; // nothing renders — just redirect
}
