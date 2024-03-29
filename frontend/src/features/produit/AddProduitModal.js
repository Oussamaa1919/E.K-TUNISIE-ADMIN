import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../components/Input/InputText'
import ErrorText from '../../components/Typography/ErrorText'
import { showNotification } from "../common/headerSlice"
import { useAddProdcutMutation ,useGetProductsQuery} from "../../slices/productsApiSlice"




function AddProduitModal({closeModal}){
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
    const [addProdcut, isLoading ,refetch] = useAddProdcutMutation();
    const { refetch: refetchProducts } = useGetProductsQuery();
    const [selectedImage, setSelectedImage] = useState(null);

    const labelContent = selectedImage ? 'Image Selected' : 'Choose Image';
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Image', Image);
        formData.append('Reference', Reference);
        formData.append('Libelle', Libelle);
        formData.append('Categorie', Categorie);
        formData.append('Montant', Montant);
        formData.append('Quantite', Quantite);
        formData.append('CategorieID', CategorieID);
        formData.append('PtsFids', PtsFids);
        formData.append('Prix', Prix);

        try {
            setLoading(true);
            const response = await addProdcut(formData).unwrap();
            await refetchProducts();
            closeModal();
            console.log(formData)
            if (response.error) {
                setErrorMessage(response.error?.data?.message || response.error);
                
            } else {
                // Product added successfully
                closeModal();
                refetch();
                dispatch(showNotification("Product added successfully", "success"));
            }
        } catch (error) {
            setErrorMessage(error?.data?.message || error);
            
        } finally {
            setLoading(false);
        }
    };
    

    return(
        <>

<form onSubmit={handleSubmit}  encType='multipart/form-data'>
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
            
        </>
    )
}

export default AddProduitModal