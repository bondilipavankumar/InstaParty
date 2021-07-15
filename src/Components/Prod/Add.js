import React,{useState,useEffect} from 'react'
import { TextField,Button,Typography,Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { MenuItem,FormControl,Select } from '@material-ui/core'

import './Add.css'
import Modl from './Modal'
import { AlarmTwoTone, Note } from '@material-ui/icons'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'



const Form = () => {

    const [nam,setNam] = useState("");
    const [short,setShort] = useState("");
    const [long,setLong] = useState("")
    const [quality,setQuality] = useState("");
    const [orgPrice,setOrgPrice] = useState("");
    const[salePrice,setSalePrice] = useState("");
    const [forBuy,setForBuy] = useState("")
    const [forRent,setForRent] = useState("");
    const [orgRent,setOrgRent] = useState("")
    const [orgDeposit,setOrgDeposit] = useState("")
    const [saleRent,setSaleRent] = useState("")
    const [saleDeposit,setSaleDeposit] = useState("")
    const [catId,setCatId] = useState("")
    const [file,setFile] = useState("")
    const [namError,setNamError]=useState(false)
    const [shortError,setShortError]=useState(false)
    const [longError,setLongError]=useState(false)
    const [forBuyError,setForBuyError]=useState(false)
    const [forRentError,setForRentError]=useState(false)
    const [qualityError,setQualityError]=useState(false)
    const [orgPriceError,setOrgPriceError]=useState(false)
    const [orgDepositError,setOrgDepositError]=useState(false)
    const [salePriceError,setSalePriceError]=useState(false)
    const [saleRentError,setSaleRentError]=useState(false)
    const [saleDepositError,setSaleDepositError]=useState(false)
    const [orgRentError,setOrgRentError]=useState(false)
    const [categorys,setCategorys] = useState([])
    const [coun,setCoun] = useState('Category')


    useEffect(()=>{
        const getCategs =() =>{
            axios.get("https://apis-instaparty.herokuapp.com/category/all",{
                
                headers:{
                    'x-api-key':'XXtyr$V4Cpeqf4ANyWq8xI3O687eB1GGBCXrc13P4x^UMu@#t8o24gTFvls7d8#1QTGKFYawzPx6F5owRVfMzGlkaa7iy8ZT319Z'
                }
            })
            .then(res=>res.data.data.documents)
            // .then(result=>{console.log(result)})
            .then((result=>{
                const categorys = result.map((category)=>(
                    {
                        id:category.cat_id,
                        name:category.name
                    }
                ))
                setCategorys(categorys)
            }))
        }
        getCategs()
    },[])



    async function addNew(){
        let item = {nam,short,long,forBuy,forRent,quality,orgPrice,orgRent,orgDeposit,salePrice,saleRent,saleDeposit,catId}
        
       
        

            console.log(item)
            await fetch(`https://apis-instaparty.herokuapp.com/product/add`,{
                method:"POST",
                headers: {
                    "x-api-key": "XXtyr$V4Cpeqf4ANyWq8xI3O687eB1GGBCXrc13P4x^UMu@#t8o24gTFvls7d8#1QTGKFYawzPx6F5owRVfMzGlkaa7iy8ZT319Z",
                    "Admin_Authentication": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6MSwidXNlcl9pZCI6ImFyY3RvY2F0IiwidXNlcl9wYXNzd29yZCI6IjckMzVpRFhsV0xMbFplNyMkXnU4In0sImlhdCI6MTYyNjM1NzY5MiwiZXhwIjoxNjI4OTQ5NjkyfQ.64LvqVkJR_UUCq9o40BmnMm4ajI6lIcifzqYJIjpa1o",
                "Content-Type": "application/json"
                },
                body:(JSON.stringify({
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
                    "for_rent":item.forRent,
                    "cat_id":item.catId
                
                    })
                )


            }).then((result)=>{
            result.json()
            .then((resp)=>{
                console.log(resp.data)
                
            })
            
            
            setNam("");
            setLong("");
            setShort("");
            setQuality("");
            setOrgPrice("");
            setOrgRent("");
            setOrgDeposit("");
            setSaleDeposit("");
            setSalePrice("");
            setSaleRent("");
            setForBuy("");
            setForRent("");
            setNamError(false);
            setLongError(false);
            setShortError(false);
            setQualityError(false);
            setOrgDepositError(false);
            setOrgPriceError(false);
            setOrgRentError(false);
            setSaleRentError(false);
            setSalePriceError(false);
            setSaleDepositError(false);
            setForRentError(false);
            setForBuyError(false);
        })
    
        
    
}

const onCategoryChange = async (e) =>{
    const categoryCode = e.target.value;

    console.log('categoryCode',categoryCode)

    setCoun(categoryCode)
    setCatId(categoryCode)
    // const url = `https://apis-instaparty.herokuapp.com/category/${categoryCode}`
    // await fetch(url,{
    //     headers:{
    //         'x-api-key':'XXtyr$V4Cpeqf4ANyWq8xI3O687eB1GGBCXrc13P4x^UMu@#t8o24gTFvls7d8#1QTGKFYawzPx6F5owRVfMzGlkaa7iy8ZT319Z'
    //     }
    // })
    // .then(res=>res.json())
    // .then(result=>
    //     setCatId(result.data.cat_id)
    // )
    
}

    // modal

    return (
        <Paper>
        <div className="Add">
            <form  onSubmit={addNew}>
                <Typography variant="h6">Create Product</Typography>
                <FormControl> 
                    <Select variant="outlined" onChange={onCategoryChange}  value={coun}>
                        <MenuItem value="Category">Add Category</MenuItem>
                    {categorys.map((category)=>(
                    <MenuItem  value={category.id}>{category.name}</MenuItem>
                ))}
                    </Select>
                </FormControl>
                 
                <TextField
                    name="name"
                    variant="outlined"
                    label="Name" 
                    fullWidth 
                    value={nam} 
                    onChange={(e)=>setNam(e.target.value)}
                />
                {namError ? <div style={{fontSize:20,color:"red"}}>
                    Plase fill Name
                </div>:null}
                <TextField
                    name="short_desc"
                    variant="outlined"
                    label="Short description" 
                    fullWidth 
                    value={short} 
                    multiline={true}
                    onChange={(e)=>setShort(e.target.value)}
                />
                {shortError?<div style={{fontSize:20,color:"red"}}>
                Plase fill Short Description
                </div>:null}
                <TextField
                    name="short_desc"
                    variant="outlined"
                    label="Long Desc" 
                    fullWidth 
                    value={long} 
                    multiline={true}
                    onChange={(e)=>setLong(e.target.value)}
                />
                {/* <div className="long">
                <ReactQuill
                 modules={Note.modules}
                 formats={Note.formats}
                 value={long} 
                 placeholder="Long"
                 onChange={e=>setLong(e)}
                 />
                </div> */}
               


                {longError?<div style={{fontSize:20,color:"red"}}>
                Plase fill Long Description
                </div>:null}

                <TextField
                    name="long_desc"
                    variant="outlined"
                    label="Quality" 
                    fullWidth 
                    value={quality} 
                    onChange={(e)=>setQuality(e.target.value)}
                />
                {qualityError?<div style={{fontSize:20,color:"red"}}>
                Plase fill Quality
                </div>:null}
                <TextField
                    name="long_desc"
                    variant="outlined"
                    label="Original Price" 
                    fullWidth 
                    value={orgPrice} 
                    onChange={(e)=>setOrgPrice(e.target.value)}
                />
                {orgPriceError?<div style={{fontSize:20,color:"red"}}>
                Plase fill Original Price
                </div>:null}
                <TextField
                    name="long_desc"
                    variant="outlined"
                    label="Sales Price" 
                    fullWidth 
                    value={salePrice} 
                    onChange={(e)=>setSalePrice(e.target.value)}
                />
                {salePriceError?<div style={{fontSize:20,color:"red"}}>
                Plase fill Sale Price
                </div>:null}
                <TextField
                    name="long_desc"
                    variant="outlined"
                    label="Sales Rent" 
                    fullWidth 
                    value={saleRent} 
                    onChange={(e)=>setSaleRent(e.target.value)}
                />
                {saleRentError?<div style={{fontSize:20,color:"red"}}>
                Plase fill Sale Rent
                </div>:null}
                <TextField
                    name="long_desc"
                    variant="outlined"
                    label="Sales Deposit" 
                    fullWidth 
                    value={saleDeposit} 
                    onChange={(e)=>setSaleDeposit(e.target.value)}
                />
                {saleDepositError?<div style={{fontSize:20,color:"red"}}>
                Plase fill Sale Deposit
                </div>:null}
                <TextField
                    name="long_desc"
                    variant="outlined"
                    label="original Deposit" 
                    fullWidth 
                    value={orgDeposit} 
                    onChange={(e)=>setOrgDeposit(e.target.value)}
                />
                {orgDepositError?<div style={{fontSize:20,color:"red"}}>
                Plase fill Original Deposit
                </div>:null}
                <TextField
                    name="long_desc"
                    variant="outlined"
                    label="Original Rent" 
                    fullWidth 
                    value={orgRent} 
                    onChange={(e)=>setOrgRent(e.target.value)}
                 />
                 {orgRentError?<div style={{fontSize:20,color:"red"}}>
                    Plase fill Original Rent
                </div>:null}
                 
                <div>
                    <label  className="labe">For Rent</label>
                        <select value={forRent} onChange={(e)=>setForRent(e.target.value)} className="sele">
                            <option>Select</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                        </select>
                </div>
                {forBuyError?<div style={{fontSize:20,color:"red"}}>
                    Plase select buy
                </div>:null}
                <div>
                    <label className="labe">For Buy </label>
                        <select value={forBuy} onChange={(e)=>setForBuy(e.target.value)} className="sele">
                            <option>Select</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                         </select>
                    {/* <div>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({base64})=>setFile({base64})}
                        />
                    </div> */}

                </div>
                {forRentError?<div style={{fontSize:20,color:"red"}}>
                     Please Select Rent
                </div>:null}
                
                 {/* <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> */}

                
            </form>
            <div>
                                        
                <button  className="butt" type="submit" onClick={addNew}>Add</button>
            </div>

        </div>
    </Paper>
    )
}

Note.modules = {
    toolbar: [
        [{'header':'1'},{'header':'2'},{'font':[]}],
        [{size:[]}],['bold','italic','underline','strike','blockquote'],
        [{'list':'ordered'},{'list':'bullet'}],
        ['link','image','video'],['clean'],['code-block']
    ]
};

Note.formats = [
    'header','font','size','bold','italic','underline','strike','blockquote','list','bullet','link','image','video','code-block'
]


export default Form

