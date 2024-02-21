import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { Link } from "react-router-dom"
import ProfilePic from "../../images/profile-picture.png"
import { useGetClientsQuery } from "../../slices/clientsApiSlice"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import Eye from '@heroicons/react/24/outline/EyeIcon'


function Client(){
    
    

    const { data: clients, refetch, isLoading, error } = useGetClientsQuery();
    
    const [errorMessage, setErrorMessage] = useState("")
    

    return(
        <>
            
            <TitleCard title="Client" topMargin="mt-2" >

                {/* Team Member list in table format loaded constant */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email </th>
                        <th>Vérifié</th>
                        <th>Phone</th>
                        <th>Date De Naissance</th>
                        <th>Date D'inscription</th>
                        <th>Historique</th>
                    <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                           clients && clients.map((client) => {
                                return(
                                    <tr key={client._id}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-circle w-12 h-12">
                                                    <img src={ProfilePic} alt="Avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{client.firstname}  {client.lastname}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{client.email}</td>
                                    <td>{client.verified ? "oui" : "non"}</td>
                                    <td>{client.phone}</td>
                                    <td>{moment(client.dateofbirth).format('YYYY-MM-DD')}</td>
                                    <td>{moment(client.date).format('YYYY-MM-DD')}</td>
                                    <td><Link to="/app/historique"><button className="btn btn-square btn-ghost" ><Eye className="w-5"/></button></Link></td>
                                    <td><button className="btn btn-square btn-ghost"  ><TrashIcon className="w-5"/></button></td>

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


export default Client