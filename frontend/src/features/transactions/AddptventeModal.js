import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../components/Input/InputText'
import ErrorText from '../../components/Typography/ErrorText'




function AddptventeModal({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")


    
    

    return(
        <>

            <InputText type="text"  updateType="name" containerStyle="mt-4" labelTitle="name" />

            <InputText type="text"  updateType="rhmanager" containerStyle="mt-4" labelTitle="rhmanager" />

            <InputText type="text"  updateType="location" containerStyle="mt-4" labelTitle="location" />
           

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" >Save</button>
            </div>
        </>
    )
}

export default AddptventeModal