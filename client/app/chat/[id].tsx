import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { dummyConversationData, dummyMessages, dummyUserProfile, dummyUsers } from '@/assets/assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/assets/styles/ChatScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';


export default function ChatScreen() {

  const router = useRouter()
  let {auth, messages, users, selectedConversation, typingUsers}= {
    auth: {user: dummyUserProfile},
    messages:dummyMessages,
    users: dummyUsers,
    selectedConversation: dummyConversationData[0],
    typingUsers:{
      [dummyUsers[0]._id]: true,
    }
  }

  const [text, setText]=useState("")
  const [sending, setSending]=useState(false)
  const [loading, setLoading]=useState(false)
  const [mediaUri, setMediaUri]=useState<string | null>(null)

  if (!selectedConversation) {
    return (
      <SafeAreaView style={styles.safe} >
        <TouchableOpacity style={styles.backBtn} onPress={()=>router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.onSurface}/>
        </TouchableOpacity>
        <View style={styles.emptyState}>

        </View>

      </SafeAreaView>
    )
    
  }




  return (
    <View>
      <Text>chat id</Text>
    </View>
  )
}