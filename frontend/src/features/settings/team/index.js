import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import { openModal } from "../../common/modalSlice"
import ProfilePic from "../../../images/profile-picture.png"
import { useGetAdminsQuery,useDeleteMemberMutation } from "../../../slices/usersApiSlice"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'

import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../../utils/globalConstantUtil'
const TopSideButtons = () => {
    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({title : "Ajouter un membre", bodyType : MODAL_BODY_TYPES.MEMBRE_ADD_NEW}))
    }
    
    return(

        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary float-right ml-2"onClick={() => openAddNewLeadModal()} >Ajouter un Membre</button>
        </div>
    )
}





function Team(){
    
    

    const { data: users, refetch, isLoading, error } = useGetAdminsQuery();
    const [deleteMember] = useDeleteMemberMutation();
    const [errorMessage, setErrorMessage] = useState("")
    const deleteHandler = async (id) => {
        if (window.confirm('Continuez !')) {
          try {
            await deleteMember(id);
            refetch();
          } catch (err) {
            setErrorMessage(err?.data?.message || err.error);
          }
        }
      };

    return(
        <>
            
            <TitleCard title="Active Members" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

                {/* Team Member list in table format loaded constant */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>TYPE</th>
                        <th>Phone</th>
                    <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                           users && users.map((user) => {
                                return(
                                    <tr key={user._id}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-circle w-12 h-12">
                                                    <img src={ProfilePic} alt="Avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.firstname}  {user.lastname}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.type}</td>
                                    <td>{user.phone}</td>
                                    <td><button className="btn btn-square btn-ghost" onClick={() => deleteHandler(user._id)} ><TrashIcon className="w-5"/></button></td>

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


export default Team