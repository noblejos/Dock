import { useEffect, useState } from "react"
import { projectAuth,projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogout=()=>{
    const [isCancelled,SetIsCancelled] = useState(false)
    const[error, setError] = useState(null)
    const[isPending, setIsPending] = useState(false)
    const { dispatch, user } = useAuthContext()

     const logout=async ()=>{
        setError(null)
        setIsPending(true)

        try{
            // update online status

            const {uid} = user
            await projectFirestore.collection("users").doc(uid).update({online:false})

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