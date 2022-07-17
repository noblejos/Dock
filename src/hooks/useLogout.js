import { useEffect, useState } from "react"
import { projectAuth } from "../components/firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogout=()=>{
    const [isCancelled,SetIsCancelled] = useState(false)
    const[error, setError] = useState(null)
    const[isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

     const logout=async ()=>{
        setError(null)
        setIsPending(true)

        try{
            await projectAuth.signOut()
            // dispatch logout action
            dispatch({type:'LOGOUT', payload: null})

            // update state
            if(!isCancelled){
                setError(null)
                setIsPending(false)
            }


        }catch(err){
            if(!isCancelled){
                console.log(err.message)
                setError(err.message)
                setIsPending(false)    
            }
        }

        
    }
    useEffect(()=>{
        return ()=> SetIsCancelled(true)
    },[])
    return {logout, error, isPending}
}