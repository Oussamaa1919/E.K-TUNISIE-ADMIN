import { useState,useEffect } from "react"
import { useDispatch } from "react-redux"
import ErrorText from '../../components/Typography/ErrorText'
import { showNotification } from "../common/headerSlice"

import { useGetProductsQuery,useGetProductDetailsQuery,useUpdateProductMutation } from "../../slices/productsApiSlice"



function UpdateProductModal({closeModal,productId }){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [Reference, setReference] = useState('');
    const [Image, setImage] = useState('');
    const [Libelle, setLibelle] = useState('');
    const [Categorie, setCategorie] = useState('');
    const [Montant, setMontant] = useState('');
    const [Quantite, setQuantite] = useState('');
    const [CategorieID, setCategorieID] = useState('');
    const [PtsFids, setPtsFids] = useState('');
    const [Prix, setPrix] = useState('');
   
    const { refetch: refetchProducts } = useGetProductsQuery();
    const {
      data: product,
      isLoading,
      refetch,
      error,
    } = useGetProductDetailsQuery(productId);
    const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
    
    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        await updateProduct({
            productId,
          Reference,
          Image,
          Libelle,
          Categorie,
          Montant,
          Quantite,
          CategorieID,
          PtsFids,
          Prix,
          
        });
        await refetchProducts();
        refetch();
        if (!errorMessage) { // Only dispatch success notification if there's no error message
          dispatch(showNotification({ message: " Produit Modifié !!", status: 1 }));
      }
      } catch (err) {
         
        setErrorMessage(err?.data?.message || err.error);
        
      }
    };
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
  };
    useEffect(() => {
      if (product) {
        setReference(product.Reference);
        setImage(product.Image);
        setLibelle(product.Libelle);
        setCategorie(product.Category);
        setMontant(product.Montant);
        setQuantite(product.Quantite);
        setPrix(product.Prix);
        setCategorieID(product.CategoryID);
        setPtsFids(product.PtsFids);
      }
    }, [product]);

    return(
        <>
<form onSubmit={submitHandler}  encType='multipart/form-data'>
            <div className="mb-4">
                <input 
                    type='text'
                    placeholder='* Reference'
                    value={Reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="input  input-bordered w-full mt-4"
                      
                />
                
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <input 
                        placeholder='* Image'
                        id="file-upload" 
                        accept="image/*" 
                        name="file-upload" 
                        type="file" 
                        onChange={handleImageChange}
                        required 
                        
                    />
                   
                </label>
            </div>
                <input 
                    type='text'
                    placeholder='* Libelle'
                    value={Libelle}
                    onChange={(e) => setLibelle(e.target.value)}
                    className="input  input-bordered w-full mt-4"
                      
                />
                <input 
                    type='text'
                    placeholder='* Categorie'
                    value={Categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                    className="input  input-bordered w-full mt-4"
                      
                />
                <input 
                    type='text'
                    placeholder='* Montant'
                    value={Montant}
                    onChange={(e) => setMontant(e.target.value)}
                    className="input  input-bordered w-full mt-4"
                      
                />
                <input 
                    type='text'
                    placeholder='* Quantite'
                    value={Quantite}
                    onChange={(e) => setQuantite(e.target.value)}
                    className="input  input-bordered w-full mt-4"
                      
                />
                <input 
                    type='text'
                    placeholder='* CategorieID'
                    value={CategorieID}
                    onChange={(e) => setCategorieID(e.target.value)}
                    className="input  input-bordered w-full mt-4"
                      
                />
                <input 
                    type='text'
                    placeholder='* PtsFids'
                    value={PtsFids}
                    onChange={(e) => setPtsFids(e.target.value)}
                    className="input  input-bordered w-full mt-4"
                      
                />
                <input 
                    type='text'
                    placeholder='* Prix'
                    value={Prix}
                    onChange={(e) => setPrix(e.target.value)}
                    className="input  input-bordered w-full mt-4"
                      
                />
            </div>
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Annuler</button>
                <button type="submit" className={"btn btn-primary px-6"} disabled={loading}>Ajouter</button>
            </div>
        </form>


<ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
        </>
    )
}
export default UpdateProductModal