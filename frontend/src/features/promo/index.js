import moment from "moment"
import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { deleteLead, getLeadsContent } from "./leadSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { showNotification } from '../common/headerSlice'
import ArrowPath from '@heroicons/react/24/outline/ArrowPathIcon'
import { RECENT_PROMOS } from "../../utils/dummyData"

const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewPromoModal = () => {
        dispatch(openModal({title : "Ajouter Promo", bodyType : MODAL_BODY_TYPES.PROMO_ADD_NEW}))
    }

    return(
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewPromoModal()}>Add New</button>
        </div>
    )
}

function Promo(){
    const [trans, setTrans] = useState(RECENT_PROMOS)

    const removeFilter = () => {
        setTrans(RECENT_PROMOS)
    }

    const applyFilter = (params) => {
        let filteredTransactions = RECENT_PROMOS.filter((t) => {return t.location == params})
        setTrans(filteredTransactions)
    }

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = RECENT_PROMOS.filter((t) => {return t.name.toLowerCase().includes(value.toLowerCase()) ||  t.email.toLowerCase().includes(value.toLowerCase())})
        setTrans(filteredTransactions)
    }

    return(
        <>
            
            <TitleCard title="PROMOS" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter}/>}>
            
                {/* Team Member list in table format loaded constant */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Discount</th>
                        <th>Date Debut</th>
                        <th>Date Fin</th>
                        <th>Nouveau Prix</th>
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
                                    <td>{l.discount}</td>
                                    <td>{l.date_debut}</td>
                                    <td>{l.date_fin}</td>

                                    <td>{l.Nouveau_Prix}</td>
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


export default Promo