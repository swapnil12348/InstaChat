import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'expo-router';
import { dummyConversationData, dummyMessages, dummyUserProfile, dummyUsers } from '@/assets/assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/assets/styles/ChatScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { formatTime } from '@/utils/formatTime';
import Avatar from '@/components/Avatar';
import { ColorSpace } from 'react-native-reanimated';


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

  const flatListRef = useRef<FlatList>(null)

  const partner = selectedConversation?.participant

  //scroll to bottom when messages update
  useEffect(()=>{
    if (messages.length > 0) {
      setTimeout(()=>flatListRef.current?.scrollToEnd({animated: true}),100)
      
    }
  },[messages])

  const deleteChat = () =>{
    
  }

  if (!selectedConversation) {
    return (
      <SafeAreaView style={styles.safe} >
        <TouchableOpacity style={styles.backBtn} onPress={()=>router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.onSurface}/>
        </TouchableOpacity>
        <View style={styles.emptyState}>
          <Ionicons name="chatbubbles-outline" size={52} color={Colors.outlineVariant}/>
          <Text style={styles.emptyText}>Conversation not found</Text>

        </View>

      </SafeAreaView>
    )
  }

  const headerName = partner!.name;
  const headerAvatar = partner!.avatar;
  const headerSub = partner!.isOnline ? "Online" : partner?.lastSeen ? `Last seen ${formatTime(partner.lastSeen)}` : "Offline"




  return (
    <SafeAreaView style={styles.safe} edges={["top","bottom"]}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={()=> router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.onSurface}/>
        </TouchableOpacity>

        <Avatar name={headerName} src={headerAvatar} size={38} online={partner?.isOnline}/>

        <View style={styles.headerInfo}>
          <Text style={styles.headerName} numberOfLines={1}>
            {headerName}
            <Text style={styles.headerHandle}>@{partner?.handle}</Text>
          </Text>
          <Text style={[styles.headerSub, partner?.isOnline && {color: Colors.online}]}>{headerSub}</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.backBtn}>
            <Ionicons name="call-outline" size={20} color={Colors.onSurfaceVariant}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backBtn}>
            <Ionicons name="videocam-outline" size={20} color={Colors.onSurfaceVariant}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backBtn} onPress={deleteChat}>
            <Ionicons name="trash-outline" size={20} color={Colors.onSurfaceVariant}/>
          </TouchableOpacity>
        </View>
      </View>

      {/* main */}
      <KeyboardAvoidingView style={styles.kav} behavior={Platform.OS === 'ios' ? 'padding' : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>

        {/* messages */}
        {loading ? (
          <ActivityIndicator style={{flex:1}} color={Colors.primary}/>
        ):(
          <FlatList data={messages}
          keyExtractor={(m)=> m._id}
          contentContainerStyle={styles.messageList}
          renderItem={({item: msg, index})=>{
            const isMine = msg.sender === auth.user?._id;
            const prev = messages[index-1];
            const showGap = !prev || prev.sender !== msg.sender;
            return(
              <View style={showGap && index > 0 ? {marginTop: 10} : {}}>
                <Text>Message Bubble</Text>

              </View>
            )


          }}
          onContentSizeChange={()=> flatListRef.current?.scrollToEnd({animated: false})}/>
        )}

        {/* typing indicator */}

        {/* input bar */}

      </KeyboardAvoidingView>

          

    </SafeAreaView>
  )
}