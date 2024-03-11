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
import { useGetPDVsQuery,useDeletePDVMutation } from "../../slices/pointDeVenteApiSlice"
import LogoPic from "../../images/logoerickayser.png"


const TopSideButtons = ({removeFilter, applyFilter, applySearch}) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")
    const locationFilters = ["Tunis", "Marsa", "Carthage", "Ben Arouss"]

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
        dispatch(openModal({title : "Ajouter un nouveau Point de vente", bodyType : MODAL_BODY_TYPES.TRANSACTION_ADD_NEW}))
    }
  
    
    return(

        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary float-right ml-2"onClick={() => openAddNewTransModal()} >Ajouter</button>
        
            <SearchBar searchText={searchText} styleClass="mr-4 " setSearchText={setSearchText}/>
            {filterParam != "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2"/></button>}
            <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-sm btn-outline"><FunnelIcon className="w-5 mr-2"/>Filter</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
                    {
                        locationFilters.map((l, k) => {
                            return  <li key={k}><a onClick={() => showFiltersAndApply(l)}>{l}</a></li>
                        })
                    }
                    <div className="divider mt-0 mb-0"></div>
                    <li><a onClick={() => removeAppliedFilter()}>Remove Filter</a></li>
                </ul>
            </div>
        </div>
    )
}


function PointDeVente(){
    const dispatch = useDispatch()

    const openUpdatePdvModal = (pdvId) => {

        dispatch(openModal({title : "Modifier Point de vente", bodyType : MODAL_BODY_TYPES.PDV_UPDATE,extraObject: { pdvId } }))
    }
    const { data: pointdeventes, refetch, isLoading, error } = useGetPDVsQuery();
    const [deletePdv] = useDeletePDVMutation();
    const [errorMessage, setErrorMessage] = useState("")

    const deleteHandler = async (id) => {
        if (window.confirm('Continuez !')) {
          try {
            await deletePdv(id);
            refetch();
          } catch (err) {
            setErrorMessage(err?.data?.message || err.error);
          }
        }
      };
    const [trans, setTrans] = useState([]);

    useEffect(() => {
        if (pointdeventes) {
            setTrans(pointdeventes);
        }
    }, [pointdeventes]);
    if (!trans) {
        return <div>Loading...</div>;
    }

    const removeFilter = () => {
        setTrans(pointdeventes)
    }

    const applyFilter = (params) => {
        let filteredTransactions = pointdeventes.filter((t) => {return t.address == params})
        setTrans(filteredTransactions)
    }

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = pointdeventes.filter((t) => {return t.name.toLowerCase().includes(value.toLowerCase())})
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
                        <th>Name</th>
                        <th>RH Manager</th>
                       
                        <th>Location</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                           trans.map((pdv) => {
                            return(
                                <tr key={pdv._id}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-circle w-12 h-12">
                                                <img src={LogoPic} alt="Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{pdv.name} </div>
                                        </div>
                                    </div>
                                </td>
                                    <td>{pdv.rhmanager}</td>
                                   
                                    <td>{pdv.address}</td>
                                    <td><button className="btn btn-square btn-ghost" onClick={() => deleteHandler(pdv._id)}><TrashIcon className="w-5"/></button></td>

                                 <td><button className="btn btn-square btn-ghost" onClick={() => openUpdatePdvModal(pdv._id)}><ArrowPath className="w-5"/></button></td>

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


export default PointDeVente