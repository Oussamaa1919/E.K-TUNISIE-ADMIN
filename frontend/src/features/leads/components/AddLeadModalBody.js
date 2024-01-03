import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewLead } from "../leadSlice"
import  { useEffect } from 'react';

const INITIAL_LEAD_OBJ = {
    first_name : "",
    last_name : "",
    email : ""
}

function AddLeadModalBody({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)
    

    const saveNewLead = () => {
        if(leadObj.first_name.trim() === "")return setErrorMessage("First Name is required!")
        else if(leadObj.email.trim() === "")return setErrorMessage("Email id is required!")
        else{
            let newLeadObj = {
                "id": 7,
                "email": leadObj.email,
                "first_name": leadObj.first_name,
                "last_name": leadObj.last_name,
                "avatar": "https://reqres.in/img/faces/1-image.jpg"
            }
            dispatch(addNewLead({newLeadObj}))
            dispatch(showNotification({message : "New Lead Added!", status : 1}))
            closeModal()
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setLeadObj({...leadObj, [updateType] : value})
    }

    return(
        <>

<InputText type="text"  updateType="name" containerStyle="mt-4" labelTitle="name" />

<InputText type="text"  updateType="Discount" containerStyle="mt-4" labelTitle="Discount" />

<InputText type="text"  updateType="Nouveau Prix" containerStyle="mt-4" labelTitle="Nouveau Prix" />
<div>
    <label className="text-white dark:text-gray-200" for="passwordConfirmation">Date debut</label>
    <input id="date" type="date" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
</div>
<div>
    <label className="text-white dark:text-gray-200" for="passwordConfirmation">Date Fin</label>
    <input id="date" type="date" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
</div>
<div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                
                    <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span class="">Télécharger votre image</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                    </label>
                    
              </div>
<ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
<div className="modal-action">
    <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
    <button  className="btn btn-primary px-6" >Save</button>
</div>
        </>
    )
}

export default AddLeadModalBody