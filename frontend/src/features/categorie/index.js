import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import { pointdeventes } from "../../utils/dummyData"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../../components/Input/SearchBar"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import ArrowPath from '@heroicons/react/24/outline/ArrowPathIcon'
import Eye from '@heroicons/react/24/outline/EyeIcon'
import { openModal } from "../common/modalSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import { Link } from "react-router-dom"
import { useGetCategoriesQuery,useDeleteCategorieMutation } from "../../slices/categoriesApiSlice"
import LogoPic from "../../images/logoerickayser.png"


const TopSideButtons = ({removeFilter, applyFilter, applySearch}) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")

    

    const removeAppliedFilter = () => {
     
     
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
        dispatch(openModal({title : "Ajouter Categorie", bodyType : MODAL_BODY_TYPES.CATEGORIE_ADD}))
    }
  
    
    return(

        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary float-right ml-2"onClick={() => openAddNewTransModal()} >Ajouter</button>
        
            <SearchBar searchText={searchText} styleClass="mr-4 " setSearchText={setSearchText}/>
            
        </div>
    )
}


function Categorie(){
    const dispatch = useDispatch()

    
    const { data: categories, refetch, isLoading, error } = useGetCategoriesQuery();
    const [deleteCategorie] = useDeleteCategorieMutation();
    const [errorMessage, setErrorMessage] = useState("")

    const deleteHandler = async (id) => {
        if (window.confirm('Continuez !')) {
          try {
            await deleteCategorie(id);
            refetch();
          } catch (err) {
            setErrorMessage(err?.data?.message || err.error);
          }
        }
      };
    const [trans, setTrans] = useState([]);

    useEffect(() => {
        if (categories) {
            setTrans(categories);
        }
    }, [categories]);
    if (!trans) {
        return <div>Loading...</div>;
    }

    const removeFilter = () => {
      setTrans(categories)
  }

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = categories.filter((t) => {return t.nom.toLowerCase().includes(value.toLowerCase())})
        setTrans(filteredTransactions)
    }

    return(
        <>
            
            <TitleCard title="Points de vente" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} />}>
            
                {/* Team Member list in table format loaded constant */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                    <th>Categorie_Id</th>
                        <th>Nom</th>
                       
                        <th>Pourcentage</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                           trans.map((catt) => {
                            return(
                                <tr key={catt._id}>
                                   <td>{catt.categorieId}</td>
                                <td>
                              
                                            <div className="font-bold">{catt.nom} </div>
                                  
                                </td>
                                   
                                   
                                    <td>{catt.pourcentage} %</td>
                                    <td><button className="btn btn-square btn-ghost" onClick={() => deleteHandler(catt._id)}><TrashIcon className="w-5"/></button></td>

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


export default Categorie