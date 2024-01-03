import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import InputText from '../../../components/Input/InputText'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ToogleInput from '../../../components/Input/ToogleInput'

function ProfileSettings(){


    const dispatch = useDispatch()

    // Call API to update profile settings changes
    const updateProfile = () => {
        dispatch(showNotification({message : "Profile Updated", status : 1}))    
    }

    const updateFormValue = ({updateType, value}) => {
        console.log(updateType)
    }

    return(
        <>
            
            <TitleCard title="Profile Settings" topMargin="mt-2">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Firstname" defaultValue="" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="LastName" defaultValue="" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Email" defaultValue="" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Phone" defaultValue="" updateFormValue={updateFormValue}/>

                </div>
                <div className="flex justify-end mt-4"><button className="btn btn-primary float-right" onClick={() => updateProfile()}>Update</button></div>

                <div className="divider mt-12" ></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Current Password" defaultValue="" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="New Password" defaultValue="" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Confirm Password" defaultValue="" updateFormValue={updateFormValue}/>

                </div>

                <div className="mt-10"><button className="btn btn-primary float-right" onClick={() => updateProfile()}>Update</button></div>
            </TitleCard>
        </>
    )
}


export default ProfileSettings