import { useState, } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { useAddMemberMutation,useGetAdminsQuery } from "../../../slices/usersApiSlice"
import { showNotification } from "../../common/headerSlice"

function AddMembreModalBody({closeModal}){
    
    
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("")

    const dispatch = useDispatch()
   

    const [addMember, isLoading ,refetch] = useAddMemberMutation();
    const { refetch: refetchUsers } = useGetAdminsQuery();
    const submitHandler = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
         
          setErrorMessage('Les mots de passe ne correspondent pas');
        } else {
          try {
             await addMember({phone,email,firstname,lastname,password });
             await refetchUsers();
             if (!errorMessage) { // Only dispatch success notification if there's no error message
                dispatch(showNotification({ message: "Nouvel utilisateur ajouté !!", status: 1 }));
            }
          } catch (err) {
         
            setErrorMessage(err?.data?.message || err.error);
            
          }
        }
      };



    
    

    return(
        <>

<form onSubmit={submitHandler}>

<div className="mb-4">

    <input  type='email'
            placeholder='* Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input  input-bordered w-full mt-4"
           />
           <input  type='phone'
            placeholder='* Phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input  input-bordered w-full mt-4"
           />
            <input  type='fisrtname'
            placeholder='* Firstname'
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="input  input-bordered w-full mt-4"
           />
           <input  type='lastname'
            placeholder='* Lastname'
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="input  input-bordered w-full mt-4"
           />
           
    <input  type='password'
    
            placeholder='* Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input  input-bordered w-full mt-4"/>
    
    <input  type='password'
    
    placeholder='* Confirmez le mot de passe'
    value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
    className="input  input-bordered w-full mt-4"/>

</div>




<div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Annuler</button>
                <button  type="submit" className={"btn btn-primary px-6"} >Ajouter</button>
            </div>
            
</form>


<ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
        </>
    )
}

export default AddMembreModalBody