import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SendData from './SendData'

const Main = () => {
    const [categories,setCategories] = useState([])
    const [loading , setLoading] = useState(false)

    useEffect(()=>{
        const fetch = async() =>{
            setLoading(true);

            const res = await axios.get("https://apis-instaparty.herokuapp.com/category/all",{
                headers:{
                    'x-api-key':'XXtyr$V4Cpeqf4ANyWq8xI3O687eB1GGBCXrc13P4x^UMu@#t8o24gTFvls7d8#1QTGKFYawzPx6F5owRVfMzGlkaa7iy8ZT319Z'

                }
            })
            setCategories(res.data.data);
            setLoading(false);

            


        }
        fetch();
        
    },[])
    console.log(categories)
    return (
        <div>
            <SendData categories={categories}/>
        </div>
    )
}

export default Main
