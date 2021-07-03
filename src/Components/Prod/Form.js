import React,{useState,useEffect} from 'react'
import { TextField,Button,Typography,Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import './Add.css'
import Modl from './Modal'
import { AlarmTwoTone } from '@material-ui/icons'



const Form = () => {
    const [nam,setNam] = useState("");
    const [short,setShort] = useState("");
    const [long,setLong] = useState("")
    const [namError,setNamError]=useState(false)
    const [shortError,setShortError]=useState(false)
    const [longError,setLongError]=useState(false)
    const [image,setImage] = useState("")




    async function addNew(){
        let item = {nam,short,long}
        if(item.nam.length<1 && item.short.length<1&&item.long.length< 1){
                alert("Please enter details")
                setNamError(true)
            setLongError(true)
            setShortError(true)
            }
        else if(item.nam.length < 1 && item.short.length<1){
            alert("please enter name and short desc")
            setShortError(true)
            setNamError(true)
        }
        else if(item.nam.length <1 && item.long.length<1){
            alert("please enter name and Long desc")
            setLongError(true)
            setNamError(true)
        }
        else if(item.short.length<1 && item.long.length<1){
            alert("please enter short  and Long desc")
            setLongError(true)
            setShortError(true)
        }
        else if(item.nam.length < 1 ){ 
            alert("Please Enter Name")
            setNamError(true)
            setLongError(false)
            setShortError(false)



        }
        else if( item.short.length < 1){
            alert("Please Enter Short Description")
            setShortError(true)
            setNamError(false)
            setLongError(false)
        }
        else if(item.long.length< 1){
            alert("Please Enter Long Description")
            setLongError(true)
            setShortError(false)
            setNamError(false)

        }

                else{

            console.log(item)
            await fetch(`https://apis-instaparty.herokuapp.com/category/add`,{
                method:"POST",
                headers: {
                    "x-api-key": "XXtyr$V4Cpeqf4ANyWq8xI3O687eB1GGBCXrc13P4x^UMu@#t8o24gTFvls7d8#1QTGKFYawzPx6F5owRVfMzGlkaa7iy8ZT319Z",
                    "admin_password": "InstaParty^2021*^",
                    "Content-Type": "application/json"
                },
                body:(JSON.stringify({
                    "name":item.nam,
                    "short_desc":item.short,
                    "long_desc":item.long,
                
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
            setNamError(false);
            setLongError(false);
            setShortError(false);
        })
    }
    
        
    }
    // async function addImage() {
    //     let item = {image}
    //     let formData = new FormData()
    //     await fetch(`https://apis-instaparty.herokuapp.com//category/uploadimage`,{
    //             method:"POST",
    //             headers: {
    //                 "x-api-key": "XXtyr$V4Cpeqf4ANyWq8xI3O687eB1GGBCXrc13P4x^UMu@#t8o24gTFvls7d8#1QTGKFYawzPx6F5owRVfMzGlkaa7iy8ZT319Z",
    //                 "admin_password": "InstaParty^2021*^",
    //                 "Content-Type": "application/json"
    //             },
    //             body:(form-data({

                
    //                 })
    //             )


    //         })

    // }


    

    // modal

    return (
        <Paper>
        <div className="Add">
            <form  onSubmit={addNew}>
                <Typography variant="h6">Create Category</Typography>
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
                    onChange={(e)=>setShort(e.target.value)}
                />
                {shortError?<div style={{fontSize:20,color:"red"}}>
                Plase fill Short Description
                </div>:null}


                <TextField
                    name="long_desc"
                    variant="outlined"
                    label="Long Desc" 
                    fullWidth 
                    value={long} 
                    onChange={(e)=>setLong(e.target.value)}
                />
                {longError?<div style={{fontSize:20,color:"red"}}>
                Plase fill Long Description
                </div>:null}

                <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64})=>setImage({...image,selectedFile:base64})}

                    />
            </form>
            <div>
                                        
                <button  className="butt" type="submit" onClick={addNew}>Add</button>
            </div>

        </div>
    </Paper>
    )
}

export default Form

