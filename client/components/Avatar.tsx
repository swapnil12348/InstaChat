import { View, Text, Image } from 'react-native'
import React from 'react'
import { styles } from '@/assets/styles/Avatar.styles';


const PALETTE=["#4652b0", "#933880", "#3946a4", "#6750A4", "#7965AF"]

interface AvatarProps{
    name: string;
    size?: number;
    online?: boolean;
    src?: string;
}

export default function Avatar({name, size = 40, online, src}: AvatarProps) {

    const colors = PALETTE[name.charCodeAt(0) % PALETTE.length];
    const initials = name.split(" ").map((W)=>W[0]).join("").slice(0,2).toUpperCase();
    const indicatorSize = Math.round(size*0.28)
  return (
    <View style={[styles.root, {width: size, height: size}]}>
        <View>
            {src?
            (
                <Image source={{uri:src}} style={{width:size, height:size, borderRadius: size / 2}}/>
            )
            :
            (
                <Text style={[styles.initials, {}]}>{initials}</Text>

            )}
        </View>
    </View>
  )
}