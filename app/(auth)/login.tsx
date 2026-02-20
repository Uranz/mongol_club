import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function login() {
    const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ height: 400, flexDirection: "column", justifyContent: "space-between"}}>
        <TouchableOpacity style={{ width: 200, height: 50, backgroundColor: "gray" }} onPress={() => router.push("/(auth)/signin")}>
            <Text>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ width: 200, height: 50, backgroundColor: "black"}} onPress={() => router.push("/(auth)/signup")}>
            <Text style={{ color: "white" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}