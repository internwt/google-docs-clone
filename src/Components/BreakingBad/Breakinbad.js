import React,{useEffect, useState} from 'react'
import './Breakingbad.css'
function Breakinbad() {
    const [items,setItems] = useState([])
    useEffect(()=>{
     const fetchItems = async()=>{
         fetch(`https://breakingbadapi.com/api/characters`)
         .then(res=>res.json())
         .then(data=>setItems(data))
     }
     fetchItems()
    },[])
    console.log(`items`,items)
    return (
        <div className='cards'>
            {items.map((img,index)=>{
             return (  <div className='card'>
                 <img src={img.img} />
                    </div>
             )
            })}
        </div>
    )
}

export default Breakinbad
