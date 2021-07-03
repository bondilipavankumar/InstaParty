import React,{useState} from 'react';
import SendData from './SendData';
import Pagination from './Pagination';

const Post = (products,loading) => {
    
    
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage,setPostsPerPage] = useState(10);
    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = products[Object.keys(products)[0]].slice(indexOfFirstPost,indexOfLastPost)
    console.log(currentPosts,"cs")
    const paginate = (pageNumber) =>{
    
        setCurrentPage(pageNumber)
    } 
    return (
        <div>
            
            <SendData products={(currentPosts)} loading={loading} />
            <Pagination postsPerPage={postsPerPage} totalPosts={products.length} paginate={paginate}/>
        </div>
    )
}

export default Post
