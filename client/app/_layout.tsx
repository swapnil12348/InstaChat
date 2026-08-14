import { AppProvider } from "@/context/AppContext";
import { Redirect, SplashScreen, Stack, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}




function AuthGaurd(){
  const {isSignedIn, isLoaded} = useAuth()
  const segments= useSegments();

  SplashScreen.hideAsync();
  const inAuth = segments[0] === "(auth)"
  

  if (!isSignedIn && !inAuth) {
    return <Redirect href="/(auth)"/>
    
  }else if(isSignedIn){
    return <Redirect href="/(tabs)"/>
  }

}

export default function RootLayout() {
  
  return<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
    <ClerkLoaded>

    
    <GestureHandlerRootView style={{flex: 1}}>
    <AppProvider>
      <AuthGaurd/>

      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(auth)"/>
        <Stack.Screen name="(tabs)"/>
        <Stack.Screen name="chat/[id]" options={{animation: "slide_from_right"}}/>
        
      </Stack>
      <StatusBar style="dark"/>

    </AppProvider>

    

  </GestureHandlerRootView>
  </ClerkLoaded>
  



  </ClerkProvider>
  
  
}
