import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/assets/styles/StoriesBar.styles';
import { UserStory } from '@/types';
import { dummyStoriesData } from '@/assets/assets';

interface StoriesBarProps{
    onViewStory: (us:UserStory)=> void
}



export default function StoriesBar({onViewStory}: StoriesBarProps) {

    const [uploading, setUploading]= useState(false)
    const {userStories} = {userStories: dummyStoriesData}
    
  return (
    <FlatList horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container} data={[]}>

    </FlatList>
  )
}