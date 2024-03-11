import { useState,useEffect } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../components/Input/InputText'
import ErrorText from '../../components/Typography/ErrorText'
import { showNotification } from "../common/headerSlice"

import { useGetPDVsQuery,useGetPdvDetailsQuery,useUpdatePdvMutation } from "../../slices/pointDeVenteApiSlice"



function UpdatePtvModal({closeModal,pdvId }){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [rhmanager, setrhmanager] = useState('');
    const { refetch: refetchPdv } = useGetPDVsQuery();
    const {
      data: pdv,
      isLoading,
      refetch,
      error,
    } = useGetPdvDetailsQuery(pdvId);
    const [updatePdv, { isLoading: loadingUpdate }] =
    useUpdatePdvMutation();
    
    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        await updatePdv({
          pdvId,
          name,
          address,
          rhmanager,
          
        });
        await refetchPdv();
        refetch();
        if (!errorMessage) { // Only dispatch success notification if there's no error message
          dispatch(showNotification({ message: " Point de vente Modifié !!", status: 1 }));
      }
      } catch (err) {
         
        setErrorMessage(err?.data?.message || err.error);
        
      }
    };
    useEffect(() => {
      if (pdv) {
        setName(pdv.name);
        setAddress(pdv.address);
        setrhmanager(pdv.rhmanager);
        
      }
    }, [pdv]);

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
                <button  type="submit" className={"btn btn-primary px-6"} >Modifier</button>
            </div>
            
</form>


<ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
        </>
    )
}
export default UpdatePtvModal