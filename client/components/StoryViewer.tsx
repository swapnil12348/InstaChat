import { View, Text, Animated, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { UserStory } from '@/types';
import { styles } from '@/assets/styles/StoryViewer.styles';

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
            <view key={idx} style={styles.progressTrack}>

            </view>
          ))}

        </View>

        {/* header */}

        {/* media */}

        {/* tap zones */}

      </View>

    </Modal>
  )
}