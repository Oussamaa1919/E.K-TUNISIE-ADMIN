import { useState } from "react"
import { useDispatch } from "react-redux"
import ErrorText from '../../components/Typography/ErrorText'
import { showNotification } from "../common/headerSlice"

import { useAddCategorieMutation,useGetCategoriesQuery } from "../../slices/categoriesApiSlice"



function AddCategorieModal({closeModal}){
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState("")
    const [nom, setNom] = useState('');
    const [categorieId, setCategorieId] = useState('');
    const [pourcentage, setPourcentage] = useState('');
    const [addCategorie] = useAddCategorieMutation();
    const { refetch: refetchCategories } = useGetCategoriesQuery();
    
    const submitHandler = async (e) => {
        e.preventDefault();
    
        
          try {
             await addCategorie({nom,categorieId,pourcentage });
             await refetchCategories();
             if (!errorMessage) { // Only dispatch success notification if there's no error message
                dispatch(showNotification({ message: "Categorie ajouté !!", status: 1 }));
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
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="input  input-bordered w-full mt-4"
           />
           <input  type='CatgegorieId'
            placeholder='* Categorie_Id'
            value={categorieId}
            onChange={(e) => setCategorieId(e.target.value)}
            className="input  input-bordered w-full mt-4"
           />
            <input  type='pourcentage'
            placeholder='* pourcentage'
            value={pourcentage}
            onChange={(e) => setPourcentage(e.target.value)}
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
export default AddCategorieModal