import React from 'react'
import '../../Table/table.css'
// import ReactPaginate from 'react-paginate'
const Pagination = ({postsPerPage,totalPosts,paginate}) => {
    const pageNumbers = []

    for (let i = 1;i<=Math.ceil(totalPosts/postsPerPage);i++){
        pageNumbers.push(i);
    }
    
    return (
        <div>
        <nav>
            <ul className='pagination'>{pageNumbers.map(number =>(
                <li key={number} className='page-item'>
                    <button onClick={()=> paginate(number)} className='page-link'>
                    <b>{number}</b></button>
               
                </li>
            ))}</ul>
        </nav>
        
        </div>
    )
}

export default Pagination
