import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [isCancelled,SetIsCancelled] = useState(false)
    const[error, setError] = useState(null)
    const[isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

 const signup = async (email, password, displayName)=>{
        setError(null)
        setIsPending(true)

        try{
            // signup user
          const res = await projectAuth.createUserWithEmailAndPassword(email, password)
          console.log(res.user)

          if(!res){
            throw new Error('could not complete signup')
          }

          // add displayname to user
         await res.user.updateProfile({ displayName: displayName})

            // dispatch a login function
            dispatch({ type: 'LOGIN', payload:res.user})
            // update state
         if (!isCancelled){
            setIsPending(false)
            setError(null)
         }
          
        }
        catch(err){
            console.log(err.message)
            if(!isCancelled){
                setError(err.message)
                setIsPending(false)
            }  
        }
    }
    useEffect(()=>{
        return ()=> SetIsCancelled(true)
    },[])
    
    return  {error, isPending, signup}
}
 
