import { useEffect, useState } from "react"
import { projectAuth, projectStorage, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [isCancelled,SetIsCancelled] = useState(false)
    const[error, setError] = useState(null)
    const[isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

 const signup = async (email, password, displayName,thumbnail)=>{
        setError(null)
        setIsPending(true)

        try{
            // signup user
          const res = await projectAuth.createUserWithEmailAndPassword(email, password)
          console.log(res.user)

          if(!res){
            throw new Error('could not complete signup')
          }

          //  UPLOAD USER THUMBNAIL
          const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
          const img = await projectStorage.ref(uploadPath).put(thumbnail)
          const imgUrl= await img.ref.getDownloadURL()
          // add displayname to user
         await res.user.updateProfile({ displayName, photoURL: imgUrl})

        //  CREATE A USER DOCUMENT
          await projectFirestore.collection('users').doc(res.user.uid).set({
            online: true,
            displayName,
            photoURL: imgUrl 
          })

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
 
