import { Add } from '@material-ui/icons'
import React, { useState } from 'react'
import Modal from 'react-modal'
import Form from './Add'
import './Form.css'
const Modl = () => {

    const [modalOpen,setModalOpen] = useState(false)

    return (
        <div className="form" contained>
            <button onClick={()=> setModalOpen(true)} className="but"><b>Add Product</b></button>
            <Modal isOpen={modalOpen}
             
             
            >
                <Form/>
                <button onClick={()=>setModalOpen(false)} className="but">Close</button>
            </Modal>
        </div>
    )
}

export default Modl
