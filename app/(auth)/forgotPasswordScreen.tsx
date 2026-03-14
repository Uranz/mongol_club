import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Keyboard, Pressable, Text, TextInput, TouchableOpacity } from 'react-native';

export default function forgotPasswordScreen() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    const handleForgotPassword = async () => {
      const cleanEmail = email.trim().toLowerCase();
  
      if (!cleanEmail) {
        Alert.alert("Error", "Please enter your email.");
        return;
      }
  
      setLoading(true);
  
      // const redirectTo = Linking.createURL("/reset-password");
      // const redirectTo = "https://lqj-dfo-andrewotgonbaatar-8081.exp.direct/--/reset-password";
  
      // console.log(redirectTo);
  
      const { error } = await supabase.auth.resetPasswordForEmail(
        cleanEmail,
        {
          // 👇 THIS MUST MATCH your app scheme
          redirectTo: "appname://reset-password",
          // redirectTo: redirectTo
        }
      );
  
      setLoading(false);
  
      // Security best practice (don't reveal if email exists)
      Alert.alert(
        "Check your email",
        "If an account exists, you'll receive a reset link."
      );
  
      if (error) {
        console.warn("Reset error:", error.message);
      }
    };
  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1, backgroundColor: "gray", justifyContent: "center" }}>
        <Text>
            Forgot Password Screen
        </Text>

        <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='chevron-back-outline' size={30} color={"white"}/>
        </TouchableOpacity>

        <TextInput 
            placeholder="Email"
            placeholderTextColor={"black"}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            
            style={{
              borderRadius: 8,
              padding: 12,
              height: 70,
              backgroundColor: "white",
              fontSize: 30,
            }}
        />


            <TouchableOpacity onPress={() =>  handleForgotPassword} style={{ backgroundColor: "white", width: 100, height: 100, justifyContent: "center", alignItems: "center"}}>
                <Ionicons name='arrow-forward' size={40} color={"black"}/>
            </TouchableOpacity>
        
    </Pressable>
  )
}