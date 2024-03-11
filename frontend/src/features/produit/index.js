import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../../components/Input/SearchBar"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import ArrowPath from '@heroicons/react/24/outline/ArrowPathIcon'
import { openModal } from "../common/modalSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import { useGetProductsQuery,useDeleteProdcutMutation,useUploadProdcutListMutation} from "../../slices/productsApiSlice"
import { showNotification } from "../common/headerSlice"


const TopSideButtons = ({removeFilter, applyFilter, applySearch}) => {
    const { data: produits, refetch, isLoading, error } = useGetProductsQuery();
    const [errorMessage, setErrorMessage] = useState("")
    const [uploadProdcutList] = useUploadProdcutListMutation();
    const [file, setFile] = useState('');
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
       

        try {
            
            const response = await uploadProdcutList(formData).unwrap();
            await refetch();
            setFile('');
            if (response.error) {
                setErrorMessage(response.error?.data?.message || response.error);
                
            } else {
                // Product added successfully
                dispatch(showNotification("Products added successfully", "success"));
            }
        } catch (error) {
            setErrorMessage(error?.data?.message || error);
            
        } 
    };

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")
    const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"]

    const showFiltersAndApply = (params) => {
        applyFilter(params)
        setFilterParam(params)
    }

    const removeAppliedFilter = () => {
        removeFilter()
        setFilterParam("")
        setSearchText("")
    }

    useEffect(() => {
        if(searchText == ""){
            removeAppliedFilter()
        }else{
            applySearch(searchText)
        }
    }, [searchText])
    
    const dispatch = useDispatch()

    const openAddNewTransModal = () => {
        dispatch(openModal({title : "Ajouter un nouveau Produit", bodyType : MODAL_BODY_TYPES.PRODUIT_ADD_NEW}))
    }
    
    return(

        <div className="inline-block float-right">
                        <button className="btn px-6 btn-sm normal-case btn-primary float-right ml-2" onClick={handleSubmit}>Upload</button>

            <button className="btn px-6 btn-sm normal-case btn-primary float-right ml-2"onClick={() => openAddNewTransModal()} >Ajouter Produit</button>

            <SearchBar searchText={searchText} styleClass="mr-4 " setSearchText={setSearchText}/>
            {filterParam != "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2"/></button>}
            
            <form>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <input 
                        placeholder='* File'
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        onChange={handleFileChange}

                        required 
                        
                    />
                   
                </label>
            </div>
            
          </form>
        </div>
    )
}


function Produits(){

    const openUpdateProdcutModal = (productId) => {
        dispatch(openModal({title : "Modifier Produit", bodyType : MODAL_BODY_TYPES.PRODUCT_UPDATE,extraObject: { productId } }))
    }


    const dispatch = useDispatch()
    const { data: produits, refetch, isLoading, error } = useGetProductsQuery();
    const [deleteProdcut] = useDeleteProdcutMutation();
    const [errorMessage, setErrorMessage] = useState("")
    const deleteHandler = async (id) => {
        if (window.confirm('Continuez !')) {
          try {
            await deleteProdcut(id);
            refetch();
          } catch (err) {
            setErrorMessage(err?.data?.message || err.error);
          }
        }
      };
      const [trans, setTrans] = useState([]);
      useEffect(() => {
        if (produits) {
            setTrans(produits);
        }
    }, [produits]);
    if (!trans) {
        return <div>Loading...</div>;
    }
    const removeFilter = () => {
        setTrans(produits)
    }

    

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = produits.filter((t) => {return t.Libelle.toLowerCase().includes(value.toLowerCase()) })
        setTrans(filteredTransactions)
    }

    return(
        <>
            
            <TitleCard title="Produits" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch}  removeFilter={removeFilter}/>}>
            
                {/* Team Member list in table format loaded constant */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Reference</th>
                        <th>Libelle</th>
                        <th>Categorie</th>
                        <th>Montant</th>
                        <th>Quantité</th>
                        <th>CatégorieID</th>
                        <th>PtsFids</th>
                        <th>Prix</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            trans.map((l) => {
                                return(
                                    <tr key={l._id}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            
                                            <div>
                                                <div className="font-bold">{l.Reference}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{l.Libelle}</td>
                                    <td>{l.Categorie}</td>
                                    <td>{l.Montant}</td>
                                    <td>{l.Quantite}</td>

                                    <td>{l.CategorieID}</td>

                                    <td>{l.PtsFids}</td>
                                    <td>{l.Prix}</td>
                                    <td><button className="btn btn-square btn-ghost" onClick={() => deleteHandler(l._id)}><TrashIcon className="w-5"/></button></td>

                                 <td><button className="btn btn-square btn-ghost" onClick={() => openUpdateProdcutModal(l._id)}><ArrowPath className="w-5"/></button></td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            </TitleCard>
        </>
    )
}


export default Produits