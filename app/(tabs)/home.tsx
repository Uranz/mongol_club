import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function home() {
    const router = useRouter();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.replace("/(auth)/login"); // optional, but _layout also handles it
      };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>home. this means signing up or signing in works. HOME SCREEN</Text>
      <TouchableOpacity onPress={() => handleSignOut()}>
        <Ionicons name='log-out' size={30} color={"black"}/>
      </TouchableOpacity>
    </View>
  )
}