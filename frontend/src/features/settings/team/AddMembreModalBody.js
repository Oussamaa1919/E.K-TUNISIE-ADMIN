import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'




function AddMembreModalBody({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")


    
    

    return(
        <>

            <InputText type="text"  updateType="First Name" containerStyle="mt-4" labelTitle="First Name" />

            <InputText type="text"  updateType="Discount" containerStyle="mt-4" labelTitle="Last Name" />

            <InputText type="text"  updateType="Nouveau Prix" containerStyle="mt-4" labelTitle="Email" />
            <InputText type="text"  updateType="Nouveau Prix" containerStyle="mt-4" labelTitle="Phone" />

            
            
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" >Save</button>
            </div>
            
        </>
    )
}

export default AddMembreModalBody