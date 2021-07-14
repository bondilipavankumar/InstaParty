
import React, { useState } from 'react'
import Modal from 'react-modal'
import Form from '../Prod/Form'
import '../Prod/Form.css'
const CatMod = () => {

    const [modalOpen,setModalOpen] = useState(false)

    return (
        <div className="form" contained>
            <button onClick={()=> setModalOpen(true)} className="but"><b>Add Category</b></button>
            <Modal isOpen={modalOpen} ariaHideApp={false}
             
             
            >
                <Form/>
                <button onClick={()=>setModalOpen(false)} className="but">Close</button>
            </Modal>
        </div>
    )
}

export default CatMod
