import { View, Text } from 'react-native'
import React from 'react'
import { Conversation } from '@/types';

interface ConvoItemProps{
    convo: Conversation,
    selected: boolean;
    onPress: () => void;
}

export default function ConvoItem({convo, selected, onPress} :  ConvoItemProps) {

    const name = convo.participant?.name || "User";
    const avatar = convo.participant?.avatar;
    const online = convo.participant?.isOnline;
    const sub = `@${convo.participant?.handle}`



  return (
    <View>
      <Text>ConvoItem</Text>
    </View>
  )
}