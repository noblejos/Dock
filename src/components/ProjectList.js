import "./ProjectList.css"
// import Link from "react-router-dom"
import Avatar from "./Avatar"
import { Link } from "react-router-dom"


export default function ProjectList({projects}) {
    if(projects.length == 0){
        return <h1>You have no projects created</h1>
    }
  return (
    <div className="project-list">
        {projects.map((project)=>(
        <Link to={`/projects/${project.id}`} key={project.id}>
            <h4>{project.name}</h4>
            <p>Due by {project.dueDate.toDate().toDateString()}</p>
            <div className="assigned-to">
            <ul>
                {project.assignedUsersList.map((user)=>(
                        <li key={user.photoUrl}> 
                        <Avatar src={user.photoUrl}/>
                        </li> 
                ))}
                </ul>
            </div>
        </Link>
       ) )}
    </div>
  )
}
