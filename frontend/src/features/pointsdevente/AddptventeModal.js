import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../components/Input/InputText'
import ErrorText from '../../components/Typography/ErrorText'
import { showNotification } from "../common/headerSlice"

import { useAddPDVMutation,useGetPDVsQuery } from "../../slices/pointDeVenteApiSlice"



function AddptventeModal({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [rhmanager, setrhmanager] = useState('');
    const [addPDV, isLoading ,refetch] = useAddPDVMutation();
    const { refetch: refetchPdv } = useGetPDVsQuery();
    
    const submitHandler = async (e) => {
        e.preventDefault();
    
        
          try {
             await addPDV({name,rhmanager,address });
             await refetchPdv();
             if (!errorMessage) { // Only dispatch success notification if there's no error message
                dispatch(showNotification({ message: "Nouvel Point de vente ajouté !!", status: 1 }));
            }
          } catch (err) {
         
            setErrorMessage(err?.data?.message || err.error);
            
          }
        
      };
    

    return(
        <>
<form onSubmit={submitHandler}>

<div className="mb-4">

    <input  type='name'
            placeholder='* Nom'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input  input-bordered w-full mt-4"
           />
           <input  type='rhmaanager'
            placeholder='* RH Manager'
            value={rhmanager}
            onChange={(e) => setrhmanager(e.target.value)}
            className="input  input-bordered w-full mt-4"
           />
            <input  type='address'
            placeholder='* Addesse'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input  input-bordered w-full mt-4"
           />
          

</div>




<div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Annuler</button>
                <button  type="submit" className={"btn btn-primary px-6"} >Ajouter</button>
            </div>
            
</form>


<ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
        </>
    )
}
export default AddptventeModal