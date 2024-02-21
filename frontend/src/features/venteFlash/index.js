import moment from "moment"
import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { showNotification } from '../common/headerSlice'
import ArrowPath from '@heroicons/react/24/outline/ArrowPathIcon'
import { RECENT_VENTE_FLASH } from "../../utils/dummyData"

const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({title : "Ajouter Vente Flash", bodyType : MODAL_BODY_TYPES.VENTE_FLASH_ADD_NEW}))
    }

    return(
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
        </div>
    )
}

function Leads(){
    const [trans, setTrans] = useState(RECENT_VENTE_FLASH)

    const removeFilter = () => {
        setTrans(RECENT_VENTE_FLASH)
    }

    const applyFilter = (params) => {
        let filteredTransactions = RECENT_VENTE_FLASH.filter((t) => {return t.location == params})
        setTrans(filteredTransactions)
    }

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = RECENT_VENTE_FLASH.filter((t) => {return t.name.toLowerCase().includes(value.toLowerCase()) ||  t.email.toLowerCase().includes(value.toLowerCase())})
        setTrans(filteredTransactions)
    }

    return(
        <>
            
            <TitleCard title="Vente Flash " topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter}/>}>
            
                {/* Team Member list in table format loaded constant */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Titre</th>
                        <th>DUREE</th>
                        <th>PRIX</th>
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
                                                <div className="font-bold">{l.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{l.duree}</td>
                                    
                                    <td>{l.Prix}</td>

                                
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


export default Leads