import { supabase } from '@/lib/supabase';
import { styles } from '@/styles/login.styles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Keyboard, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function signin() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
      
          if (error) {
            Alert.alert("Login failed", "missing email or password");
            return;
          }
      
          if (!data.user) {
            Alert.alert("Error", "No user returned");
            return;
          }
      
          console.log("Signed in user:", data.user);
          router.replace("/(tabs)/home");
        } catch (err) {
          Alert.alert("Unexpected error", (err as Error).message);
        }
      };

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
        <TouchableOpacity onPress={() => router.back()}>
         <Ionicons name='arrow-back' color={"black"} size={30}/>
       </TouchableOpacity>

       <TouchableOpacity onPress={() => router.push("/(auth)/forgotPasswordScreen")}>
        <Text>
          Forgot Password?
        </Text>
       </TouchableOpacity>

       <View>
         <TextInput value={email} placeholder='Email' placeholderTextColor={"black"} onChangeText={setEmail} secureTextEntry={false} autoCapitalize='none' style={styles.inputs}/>
         <TextInput value={password} placeholder='Password' placeholderTextColor={"black"} onChangeText={setPassword} secureTextEntry autoCapitalize='none' style={styles.inputs}/>
       </View>

       <View>
        <TouchableOpacity onPress={() => handleSignIn()}>
            <Ionicons name='arrow-forward' size={45} color={"black"}/>
        </TouchableOpacity>
       </View>
    </Pressable>
  )
}