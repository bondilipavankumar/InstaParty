import axios from 'axios';
import React, { useState } from 'react'
import '../../Table/table.css'

const SendData = ({categories}) => {
    const [search,setSearch] = useState("");
    const [nam,setNam] = useState("");
    
    const [short,setShort] = useState("");
    const [long,setLong] = useState("")
    const [catId,setCatId] = useState(null)

    function selectUser(category){
        let item = category;
            
       setNam(item.name)
       setShort(item.short_desc)
       setLong(item.long_desc)
       setCatId(item.cat_id)
        
    }

    function updateCat(){
        // console.warn(nam,catId)
        let item = {nam,short,long,catId}
        axios.put(`https://apis-instaparty.herokuapp.com/category/${catId}`,{
           
            headers:{
                'x-api-key':"XXtyr$V4Cpeqf4ANyWq8xI3O687eB1GGBCXrc13P4x^UMu@#t8o24gTFvls7d8#1QTGKFYawzPx6F5owRVfMzGlkaa7iy8ZT319Z",
                "admin_password":"Admin_password"
            },
            body:JSON.stringify(item)
        }).then((result)=>{
            result.json().then((resp)=>{
                console.log(resp)

            })
        })

    }

    return (
        <div>
            <input type="text" placeholder="Search" onChange={(e)=>{
                setSearch(e.target.value)
            }}/>
        <table className="table">
            <thead>
                
          <th><b>Name</b></th>
          
          <th><b>Short Desc</b></th>
          
          <th><b>Long Desc</b></th>
          <th><b>Image Url</b></th>
            </thead>
            <tbody>
                {categories.filter((category)=>{
                    if(search === ""){
                        return category
                    } else if(category.name.toLowerCase().includes(search.toLowerCase())){
                        return category
                    }
                })
                .map(category=>(
                    <tr key={category.cat_id}>
                    <td datalabel="Name">{category.name}</td>
                    
                    <td datalabel="Short Desc">{category.short_desc}</td>
                    <td datalabel="Long Desc">{category.long_desc}</td>
                    
                    <td datalabel="Image Url">{category.img_url}</td>
                    <td><button onClick={()=> selectUser(category)}>Update</button></td>
                </tr>
                ))}
                
            </tbody>
        </table>
        <div>
            <input type="text" value={nam} onChange={(e)=>setNam(e.target.value)}/>
            <input type="text" value={short} onChange={(e)=>setShort(e.target.value)}/>
            <input type="text" value={long} onChange={(e)=>setLong(e.target.value)}/>
            <button>Update it</button>
            {/* onClick={updateCat} */}
        </div>
        </div>
    )
}

export default SendData
