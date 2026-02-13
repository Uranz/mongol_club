// app/_layout.tsx

import { AuthProvider } from "@/context/AuthContext";

import { User } from "@supabase/supabase-js";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";

export default function Layout() {
  const [user, setUser] = useState<User | null>(null);

  const [fontsLoaded] = useFonts({
    "GoogleSans-Regular": require("../assets/fonts/GoogleSans-Regular.ttf"),
    "GoogleSans-Bold": require("../assets/fonts/GoogleSans-Bold.ttf"),
    "GoogleSans-SemiBold": require("../assets/fonts/GoogleSans-SemiBold.ttf"),
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) onLayoutRootView();
  }, [fontsLoaded, onLayoutRootView]);

  if (!fontsLoaded) return null;



  return (
    <AuthProvider>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <Stack screenOptions={{ headerShown: false, animation: "none" }}>
          {user ? <Stack.Screen name="(tabs)" /> : <Stack.Screen name="(auth)/login" />}
        </Stack>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

