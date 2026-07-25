import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { dummyUserProfile } from '@/assets/assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/assets/styles/ProfileScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Avatar from '@/components/Avatar';
import { TextInput } from 'react-native-gesture-handler';

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

  const pickAvatar = async ()=>{

  }



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
        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={editMode ? pickAvatar : undefined } activeOpacity={editMode ? 0.7 : 1}>
            <View style={styles.avatarWrapper}>
              <Avatar name={user?.name || "?"} src={displayAvatar} size={100}/>
              {editMode && (
                <View style={styles.cameraOverlay}>
                  <Ionicons name="pencil" size={22} color='#fff'/>

                </View>
              )}
            </View>
          </TouchableOpacity>
          {!editMode && (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userHandle}>@{user?.handle}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              {user?.bio && <Text style={styles.userBio}>{user?.bio}</Text>}
              

            </View>
          )}
        </View>

        {/* Edit form */}
        {editMode && (
          <View style={styles.form}>
            {/* name */}
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>NAME</Text>
              <TextInput style={styles.input}/>
            </View>

            {/* handle */}

            {/* bio */}

            {/* save button */}

            {/* cancel button */}

          </View>
        )}

        {/* profile options */}

        {/* sign out */}

      </ScrollView>

    </SafeAreaView>
  )
}