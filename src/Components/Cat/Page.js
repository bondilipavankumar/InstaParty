import React,{useEffect, useMemo, useState} from 'react'
import Pagination from 'react-bootstrap/Pagination'
import '../Prod/table.css'

const Page = ({total = 0,itemsPerPage = 2,currentPage = 1,onPageChange}) => {
    const [totalPages,setTotalPages] = useState(0)
    useEffect(()=>{
        if(total > 0 && itemsPerPage >0){
            setTotalPages(Math.ceil(total/itemsPerPage))
        }
    },[total,itemsPerPage])

    const paginationitem = useMemo(()=>{
        const pages = [];
        for(let i = 1; i <= totalPages;i++){
            pages.push(
            <Pagination.Item key={i} active={i === currentPage} onClick={()=> onPageChange(i)}>
                {i}
            </Pagination.Item>
            );

        }
        return pages;
    },[totalPages,onPageChange,currentPage]);

    if(totalPages === 0) return null;
    return (
        
        <Pagination className="pagination">
            <button onClick={()=>onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            <ul className="pageNumber">{paginationitem}</ul>
            <button onClick={()=>onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </Pagination>
        
    )
}

export default Page
