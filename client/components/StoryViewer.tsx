import { View, Text, Animated, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { UserStory } from '@/types';
import { styles } from '@/assets/styles/StoryViewer.styles';
import Avatar from './Avatar';
import { Ionicons } from '@expo/vector-icons';

interface Props{
    userStory: UserStory;
    onClose: ()=> void;
}

export default function StoryViewer({userStory, onClose} : Props) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const progressAnim = useRef(new Animated.Value(0)).current;
    const animRef = useRef<Animated.CompositeAnimation>(null)
    
    const story = userStory.stories[currentIndex]
    const startProgress = ()=>{

    }

    useEffect(()=>{
      startProgress()
      return ()=> animRef.current?.stop()

    },[currentIndex])

    const goNext = ()=>{

    }

    const goPrev = ()=>{

    }




  return (

    <Modal visible animationType='fade' statusBarTranslucent>
      <View style={styles.container}>

        {/* progress bars */}
        <View style={styles.progressRow}>
          {userStory.stories.map((_, idx)=>(
            <View key={idx} style={styles.progressTrack}>
              <Animated.View
              style={[styles.progressFill,
                idx < currentIndex
                ? {width: "100%"}: idx === currentIndex
                ?
                {
                  width: progressAnim.interpolate({
                    inputRange: [0,1],
                    outputRange: ["0%", "100%"],
                  })
                }
                :
                {width: "0%"}
              ]}/>
            </View>
          ))}
        </View>

        {/* header */}
        <View style={styles.header}>
          <View style={styles.userRow}>
            <Avatar name={userStory.user.name} src={userStory.user.avatar} size={38}/>
            <View>
              <Text style={styles.userName}>{userStory.user.name}</Text>
              <Text style={styles.userHandle}>@{userStory.user.handle}</Text>
            </View>

          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name='close' size={26} color="rgba(255,255,255,0.85)" />
          </TouchableOpacity>

        </View>

        {/* media */}

        {/* tap zones */}

      </View>

    </Modal>
  )
}