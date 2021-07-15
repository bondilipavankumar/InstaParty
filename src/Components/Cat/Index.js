import React, { useEffect, useMemo, useState } from 'react'
import Page from './Page'
import Search from './Search'
import Header from './Header'
import axios from 'axios'
import '../../Table/table.css'
import '../Prod/table.css'
import CatMod from './CatMod'
import { MenuItem,FormControl,Select } from '@material-ui/core'
import Mod from './Mod'
import FileBase from 'react-file-base64'
import { Category, CategorySharp } from '@material-ui/icons'

const Index = () => {
    const [comments,setComments] = useState([])
    const [comme,setComme] = useState('All')
    const [totalItems,setTotalItems] = useState(0);
    const [currentPage,setCurrentPage] = useState(1)
    const [search,setSearch] = useState("");
    const [nam,setNam] = useState("");
    const [short,setShort] = useState("");
    const [long,setLong] = useState("")
    const [catId,setCatId] = useState(null)
    const [file,setFile] = useState("")
    const [cums,setCums] = useState([])
    const [image,setImage] = useState("")
    const [categs,setCategs] = useState("")
    const [che,setChe] = useState("")

    const [sorting,setSorting] = useState({field:'',order:''})
    const ITEMS_PER_PAGE = 7;

    function selectUser(category){
        let item = category;
            setCatId(item.cat_id)
       setNam(item.name)
       setShort(item.short_desc)
       setLong(item.long_desc)
       setImage(item.img_url)
       setCatId(item.cat_id)
        
    }



    const headers = [
        {name:"CategoryId" ,field:'cat_id',shortable:true},
        {name:"Name" ,field:"name",sortable:true},
        {name:"Short" ,field:"short_desc",sortable:true,},
        {name:"Long" ,field:"long_desc",sortable:true,},
        {name:"Image",field:"img_url"},
        {name:"Operations"}


    ]
    


    function clear(){
        setCatId("")
        setNam("");
        setShort("");
        setLong("");
        setImage("");
    }

    function updateCat(){
        // console.warn(nam,catId)
        let item = {nam,short,long,catId,image,file}
        console.log(item)
        fetch(`https://apis-instaparty.herokuapp.com/category/${catId}`,{
           method:"PUT",
            headers:{
                'x-api-key':"XXtyr$V4Cpeqf4ANyWq8xI3O687eB1GGBCXrc13P4x^UMu@#t8o24gTFvls7d8#1QTGKFYawzPx6F5owRVfMzGlkaa7iy8ZT319Z",
                "Admin_Authentication": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6MSwidXNlcl9pZCI6ImFyY3RvY2F0IiwidXNlcl9wYXNzd29yZCI6IjckMzVpRFhsV0xMbFplNyMkXnU4In0sImlhdCI6MTYyNjM1NzY5MiwiZXhwIjoxNjI4OTQ5NjkyfQ.64LvqVkJR_UUCq9o40BmnMm4ajI6lIcifzqYJIjpa1o",
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "name" : item.nam,
                "short_desc" : item.short,
                "long_desc" : item.long,
                "img_url":item.image

            }
            )
        }).then((result)=>{
            result.json().then((resp)=>{
                console.log(resp)

            })
            
        setNam("");
        setShort("");
        setLong("");
        setImage("");
        })

    }


    useEffect(()=>{
        const getData = () => {
            axios.get("https://apis-instaparty.herokuapp.com/category/all",{
                headers:{
                    'x-api-key':'XXtyr$V4Cpeqf4ANyWq8xI3O687eB1GGBCXrc13P4x^UMu@#t8o24gTFvls7d8#1QTGKFYawzPx6F5owRVfMzGlkaa7iy8ZT319Z'

                }
            })
            .then(res => res.data.data.documents)
            .then(result => {
                setComments(result)
            })
            
        }
        getData()
    },[comments])


    useEffect(()=>{
        const getDat = () => {
            axios.get("https://apis-instaparty.herokuapp.com/product/all",{
                headers:{
                    'x-api-key':'XXtyr$V4Cpeqf4ANyWq8xI3O687eB1GGBCXrc13P4x^UMu@#t8o24gTFvls7d8#1QTGKFYawzPx6F5owRVfMzGlkaa7iy8ZT319Z'

                }
            })
            .then(res => res.data.data.documents)
            .then(result => {
                setCums(result)
            })
            
        }
        getDat()
        
        
    },[])
    const onCommentChange = async(e)=>{
        const commentCode = e.target.value;
        setComme(commentCode)
        const url = commentCode === "All" ? "https://apis-instaparty.herokuapp.com/category/all":`https://apis-instaparty.herokuapp.com/category/${commentCode}`

        await fetch(url,{
            headers:{
            'x-api-key':'XXtyr$V4Cpeqf4ANyWq8xI3O687eB1GGBCXrc13P4x^UMu@#t8o24gTFvls7d8#1QTGKFYawzPx6F5owRVfMzGlkaa7iy8ZT319Z'

        }})
        .then(res => res.json())
        .then(result=>result.data)
            .then(result => {
                setCategs(result)
            })

        
    }


    
    const commentsData = useMemo(()=>{

        
        let computedComments = comments;
        if(search){
            computedComments = computedComments.filter(
                comment => comment.name.toLowerCase().includes(search.toLowerCase())||
                comment.short_desc.toLowerCase().includes(search.toLowerCase())||
                comment.long_desc.toLowerCase().includes(search.toLowerCase())

            )
        }
        setTotalItems(computedComments.length);
        
        //Sorting
        if(sorting.field){
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments = computedComments.sort(
                (a,b)=>
                    reversed * a[sorting.field].localeCompare(b[sorting.field]))
        }
        //Current Page Silce
        return computedComments.slice((currentPage-1)*ITEMS_PER_PAGE,(currentPage - 1)*ITEMS_PER_PAGE + ITEMS_PER_PAGE);

        //compare
    },[comments,currentPage,search,sorting])


    return (
        <div>
            <div >
                <div className="modl">
                    <CatMod/>
                    <div className="sear">
                        <Search onSearch={(value)=>{
                            setSearch(value);
                            setCurrentPage(1);
                        }}/>
                    </div>
                    <div>
                        <FormControl className="app__deopdown">
                            <Select variant="outlined" onChange={onCommentChange} value={comme}>
                                <MenuItem value="All">All</MenuItem>
                               {comments.map((comment)=>(
                                   <MenuItem value={comment.cat_id}>{comment.name}</MenuItem>
                               ))}
                            </Select>
                        </FormControl>
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
                <td datalabel="Category_id">
                    <input value={catId}/></td>
                <td  datalabel="Name">
                <input type="text" value={nam} onChange={(e)=>setNam(e.target.value)}/>

                </td>
                <td datalabel="Short">
                <input type="text" value={short} onChange={(e)=>setShort(e.target.value)}/>

                </td >
                <td datalabel="Long">
                <input type="text" value={long} onChange={(e)=>setLong(e.target.value)}/>

                </td>
                <td>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64})=>({setImage:base64})}

                    />
                </td>
                <td datalabel="operations">
                    <div>
                    <button onClick={updateCat}>Update it</button>
                    
                    </div> 
                    <div>
                        <button onClick={clear}>Clear</button>
                    </div>
                </td>

            
            </tr>
            
                        {comme === "All" ?
                        commentsData.map(comment=>(
                            <tr key={comment.cat_id}>
                                {/* <td><input type="checkbox" onChange={()=>selectUser(comment)}/>&nbsp;&nbsp;</td> */}
                                {/* <td><input type="c/></td> */}
                                <td datalabel="categoryId">{comment.cat_id}</td>
                                <td datalabel="Name">{comment.name}</td>
                                <td datalabel="Short">{comment.short_desc}</td>
                                <td datalabel="Long">{comment.long_desc}</td>
                                <td><img className="img" src={comment.img_url} alt="noT there"/></td>
                                <td datalabel="operations">
                                    <div>
                                        <button onClick={()=> selectUser(comment)}>Update</button>
                                        
                        <Mod comment={comment} products={cums}/>
                                        {/* <button>Delete</button> */}
                                
                                    </div>
                                </td>
                                
                            </tr>
                        )):
                            <tr key={categs.cat_id}>
                                <td datalabel="categoryId">{categs.cat_id}</td>
                                <td datalabel="Name">{categs.name}</td>
                                <td datalabel="Short">{categs.short_desc}</td>
                                <td datalabel="Long">{categs.long_desc}</td>
                                <td><img className="img" src={categs.img_url} alt="noT there"/></td>
                                <td datalabel="operations">
                                    <div>
                                        <button onClick={()=> selectUser(categs)}>Update</button>
                                        
                        <Mod comment={categs} products={cums}/>
                                        {/* <button>Delete</button> */}
                                
                                    </div>
                                </td>
                            </tr>
                        
                        }
                       
                    </tbody>
                   

                </table>
                <div>
                <Page
                            total={totalItems}
                            itemsPerPage={ITEMS_PER_PAGE}
                            currentPage={currentPage}
                            onPageChange = {page => setCurrentPage(page)}
                            
                        />
                </div>

                
            </div>
            
        </div>
    )
}

export default Index
