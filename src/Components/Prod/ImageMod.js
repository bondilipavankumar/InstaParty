import React,{useState} from 'react'
import Modal from 'react-modal'


const ImageMod = ({comment}) => {

    const [modalOpen,setModalOpen] = useState(false);
    const [details,setDetails] = useState("");
    const [imgMod,setImgMod] = useState([])

    // console.log(imgMod,comment)


    function merg(comment){
        let x = (comment)
        let match = imgMod.filter((img)=>{
            if(img.prod_id === x.prod_id){
                return true;
                }
            else{
                 return false
                }
        })
    setDetails(match)
    console.log(match)
        
    }


    const selectImage = (comment)=>{
        let item = comment.prod_id
        fetch(`https://apis-instaparty.herokuapp.com/product/${item}`,{
            method:'GET',
            headers:{
                'x-api-key':'XXtyr$V4Cpeqf4ANyWq8xI3O687eB1GGBCXrc13P4x^UMu@#t8o24gTFvls7d8#1QTGKFYawzPx6F5owRVfMzGlkaa7iy8ZT319Z',
                "admin_password":"InstaParty^2021*^",

            },
        })
        
        .then(res=>res.json())
        .then(json=>json.images.rows)
        .then(result=>{
            setImgMod(result)
        })
        
        
        
    }

    function found(e){
        selectImage()
        merg(comment)
        setModalOpen(true);
    }
    return (
        <div>
            <button onClick={found}><b>Products</b></button>
            <Modal isOpen={modalOpen} ariaHideApp={false}
            >
                <table>
                    <thead>
                        <th>Image</th>
                    </thead>
                    <tbody>
                        {details.length>0?
                        details.map(detail=>{
                            return(
                                <tr key={detail.prod_id}>
                                    <td>{detail.img_url}</td>
                                </tr>
                            )

                        })
                        :"Not There"}
                        
                    
                    </tbody>
                </table>
                <button className="but" onClick={()=>setModalOpen(false)}>Close</button>

            </Modal>
            
        </div>
    )
}

export default ImageMod
