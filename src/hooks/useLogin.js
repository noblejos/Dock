import { useEffect, useState } from "react"
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogin=()=> {
    const [isCancelled,SetIsCancelled] = useState(false)
    const[error, setError] = useState(null)
    const[isPending, setIsPending] = useState(false)
    const { dispatch,user } = useAuthContext()
    
    const login=async(email, password)=>{
        setError(null)
        setIsPending(true)

        try{
          const res =  await projectAuth.signInWithEmailAndPassword(email, password)

          await projectFirestore.collection("users").doc(res.user.uid).update({online:true})
            // dispatch logout action
            dispatch({type:'LOGIN', payload: res.user})

            // const {uid} = user
            

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

    return {login, error, isPending}

}
