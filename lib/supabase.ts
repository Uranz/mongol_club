import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const SUPABASE_URL = 'https://azgirnmmxxwwggynlppj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ZTygh5plTJ_ePl34HlhM3A_FglYqfP6';

const SecureStoreAdapter = {
    getItem: (key: string) => SecureStore.getItemAsync(key),
    setItem: (key: string, value: string) =>
      SecureStore.setItemAsync(key, value),
    removeItem: (key: string) => SecureStore.deleteItemAsync(key),
  }

export const supabase = createClient(
    SUPABASE_URL, 
    SUPABASE_ANON_KEY,
    {
        auth: {
            storage: SecureStoreAdapter,
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: false,
          },
    }
);
