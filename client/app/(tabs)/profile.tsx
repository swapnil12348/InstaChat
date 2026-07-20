import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { dummyUserProfile } from '@/assets/assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/assets/styles/ProfileScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Avatar from '@/components/Avatar';

export default function profile() {

  const {auth} = {auth: {user : dummyUserProfile}}
  const user = auth.user;
  const [editMode, setEditMode] = useState(false)
  const [profileName, setProfileName]= useState(auth.user?.name || "")
  const [profileHandle,setProfileHandle]=useState(auth.user?.handle || "")
  const [profileBio, setProfileBio]=useState(auth.user?.bio || "")
  const [avatarUri, setAvatarUri] = useState<string | null>(null)
  const [loading, setLoading]=useState(false)

  const displayAvatar = avatarUri || user?.avatar



  return (

    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          {!editMode && (
            <TouchableOpacity style={styles.editBtn} onPress={()=>setEditMode(true)}>
              <Ionicons name="pencil" size={16} color={Colors.primary}/>
              <Text style={styles.editBtnText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Avatar */}
        <View>
          <TouchableOpacity>
            <View>
              <Avatar name={user?.name || "?"} src={displayAvatar} size={100}/>
            </View>
          </TouchableOpacity>
        </View>

        {/* Edit form */}

        {/* profile options */}

        {/* sign out */}

      </ScrollView>

    </SafeAreaView>
  )
}