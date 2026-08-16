import { AuthState, User } from "@/types";
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import axios from 'axios'
import { API_BASE_URL } from "@/constants/config";
import { useAuth, useUser } from "@clerk/expo";

export const api = axios.create({baseURL: API_BASE_URL})

const _tokenRef = {current: null as string | null}


interface AppContextType{
    auth:AuthState;
   
    logout: ()=>Promise<void>;
    updateUser: (user:User)=>Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({children}:{children:ReactNode}){

    const [auth,setAuth] = useState<AuthState>({token:null, user:null, loading:true})
    const [users,setUsers]= useState<User[]>([])

    const {getToken, isLoaded: authLoaded, isSignedIn, signOut} = useAuth()
    const {user:clerkUser, isLoaded: userLoaded} = useUser()
    const getTokenRef = useRef(getToken)

    useEffect(()=>{
        getTokenRef.current = getToken;
    },[getToken])

    // attach clerk token on every request

    useEffect (()=>{
        const interceptor = api.interceptors.request.use(async (config)=>{
            try {
                if(isSignedIn){
                    const token = await getTokenRef.current();
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                        _tokenRef.current=token;
                        
                    }
                }
            } catch (err) {
                console.error("Axios interceptor error:", err)
                
            }
            return config;
        })

        return ()=>{
            api.interceptors.request.eject(interceptor)
        }

    }, [isSignedIn])

    // keep local Authstate in  sync with clerk profile this.state.
    useEffect(()=>{
        if (!authLoaded || !userLoaded) return;
        if (isSignedIn && clerkUser) {
            const mappedUser: User = {
                _id: clerkUser.id
            }
            
        } 

    },[isSignedIn, authLoaded, userLoaded, clerkUser])


    const logout = useCallback(async ()=>{

    },[])

    const updateUser = useCallback(async () => {
        
    },[])

    return(
        <AppContext.Provider value={{auth,logout,updateUser}}>
            {children}
        </AppContext.Provider>
    )

}

export function useApp(){
    const ctx = useContext(AppContext)
    if(!ctx) throw new Error("useApp must be used inside AppProvider")
        return ctx;
}