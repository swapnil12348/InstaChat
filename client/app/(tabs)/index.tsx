import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Conversation, UserStory } from '@/types';
import { useRouter } from 'expo-router';
import { dummyConversationData } from '@/assets/assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/assets/styles/MessagesScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { TextInput } from 'react-native';
import StoriesBar from '@/components/StoriesBar';
import StoryViewer from '@/components/StoryViewer';
import ConvoItem from '@/components/ConvoItem';
import { api } from '@/context/AppContext';

export default function MessagesScreen() {

  const [conversations,setConversations]=useState<Conversation[]>([])
  const [search,setSearch]=useState("");
  const [loading,setLoading]=useState(false);
  const [selectedStory,setSelectedStory]=useState<UserStory | null>(null)

  const router = useRouter()

  const fetchConversations = () =>{
    setLoading(true)
    api.get<{success:boolean; conversations:Conversation[]}>("/api/messages/conversations").then(({data})=>{
      if (data.success) {
        setConversations(data.conversations);
      }else{
        throw new Error("Backend returned success: false"); 
      }
      setLoading(false)
    }).catch((error)=>{
      console.error("🔥 CRITICAL API ERROR:", error);
    
    // Pop up a massive alert on the screen so you know it broke
    Alert.alert("App Error", "Failed to load conversations: " + error.message);
      setTimeout(fetchConversations,1000)
    })
   
    }
  

  useEffect(()=>{
    fetchConversations()

  },[])

  const lowerSearch = search.toLowerCase()
  const filtered = search ? conversations.filter(
    (c)=> c.participant?.name.toLowerCase().includes(lowerSearch) || c.participant?.handle.toLowerCase().includes(lowerSearch)
  ) : conversations;

  const openConvo = (c: Conversation)=>{
    router.push(`/chat/${c._id}`)
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>

      {/* header */}
      <View style={styles.header}>
        <Text style={styles.title}>Conversations</Text>
        <View style={styles.headerRight}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{conversations.length}</Text>
          </View>
        </View>

      </View>
      
      {/* search */}
      <View style={styles.searchRow}>
        <Ionicons name='search' size={16} color={Colors.outlineVariant}/>
        <TextInput style={styles.searchInput} value={search} onChangeText={setSearch} placeholder='Search Conversations...' placeholderTextColor={Colors.outlineVariant}/>
        {search.length > 0 && (
          <TouchableOpacity onPress={()=>setSearch("")}>
            <Ionicons name='close-circle' size={16} color={Colors.outlineVariant}/>
          </TouchableOpacity>
        )}
      </View>

      {/* stories */}
      <StoriesBar onViewStory={(us)=>setSelectedStory(us)}/>
        {selectedStory && <StoryViewer userStory={selectedStory} onClose={()=>setSelectedStory(null)}/>}

      {/* divider */}
      <View style={styles.divider}/>

      {/* conversation list */}
      {loading ? (
        <ActivityIndicator style={{marginTop: 40}} color={Colors.primary}/>
      ):(
        <FlatList 
        data={filtered}
        keyExtractor={(c)=>c._id}
        contentContainerStyle={styles.listContent}
        renderItem={({item})=><ConvoItem convo={item} selected={false} onPress={()=>openConvo(item)}/>}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="chatbubbles-outline" size={44} color={Colors.outlineVariant}/>
            <Text style={styles.emptyTitle}>No conversations yet</Text>
            <Text style={styles.emptySubtitle}>Go to Search to start chatting</Text>

          </View>
        }/>
      )}
      


    </SafeAreaView>
  )
}