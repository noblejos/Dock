const filterList =[ "all", "mine", "development","design", "marketing","sales"]

export default function ProjectFilter({currentFilter, changeFilter}) {
    
    // const [newFilter, setNewFilter]= useState()

  const handleClick=(newFilter)=>{
    // console.log(newFilter)
    changeFilter(newFilter)
    
  }

  return (
    <div className='project-filter'>
        <nav>
            <p>Filter by:</p>
    {filterList.map(filter=>(
        <button key={filter}
        className={currentFilter==filter? "active":""}
        onClick={()=>handleClick(filter)}>{filter}</button>
    ))}
        </nav>
    </div>
  )
}
