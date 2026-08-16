import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/assets/styles/AuthScreen.styles';
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors';
import { SvgXml } from 'react-native-svg';
import { TextInput } from 'react-native-gesture-handler';
import {Ionicons} from "@expo/vector-icons"
import { useClerk, useSignIn, useSignUp } from '@clerk/expo';
import { SignIn } from '@clerk/expo/web';

type Mode = "login" | "register"

export default function AuthScreen() {
  const {signIn} = useSignIn()
  const {signUp} = useSignUp()
  const {setActive}= useClerk()
  const [mode, setMode] = useState<Mode>("login")
  const [name, setName] = useState("")
  const [handle, setHandle] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [verifyingMode,setVerifyingMode]=useState<"login"| "login_mfa" | "register">("register")

  const router = useRouter();

  const handleSubmit = async () => {
  
    if (!email.trim() || !password.trim()) return Alert.alert("Validation", "Please fill all fields")
    if(mode === "register" && (!name.trim() || !handle.trim())) return Alert.alert("Validation", "Please fill all fields")

      setLoading(true)
      try {
        if (mode === "login") {
          if (!signIn) {
            return
          }

          const result = await signIn.create({
            identifier: email,
            password,
          })

          if (result.error) {
            throw result.error
            
          }
          if (signIn.status === "complete") {
            await setActive({session:signIn.createdSessionId})
            router.replace("/(tabs)")
          }else if(signIn.status === "needs_first_factor" && signIn.emailCode){
            await signIn.emailCode.sendCode();
            setVerifyingMode("login")
            setVerifying(true)

          }else if(signIn.status === "needs_second_factor" && signIn.mfa){
            await signIn.mfa.sendEmailCode()
            setVerifyingMode("login_mfa");
            setVerifying(true)
          }
          
        }else{
          if (!signUp) {
            return
          }

          const spaceIdx = name.trim().indexOf("");
          const firstName = spaceIdx !== -1 ? name.trim().substring(0,spaceIdx): name.trim();
          const lastName =  spaceIdx !== -1 ? name.trim().substring(spaceIdx + 1): "";
          const result = await signUp.create({
            emailAddress: email,
            password,
            firstName,
            lastName,
            username: handle.toLowerCase().replace(/\s/g, ""),
          })
          if (result.error) {
            throw result.error
          }

          const sendResult = await signUp.verifications.sendEmailCode()
          if (sendResult.error) {
            throw sendResult.error
          }
          setVerifyingMode("register")
          setVerifying(true)
        }
      } catch (err:any) {
        Alert.alert("Authentication Error", err?.errors?.[0]?.message || err?.message || "Something went wrong")
      }finally{
        setLoading(false)
      }
    
  }

  const handleVerify = async () => {
    if (!verificationCode.trim()) return Alert.alert("Validation", "Please enter the verification code")
    
    setLoading(true)
    try {
      if (verifyingMode === "register") {
        if(!signUp) return;
        const result = await signUp.verifications.verifyEmailCode({
          code: verificationCode
        })

        if (result.error) {
          throw result.error
        }

        if (signUp.status === "complete") {
          await setActive({session: signUp.createdSessionId})
          router.replace("/(tabs)")
        }else{
          Alert.alert("Verification failed", "Please check the code and try again")
        }
        
      }else{
        if(!signIn) return;
        if (verifyingMode === "login_mfa") {
          await signIn.mfa.verifyEmailCode({
            code:verificationCode
          })
          }else{
            await signIn.emailCode.verifyCode({
              code:verificationCode
            })
          }
          if(signIn.status === "complete"){
            await setActive({session: signIn.createdSessionId})
            router.replace("/(tabs)")

          }else{
            Alert.alert("Verification Failed", "Please check the code and try again")
          }
        }
      }
     catch (err:any) {
      Alert.alert("Verification Error", err?.errors?.[0]?.message || err?.message || "Something went wrong")
      
    }finally{
      setLoading(false)
    }
  }


  const svgMarkup=`<svg width="54" height="70" viewBox="0 0 54 70" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M24.386 8.817c4.972-4.868 12.948-4.785 17.816.186 4.869 4.971 4.785 12.948-.186 17.816q-.506.494-.987.867L23.508 9.794q.372-.481.878-.977M11.97 42.611c-4.941 4.9-4.974 12.877-.075 17.817 4.9 4.94 12.877 4.974 17.817.074q.502-.5.88-.975L12.96 41.747a10 10 0 0 0-.99.864" fill="#fff"/>
  <rect y="22.652" width="21.312" height="55.056" rx="10.656" transform="rotate(-45 0 22.652)" fill="#fff"/>
</svg>
`
if(verifying){
  return(
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
            Verify Email
          </Text>
          <Text style={styles.subheading}>
            We have sent a 6-digit verification code to {email}
          </Text>

          {/* form */}
          <View style={styles.form}>
            

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Verification Code</Text>
              <TextInput
              style={styles.input}
              value={verificationCode}
              onChangeText={setVerificationCode}
              placeholder='Enter 6-digit code'
              placeholderTextColor={Colors.outlineVariant}
              keyboardType="number-pad"
              autoCapitalize='none'/>
            </View>
            
            {/* back to sign up link */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>
              </Text>
              <TouchableOpacity onPress={()=>setVerifying(false)}>
                <Text style={styles.toggleLink}>Go Back</Text>
              </TouchableOpacity>
              
              
            </View>


            {/* Submit */}
            <TouchableOpacity onPress={handleVerify} disabled={loading} activeOpacity={0.88} style={styles.btnWrapper}>
              <LinearGradient colors={[Colors.primary, Colors.primaryContainer]}
              start={{x:0, y:0}}
              end={{x:1, y:1}}
              style={styles.btn}>
                {loading ? (
                  <ActivityIndicator color={Colors.onPrimary} size={"small"}/>
                ):(
                  <>
                  <Text style={styles.btnText}>Verify Code</Text>
                  <Ionicons name='arrow-forward' size={18} color={Colors.onPrimary}/>
                  </>
                )}
              </LinearGradient>

            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>

  )
}


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

            {/* Toggle Mode */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>
                {mode === "login" ? "Don't have an account?" : "Already have an account"}
              </Text>
              <TouchableOpacity onPress={()=> setMode(mode === "login" ? "register" : "login")}>
                <Text style={styles.toggleLink}>{mode === 'login' ? "Sign Up" : "Sign In"}</Text>
              </TouchableOpacity>
            </View>

            {/* Submit */}
            <TouchableOpacity onPress={handleSubmit} disabled={loading} activeOpacity={0.88} style={styles.btnWrapper}>
              <LinearGradient colors={[Colors.primary, Colors.primaryContainer]}
              start={{x:0, y:0}}
              end={{x:1, y:1}}
              style={styles.btn}>
                {loading ? (
                  <ActivityIndicator color={Colors.onPrimary} size={"small"}/>
                ):(
                  <>
                  <Text style={styles.btnText}>{mode === 'login' ? "Sign In" : "Create Account"}</Text>
                  <Ionicons name='arrow-forward' size={18} color={Colors.onPrimary}/>
                  </>
                )}
              </LinearGradient>

            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}