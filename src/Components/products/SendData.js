import React from 'react'
import '../../Table/table.css'
import {MdCheck} from 'react-icons/md'
import { MdClose } from 'react-icons/md';

const SendData = ({products,loading}) => {
    // if(loading){
    //     return<h2>Loading</h2>
    // }
    return (
        <table className="table">
             
        <thead>
            
          <th><b>Name</b></th>
          
          <th><b>Short Desc</b></th>
          
          <th><b>Long Desc</b></th>
          
          <th><b>Quantity</b></th>
            <th><b>Original Price</b></th>
            <th><b>Sales Price</b></th>
            
            <th><b>For Buy</b></th>
            <th><b>For rent</b></th>
        
        {/* <tr>{products[0]&& columns.map((heading) =><th>{heading}</th>)}</tr> */}

        </thead>
        <tbody>
        {products.map(product => 
              (
                
               <tr key={product.prod_id}>
                                      
                    <td datalabel="Name">   {product.name}</td>
                    <td datalabel="Short Desc">{product.short_desc}</td>
                    <td datalabel="Long Desc">{product.long_desc}</td>
                    <td datalabel="Quantity">{product.quantity}</td>

                   <td datalabel="Original Price">{product.orig_price}</td>
                   <td datalabel="Sales Price"> {product.sale_price}</td>
                   
                   
                   <td datalabel="For Buy">{(product.for_buy === true) ? <MdCheck color="green"/>:<MdClose color="red"/>} </td>
                   <td datalabel="For rent">{(product.for_rent === true)  ?  <MdCheck color="green"/>:<MdClose color="red"/>}</td>
                
               </tr>
                            
               )
            )}
            {/* {products.map(row => 
                <tr>
                    {columns.map(column => <td >{row[column]}</td>)}
                </tr>
            )} */}
              </tbody>
              
          </table>
     
    )
}

export default SendData







// <table className="table">
             
// <thead>
    
//   <th><b>Name</b></th>
  
//   <th><b>Short Desc</b></th>
  
//   <th><b>Long Desc</b></th>
  
//   <th><b>Quantity</b></th>
//     <th><b>Original Price</b></th>
//     <th><b>Sales Price</b></th>
    
//     <th><b>For Buy</b></th>
//     <th><b>For rent</b></th>

// {/* <tr>{products[0]&& columns.map((heading) =><th>{heading}</th>)}</tr> */}

// </thead>
// <tbody>

// {products.map(product => 
// (
  
//  <tr key={product.prod_id}>
                        
//       <td datalabel="Name">   {product.name}</td>
//       <td datalabel="Short Desc">{product.short_desc}</td>
//       <td datalabel="Long Desc">{product.long_desc}</td>
//       <td datalabel="Quantity">{product.quantity}</td>

//      <td datalabel="Original Price">{product.orig_price}</td>
//      <td datalabel="Sales Price"> {product.sale_price}</td>
     
     
//      <td datalabel="For Buy">{(product.for_buy === true) ? <MdCheck color="green"/>:<MdClose color="red"/>} </td>
//      <td datalabel="For rent">{(product.for_rent === true)  ?  <MdCheck color="green"/>:<MdClose color="red"/>}</td>
  
//  </tr>
              
//  )
// )}
// {/* {products.map(row => 
//   <tr>
//       {columns.map(column => <td >{row[column]}</td>)}
//   </tr>
// )} */}
// </tbody>

// </table>