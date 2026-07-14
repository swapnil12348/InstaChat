import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Conversation } from '@/types';
import { styles } from '@/assets/styles/ConvoItem.styles';

interface ConvoItemProps{
    convo: Conversation,
    selected: boolean;
    onPress: () => void;
}

export default function ConvoItem({convo, selected, onPress} :  ConvoItemProps) {

    const name = convo.participant?.name || "User";
    const avatar = convo.participant?.avatar;
    const online = convo.participant?.isOnline;
    const sub = `@${convo.participant?.handle}`;
    const lastMsg = convo.lastMessage?.text || (convo.lastMessage?.mediaType === "image" ? "Photo" : convo.lastMessage?.mediaUrl ? "Video" : "Start a Conversation")




  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles]}>

    </TouchableOpacity>
  )
}