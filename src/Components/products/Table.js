
  import React, { useEffect, useState } from 'react';
  import axios from 'axios'
  import Pagination from './Pagination';
import Post from './Post';

  
  const Ind = () => {
    const [products,setProducts] = useState([])
    const [loading , setLoading] = useState(false)
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage,setPostsPerPage] = useState(6);
    const [q,setQ] = useState("")
 
    useEffect(()=>{
        const fetchData = async() =>{
            setLoading(true);
            const res = await axios.get("https://apis-instaparty.herokuapp.com/product/all",{
                headers :{
                    'x-api-key':'XXtyr$V4Cpeqf4ANyWq8xI3O687eB1GGBCXrc13P4x^UMu@#t8o24gTFvls7d8#1QTGKFYawzPx6F5owRVfMzGlkaa7iy8ZT319Z'
                }
            })
            setProducts(res.data.data);
            setLoading(false);
                
            
        }
        fetchData();

    
    },[]);
    
    console.log(products)

   
    const indexOfLastPost = currentPage *postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = products.slice(indexOfFirstPost,indexOfLastPost)
    const paginate = (pageNumber) =>{
    
        setCurrentPage(pageNumber)
    } 


    function search(products){
        return products.filter((product)=> product.name.toLowerCase().indexOf(q) > -1);
    }
    // products.filter((products)=>{
    //     if(q == ""){
    //     return products

    //     }
    //     else if (products.name.toLowerCase().includes(q.toLowerCase())) {
    //         return products
    //     }}).map((val,key)=>{
    //         return (
    //             <div key = {key}>
    //                 <p>{products.name}</p>
    //             </div>
    //         )
    //     })
    //     console.log(q)

    // const columns = products[0] && Object.keys(products[0]);
    return (

         <div className="container mt-5">
             <input type="text" value={q} onChange = {(e)=>setQ(e.target.value)}/>
             {/* <h1 className="text-primary mb-3">My Blog</h1> */}
             <Post products = {search(products)} loading={loading} />
             
             {/* <SendData products={search(products)} loading={loading} /> */}
             <Pagination postsPerPage={postsPerPage} totalPosts={products.length} paginate={paginate}/>
         </div>
      )
  }
  
  export default Ind
  