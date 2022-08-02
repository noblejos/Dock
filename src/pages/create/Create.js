import {useEffect, useState}  from 'react'
import Select from 'react-select'
import './Create.css'
import {useCollection} from '../../hooks/useCollection.js'
import { timestamp } from '../../firebase/config.js'
import { useAuthContext } from '../../hooks/useAuthContext'
import {useFirestore } from "../../hooks/useFirestore.js"
import  { useHistory } from "react-router-dom"

const categories=[
  {value:'development', label:'Development'},
  {value:'design', label:'Design'},
  {value:'sales', label:'Sales'},
  {value:'marketing', label:'Marketing'},
]

export default function Create() {
  const history = useHistory()
  const {addDocument, response } = useFirestore("projects")
  const {documents}=useCollection('users')
  const {user} = useAuthContext()

  const [users,setUsers] = useState([])
  const [name, setName]=useState('')
  const [details, setDetails]= useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [formErrors, setFormErrors] =useState(null)
  const [assignedUsers, setAssignedUsers] = useState([])

 
  
  useEffect(()=>{
    if(documents){
      const options = documents.map(user=>{
        return { value:user, label:user.displayName, assignedUsers}
      })
      setUsers(options)
    }
  },[documents])

    const handleSubmit= async(e)=>{
        e.preventDefault()
        setFormErrors(null)

        if(!category){
          setFormErrors("please select a category")
          return
        }
        if(assignedUsers.length<1){
          setFormErrors("please select a user to assign project to")
          return
        }

        const createdBy={
          displayName:user.displayName,
          photoUrl:user.photoURL,
          id:user.uid
        }

        const assignedUsersList= assignedUsers.map((u)=>{
          return{
            displayName:u.value.displayName,
            photoUrl:u.value.photoURL,
            id: user.uid
          }
        })
          
        const project={
          name,
          details,
          category:category.value,
          dueDate:timestamp.fromDate(new Date(dueDate)),
          comments:[],
          createdBy:createdBy,
          assignedUsersList
          
        }

        await addDocument(project)
        if (!response.error){
            history.push("/")
        }        
        // console.log(user)
        // console.log(project)
    }

  return (
    <div className='create-form'>
      <h2 className='page-title'>Create a new project</h2>
     <form onSubmit={handleSubmit}>
      <label >
        <span>Project name:</span>
        <input 
        required
        type="text"
        onChange={(e)=>setName(e.target.value)}
        value={name}
         />
      </label>
      <label >
        <span>Project details:</span>
        <textarea
        required
        type="text"
        onChange={(e)=>setDetails(e.target.value)}
        value={details}
         />
      </label>
      <label >
        <span>Due date:</span>
        <input 
        required
        type="date"
        onChange={(e)=>setDueDate(e.target.value)}
        value={dueDate}
         />
      </label>
      <label >
        <span>project category:</span>
        {/* category select */}
        <Select
          options={categories}
          onChange={(option)=>setCategory(option)}
        />
      </label>
      <label >
        <span>Assign to:</span>
        {/* assignee select */}
        <Select
        onChange={(option)=> setAssignedUsers(option)}
        options={users}
        isMulti
        />
      </label>
      <button className='btn'>Add project</button>
     </form>
     {formErrors?<div className='error'>{formErrors}</div>:''}
    </div>
  )
}
