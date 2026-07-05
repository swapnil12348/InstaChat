import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/assets/styles/AuthScreen.styles';
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors';
import { SvgXml } from 'react-native-svg';
import { TextInput } from 'react-native-gesture-handler';

type Mode = "login" | "register"

export default function AuthScreen() {
  const [mode, setMode] = useState<Mode>("register")
  const [name, setName] = useState("")
  const [handle, setHandle] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [loading, setLoading] = useState("")
  const [verifying, setVerifying] = useState("")

  const router = useRouter();
  const svgMarkup=`<svg width="54" height="70" viewBox="0 0 54 70" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M24.386 8.817c4.972-4.868 12.948-4.785 17.816.186 4.869 4.971 4.785 12.948-.186 17.816q-.506.494-.987.867L23.508 9.794q.372-.481.878-.977M11.97 42.611c-4.941 4.9-4.974 12.877-.075 17.817 4.9 4.94 12.877 4.974 17.817.074q.502-.5.88-.975L12.96 41.747a10 10 0 0 0-.99.864" fill="#fff"/>
  <rect y="22.652" width="21.312" height="55.056" rx="10.656" transform="rotate(-45 0 22.652)" fill="#fff"/>
</svg>
`



  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.kav} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">


          {/* logo */}
          <View style={styles.logoRow}>
            <LinearGradient colors={[Colors.primary, Colors.primaryContainer]} style={styles.logoBox}>
              <SvgXml xml={svgMarkup} width="50%" height="50%"/>


            </LinearGradient>
            <Text style={styles.appName}>
              InstaChat
            </Text>
          </View>
          {/* hero text */}
          <Text style={styles.heading}>
            {mode === "login"? "Welcome Back": "Create Account"}
          </Text>
          <Text style={styles.subheading}>
            {mode === "login" ? "Sign in to continue chatting" : "Fill in your details to get started"}
          </Text>

          {/* form */}
          <View style={styles.form}>
            {mode === "register" && (
              <>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Full Name</Text>
                <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder='Your Name'
                placeholderTextColor={Colors.outlineVariant}
                autoCapitalize='words'/>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Username Handle</Text>
                <View style={styles.handleRow}>
                  <Text style={styles.atSign}>@</Text>
                  <TextInput style={[styles.input, styles.handleInput]}
                  value={handle}
                  onChangeText={(v)=>setHandle(v.toLowerCase().replace(/\s/g, ""))}
                  placeholder='username'
                  placeholderTextColor={Colors.outlineVariant}
                  autoCapitalize="none"/>

                </View>

              </View>
              </>
            )}

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder='you@example.com'
              placeholderTextColor={Colors.outlineVariant}
              keyboardType="email-address"
              autoCapitalize='none'/>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Password</Text>
              <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder='*********'
              placeholderTextColor={Colors.outlineVariant}
              secureTextEntry/>

            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}