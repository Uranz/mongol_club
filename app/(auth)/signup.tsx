import { supabase } from '@/lib/supabase'
import { styles } from '@/styles/login.styles'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Keyboard, Pressable, TextInput, TouchableOpacity, View } from 'react-native'

export default function signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const router = useRouter();

    const handleSignUp = async () => {
        try {
          // 1) Sign up + pass profile fields into user metadata
          //    Your DB trigger "on_auth_user_created" will auto-create the profiles row.
          const { data, error } = await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
              data: {
                username: username.trim(), // trigger can copy this into public.profiles.username
              },
            },
          });
      
          if (error) {
            Alert.alert("Signup failed", error.message);
            return;
          }
      
          if (!data.user) {
            Alert.alert("Signup failed", "No user returned from Supabase.");
            return;
          }
      
          // 2) If email confirmation is OFF, session should exist immediately.
          //    If it's ever turned ON later, session may be null here—so don't proceed into the app.
          if (!data.session) {
            Alert.alert(
              "Almost there",
              "Your account was created, but you need to confirm your email before logging in."
            );
            return;
          }
      
          // 3) No client-side profile insert (trigger already does it).
          //    Navigate into the app.
          router.replace("/(tabs)/home");
        } catch (err) {
          const message = err instanceof Error ? err.message : "Unknown error";
          Alert.alert("Unexpected error", message);
        }
      };
      
  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
        <View>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name='arrow-back' color={"black"} size={30}/>
            </TouchableOpacity>
        </View>

        <View style={styles.signupArea}>
            <TextInput placeholder='Email' secureTextEntry={false} autoCapitalize='none' style={styles.inputs} onChangeText={setEmail}/>
            <TextInput placeholder='Password' secureTextEntry autoCapitalize='none' style={styles.inputs} onChangeText={setPassword}/>
            <TextInput placeholder='Username' autoCapitalize='none' style={styles.inputs} onChangeText={setUsername}/>
        </View>
        
        <TouchableOpacity onPress={() => handleSignUp()}>
            <Ionicons name='arrow-forward' size={45} color={"black"}/>
        </TouchableOpacity>
    </Pressable>
  )
}