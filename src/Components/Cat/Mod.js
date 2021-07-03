import { Details, MergeType } from '@material-ui/icons';
import React,{useState} from 'react'
import Modal from 'react-modal'
import './mod.css'

const Mod = ({comment,products}) => {

    const [modalOpen,setModalOpen] = useState(false);
    const [details,setDetails] = useState("");

    function merg(comment){
        let x = (comment)
        
        let match = products.filter((product)=>{
            if(product.cat_id === x.cat_id){
                return true;
                }
            else{
                 return false
                }
        })
    setDetails(match)
        
    }
    function found(e){
        merg(comment)
        setModalOpen(true);
    }
    return (
        <div>
            <button onClick={found}><b>Products</b></button>

            <Modal isOpen={modalOpen}>
                
            <table className="table">
             <thead>
                          <th>Name</th>
                          
                          <th>Short</th>
                      
                  </thead>
                  
                  <tbody>
             {details.length > 0 ?
             
             details.map(detail=>{
                 
                 return(    
                         <tr key={detail.cat_id}>
                     <td datalabel="name">{detail.name}</td>
                     <td datalabel="short Desc">{detail.short_desc}</td>
                     <td></td>

                 </tr>
                 )
                     
                 
                 
             })
             
             :"notThere"}
             
             </tbody>
             </table>

            {/* {details.sale_price !== undefined ? details.sale_price : null} */}
            <button className="but" onClick={()=>setModalOpen(false)}>Close</button>
            </Modal>
        </div>
    )
}

export default Mod
