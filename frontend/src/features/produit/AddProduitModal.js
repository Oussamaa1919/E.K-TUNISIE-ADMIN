import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../components/Input/InputText'
import ErrorText from '../../components/Typography/ErrorText'




function AddProduitModal({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")


    
    

    return(
        <>

            <InputText type="text"  updateType="name" containerStyle="mt-4" labelTitle="Reference" />

            <InputText type="text"  updateType="Discount" containerStyle="mt-4" labelTitle="Libelle" />

            <InputText type="text"  updateType="Nouveau Prix" containerStyle="mt-4" labelTitle="Categorie" />
            <InputText type="text"  updateType="Nouveau Prix" containerStyle="mt-4" labelTitle="Quantité" />
            <InputText type="text"  updateType="Nouveau Prix" containerStyle="mt-4" labelTitle="CatégorieID" />
            <InputText type="text"  updateType="Nouveau Prix" containerStyle="mt-4" labelTitle="PtsFids" />
            <InputText type="text"  updateType="Nouveau Prix" containerStyle="mt-4" labelTitle="Prix" />
            
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

export default AddProduitModal