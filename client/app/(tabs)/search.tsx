import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import type {User as IUser} from '../../types'
import { useRouter } from 'expo-router';
import { dummyUsers } from '@/assets/assets';

export default function search() {

  const [search, setSearch]=useState("")
  const [users, setUsers]=useState<IUser[]>([])
  const [loading, setLoading]=useState(false)
  const router = useRouter()

  const fetchUsers = async () => {
    setLoading(true)
    setTimeout(()=>{
      setUsers(dummyUsers)
      setLoading(false)
    },1000)
    
  }

  useEffect(()=>{
    const timer = setTimeout(fetchUsers, 300)
    return ()=> clearTimeout(timer)
  },[search])


  return (
    <View>
      <Text>search</Text>
    </View>
  )
}