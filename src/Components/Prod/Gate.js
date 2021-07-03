import React, { useEffect, useMemo, useState } from 'react'
import Page from '../Cat/Page'
import Search from '../Cat/Search'
import Header from '../Cat/Header'
import axios from 'axios'
import './table.css'
import '../Cat/search.css'
import {MdCheck} from 'react-icons/md'
import { MdClose } from 'react-icons/md';
import { Form } from 'react-bootstrap'
import Modl from './Modal'
import renderHTML from 'react-render-html'
import FileBase from 'react-file-base64'

const Gate = () => {
    const [comments,setComments] = useState([])
    const [totalItems,setTotalItems] = useState(0);
    const [currentPage,setCurrentPage] = useState(1)
    const [search,setSearch] = useState("");
    const [nam,setNam] = useState("");
    const [short,setShort] = useState("");
    const [long,setLong] = useState("")
    const [quality,setQuality] = useState("");
    const [photos,setPhotos] = useState("")
    const [orgPrice,setOrgPrice] = useState("");
    const[salePrice,setSalePrice] = useState("");
    const [forBuy,setForBuy] = useState("");
    const [forRent,setForRent] = useState("");
    const [orgRent,setOrgRent] = useState("")
    const [orgDeposit,setOrgDeposit] = useState("")
    const [saleRent,setSaleRent] = useState("")
    const [saleDeposit,setSaleDeposit] = useState("")
    const [catId,setCatId] = useState("")


    const [prodId,setProdId] =  useState(null)
    

    const [sorting,setSorting] = useState({field:'',order:''})
    const ITEMS_PER_PAGE = 6;

    function selectUser(category){
        let item = category;

        setCatId(item.cat_id)
       setNam(item.name)
       setShort(item.short_desc)
       setLong(item.long_desc)
       setProdId(item.prod_id)
       setForBuy(item.for_buy)
       setForRent(item.for_rent)
       setQuality(item.quantity)
       setOrgPrice(item.orig_price)
       setSalePrice(item.sale_price)
       setOrgDeposit(item.original_deposit)
       setOrgRent(item.original_rent)
       setSaleDeposit(item.sale_deposit)
       setSaleRent(item.sale_rent)
       setPhotos(item.image)

        
    }

    const headers = [
        // {        name:"Product Id" ,field:"prod_id",sortable:true},


        {name:"Category Id" ,field:"cat_id",sortable:true},
        {name:"Name" ,field:"name",sortable:true},
        {name:"Short" ,field:"short_desc",sortable:true,},
        {name:"Long" ,field:"long_desc",sortable:true,},
        {name:"Quantity",field:"quantity",sortable:true},
        {name:'Original Price',field:"orig_price",sortable:true},
        {name:"Sales Price",field:"sale_price",sortable:true},

        {name:'Original Rent',field:"original_rent",sortable:true},
        {name:'Sale Rent',field:"sale_rent",sortable:true},

        {name:'Original Deposit',field:"original_deposit",sortable:true},

        
        {name:'Sale Deposit',field:"sale_deposit",sortable:true},
        {name:"For Buy",field:"for_buy ",sortable:true},
        {name:"For Rent",field:"for_rent",sortable:true},
        {name:"Images",field:"images"},
        {name:"Operations"}


    ]



    async function deleteItem(prod_id){
        
        await fetch(`https://apis-instaparty.herokuapp.com/product/${prod_id}`,{
            method:"DELETE",
            headers:{
                'x-api-key':"XXtyr$V4Cpeqf4ANyWq8xI3O687eB1GGBCXrc13P4x^UMu@#t8o24gTFvls7d8#1QTGKFYawzPx6F5owRVfMzGlkaa7iy8ZT319Z",
                "admin_password":"InstaParty^2021*^"
            },
        })
        .then((result)=>{
            result.json().then((resp)=>{
                alert(resp.message + resp.status_code)
                console.warn(resp)
            })
        })

    }

    function clear(){
        setCatId("")
        setNam ("");
        setLong("");
        setShort("");
        setQuality("");
        setSalePrice("");
        setSaleDeposit("");
        setSaleRent("");
        setOrgDeposit("");
        setOrgPrice("");
        setOrgRent("");
        setForBuy("");
        setForRent("");

    }

    function updateCat(){
        // console.warn(nam,prodId)
        let item = {nam,short,long,catId,prodId,forBuy,forRent,quality,orgPrice,orgRent,orgDeposit,salePrice,saleRent,saleDeposit}
        fetch(`https://apis-instaparty.herokuapp.com/product/${item.prodId}`,{
           method:"PUT",
            headers:{
                'x-api-key':"XXtyr$V4Cpeqf4ANyWq8xI3O687eB1GGBCXrc13P4x^UMu@#t8o24gTFvls7d8#1QTGKFYawzPx6F5owRVfMzGlkaa7iy8ZT319Z",
                "admin_password":"InstaParty^2021*^",
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "cat_id":item.catId,
                "name":item.nam,
                "short_desc":item.short,
                "long_desc":item.long,
                "quantity":item.quality,
                "orig_price":item.orgPrice,
                "original_rent":item.orgRent,
                "original_deposit":item.orgDeposit,
                "sale_price":item.salePrice,
                "sale_deposit":item.saleDeposit,
                "sale_rent":item.saleRent,
                "for_buy":item.forBuy,
                "for_rent":item.forRent
            
            })
        }).then((result)=>{
            result.json().then((resp)=>{
                console.log(resp)

                getimage()

            })
        })
        setCatId("");
        setNam ("");
        setLong("");
        setShort("");
        setQuality("");
        setSalePrice("");
        setSaleDeposit("");
        setSaleRent("");
        setOrgDeposit("");
        setOrgPrice("");
        setOrgRent("");
        setForBuy("");
        setForRent("");


    }
    
    


    useEffect(()=>{
        const getData = () => {
            axios.get("https://apis-instaparty.herokuapp.com/product/all",{
                headers:{
                    'x-api-key':'XXtyr$V4Cpeqf4ANyWq8xI3O687eB1GGBCXrc13P4x^UMu@#t8o24gTFvls7d8#1QTGKFYawzPx6F5owRVfMzGlkaa7iy8ZT319Z'

                }
            })
            .then(res => res.data.data)
            .then(result => {
                setComments(result)
            })
            
        }
        getData()
        
        
    },[comments])


    

        const getimage = () => {
            let item = {prodId,photos}
            let formdata = new FormData()
            formdata.append('image',item.photos)
            formdata.append("prod_id",item.prodId)

            fetch(`https://apis-instaparty.herokuapp.com/product/uploadimage`,{
                method:'PUT',
                headers:{
                    'x-api-key':'XXtyr$V4Cpeqf4ANyWq8xI3O687eB1GGBCXrc13P4x^UMu@#t8o24gTFvls7d8#1QTGKFYawzPx6F5owRVfMzGlkaa7iy8ZT319Z',
                    "admin_password":"InstaParty^2021*^",

                },
                body:formdata
            })
            .then(response => response.json())
            .then(result => console.log(result))
            setPhotos({selectedFile:""})
            
        }
     


   


    const commentsData = useMemo(()=>{
        let computedComments = comments;
        if(search){
            computedComments = computedComments.filter(
                comment => comment.name.toLowerCase().includes(search.toLowerCase())||
                comment.short_desc.toLowerCase().includes(search.toLowerCase())

            )
        }
        setTotalItems(computedComments.length);
        //Sorting
        if(sorting.field){
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments = computedComments.sort(
                (a,b)=>
                    reversed * a[sorting.field].toString().localeCompare(b[sorting.field]))
        }
        //Current Page Silce
        return computedComments.slice((currentPage-1)*ITEMS_PER_PAGE,(currentPage - 1)*ITEMS_PER_PAGE + ITEMS_PER_PAGE);
    },[comments,currentPage,search,sorting])

    

    return (
        <div>
            <div className="modl">
                <Modl/>
                <div className="sear">
                        <Search onSearch={(value)=>{
                            setSearch(value);
                            setCurrentPage(1);
                        }}/>
                    </div>
            </div>
                        
                <table className="table">
                <Header
                         headers={headers}
                         onSorting={(field,order) =>
                            setSorting({field,order})
                            }/>
                    
                            
            
        
                    <tbody>
                    <tr className="Upd">
                        {/* <td datalabel="Product Id"><input type="text" value={prodId}/></td> */}
                        <td datalabel="Catt-id"><input type="text" value={catId} onChange={(e)=>setCatId(e.target.value)}/></td>


                   


            <td datalabel="Name"><input type="text" value={nam} onChange={(e)=>setNam(e.target.value)}/></td>
            <td datalabel="Short">
                <input type="text" value={short} onChange={(e)=>setShort(e.target.value)} placeholder="short"/></td>
            <td datalabel="Long">
                <input type="text" value={long} onChange={(e)=>setLong(e.target.value)}/></td>
            <td datalabel="Quality">
                <input type="text" value={quality} onChange={(e)=>setQuality(e.target.value)}/></td> 
            <td datalabel="Original Price">
                <input type="text" value={orgPrice} onChange={(e)=>setOrgPrice(e.target.value)}/></td>
            <td datalabel="sales Price">
                <input type="text" value={salePrice} onChange={(e)=>setSalePrice(e.target.value)}/></td>
            <td datalabel="Original Rent">
                <input type="text" value={orgRent } onChange={(e)=>setOrgRent(e.target.value)}/></td>
            
            <td datalabel="Sales Rent">
            <input type="text" value={saleRent} onChange={(e)=>setSaleRent(e.target.value)}/></td>
            <td datalabel="Original Deposit">
            <input type="text" value={orgDeposit} onChange={(e)=>setOrgDeposit(e.target.value)}/></td>
            <td datalabel="Sales Deposit">
            <input type="text" value={saleDeposit} onChange={(e)=>setSaleDeposit(e.target.value)}/></td>
            <td datalabel="forBuy">
            <input type="text" value={forBuy} onChange={(e)=>setForBuy(e.target.value)}/></td>
            <td datalabel="For Rent">
            <input type="text" value={forRent} onChange={(e)=>setForRent(e.target.value)}/></td>
            <FileBase
                type="file"
                multiple={false}
                onDone={({base64})=>setPhotos({...photos,selectedFile:base64})}

             />
            
            <td datalabel="Operations">
                <div>
            {/* <button onClick={()=> {addNew()}}>Add</button> */}
            <button onClick={()=>{updateCat()}}>Update it</button></div>
            {/* <button onClick={()=>{getimage()}}>ss</button> */}
            <div><button onClick={()=>{clear()}}>Clear</button></div>
            </td>
            {/*  onClick={updateCat} */}
            </tr>
           
                        {commentsData.map(comment=>(
                            <tr key={comment.prod_id}>
                                 
                                {/* <td datalabel={"prod-id"}>
                                    {comment.prod_id}</td>
                                 */}

                                <td datalabel="Catt-id">{comment.cat_id}</td>
                                <td datalabel="Name">{comment.name}</td>
                                <td datalabel="Short"><p>{renderHTML(comment.short_desc)}</p></td>
                                <td datalabel="Long"><ul><li>{comment.long_desc}</li></ul></td>
                                <td datalabel="Quantity">{comment.quantity}</td>
                                <td datalabel="Original Price">{comment.orig_price  === null ? 0:comment.orig_price}</td>
                                <td datalabel="Sales Price"> {comment.sale_price  === null ? 0:comment.sale_price}</td>

                                <td datalabel="Original Rent">{comment.original_rent  === null ? 0:comment.original_rent}</td>
                                <td datalabel="Sales Rent">{comment.sale_rent  === null ? 0:comment.sale_rent}</td>

                                <td datalabel="Original Deposit">{comment.original_deposit  === null ? 0:comment.original_deposit}</td>
                                
                                <td datalabel="Sales Deposit">{comment.sale_deposit === null ? 0:comment.sale_deposit}</td>
                                {/* <td>{comment.img}</td> */}
                                <td datalabel="For Buy">{(comment.for_buy === true) ? <MdCheck color="green"/>:<MdClose color="red"/>} </td>
                                <td datalabel="For rent">{(comment.for_rent === true)  ?  <MdCheck color="green"/>:<MdClose color="red"/>}</td>
                                <td><img src={comment.img_url} alt="no photo is given"/></td>
                                <td datalabel="operations">
                                    <div>
                                        <button onClick={()=> selectUser(comment)}>Update</button>
                                        <button  onClick={()=>{deleteItem(comment.prod_id)}}>Delete</button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                        
                    </tbody>
                   

                </table>

                <Page
                            total={totalItems}
                            itemsPerPage={ITEMS_PER_PAGE}
                            currentPage={currentPage}
                            onPageChange = {page => setCurrentPage(page)}
                            
                        />
                <div>
                
                </div>

                
            </div>
            
        
    )
}

export default Gate
