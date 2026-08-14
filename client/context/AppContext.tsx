import { AuthState, User } from "@/types";
import { createContext } from "react";


interface AppContextType{
    auth:AuthState;
    login: (token: string, user: User)=> Promise<void>
}

const AppContext = createContext<AppContextType | null>(null)