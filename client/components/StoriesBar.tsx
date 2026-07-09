import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/assets/styles/StoriesBar.styles';
import { UserStory } from '@/types';
import { dummyStoriesData } from '@/assets/assets';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker'

interface StoriesBarProps{
    onViewStory: (us:UserStory)=> void
}



export default function StoriesBar({onViewStory}: StoriesBarProps) {

    const [uploading, setUploading]= useState(false)
    const {userStories} = {userStories: dummyStoriesData}

    const pickAndUpload = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission needed", "Allow access to your photos to post a story.")
            return;
            
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:["images"]
        })
        
    }

  return (
    <FlatList 
    horizontal 
    showsHorizontalScrollIndicator={false} 
    contentContainerStyle={styles.container} 
    data={[{_addStory: true}, ...userStories] as any[]}
    keyExtractor={(item, i)=>(item._addStory ? "add" : item.user._id || String(i))}
    renderItem={({item})=>{
        if (item._addStory) {
            return(
                <TouchableOpacity style={styles.storyItem} onPress={pickAndUpload} disabled={uploading}>
                    <View style={styles.addCircle}>
                        <Ionicons name={uploading ? "hourglass" : "add"} size={24} color={Colors.onSurfaceVariant}/>
                    </View>
                    <Text style={styles.label}>Your Story</Text>

                </TouchableOpacity>
            )
            
        }
    }}>

    </FlatList>
  )
}