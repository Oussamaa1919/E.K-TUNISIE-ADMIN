import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import { RECENT_PRODUITS } from "../../utils/dummyData"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../../components/Input/SearchBar"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import ArrowPath from '@heroicons/react/24/outline/ArrowPathIcon'
import Eye from '@heroicons/react/24/outline/EyeIcon'
import { openModal } from "../common/modalSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import { Link } from "react-router-dom"


const TopSideButtons = ({removeFilter, applyFilter, applySearch}) => {

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
            <button className="btn px-6 btn-sm normal-case btn-primary float-right ml-2"onClick={() => openAddNewTransModal()} >Ajouter Produit</button>
        
            <SearchBar searchText={searchText} styleClass="mr-4 " setSearchText={setSearchText}/>
            {filterParam != "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2"/></button>}
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                
                <label for="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span class="">Télécharger votre fichier</span>
                  <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                </label>
                
          </div>
        </div>
    )
}


function Produits(){


    const [trans, setTrans] = useState(RECENT_PRODUITS)

    const removeFilter = () => {
        setTrans(RECENT_PRODUITS)
    }

    const applyFilter = (params) => {
        let filteredTransactions = RECENT_PRODUITS.filter((t) => {return t.location == params})
        setTrans(filteredTransactions)
    }

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = RECENT_PRODUITS.filter((t) => {return t.name.toLowerCase().includes(value.toLowerCase()) ||  t.email.toLowerCase().includes(value.toLowerCase())})
        setTrans(filteredTransactions)
    }

    return(
        <>
            
            <TitleCard title="Points de vente" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter}/>}>
            
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
                            trans.map((l, k) => {
                                return(
                                    <tr key={k}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            
                                            <div>
                                                <div className="font-bold">{l.reference}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{l.libelle}</td>
                                    <td>{l.catégorie}</td>
                                    <td>{l.montant}</td>
                                    <td>{l.qunatite}</td>

                                    <td>{l.categorieId}</td>

                                    <td>{l.sldfid}</td>
                                    <td>{l.prix}</td>
                                    <td><button className="btn btn-square btn-ghost" ><TrashIcon className="w-5"/></button></td>

                                 <td><button className="btn btn-square btn-ghost" ><ArrowPath className="w-5"/></button></td>

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