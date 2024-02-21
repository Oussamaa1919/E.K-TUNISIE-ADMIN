import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from  '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import CheckCircleIcon  from '@heroicons/react/24/solid/CheckCircleIcon'
import { useSendPasswordMutation } from '../../slices/usersApiSlice'
import { showNotification } from '../common/headerSlice'
import { useDispatch } from 'react-redux';

function ForgotPassword(){
    const [errorMessage, setErrorMessage] = useState("")
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [sendPassword, { isLoading }] = useSendPasswordMutation();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if(email.trim() === "")return setErrorMessage("Email is required! ")
            else{
            await sendPassword({ email});
            setErrorMessage('mot de passe envoyé');
            }   
        } catch (err) {
          setErrorMessage(err?.data?.message || err.error);
         
        }
      };
    

    
    

    

    

    
    return(
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className=''>
                        <LandingIntro />
                </div>
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Mot de passe oublié !</h2>

                    <form onSubmit={submitHandler}>

                        <div className="mb-4">

                            <input  type='email'
                                    placeholder='* email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input  input-bordered w-full mt-4"
                                   />
                                   
                            

                        </div>

                     

                        
                        <button type="submit" className={"btn mt-2 w-full btn-primary" + (isLoading ? " loading" : "")}>Envoyer</button>
                        <div className='text-right text-primary'><Link to="/login"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">retour à la connexion</span></Link></div>

                        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                    </form>
                    
                </div>
            </div>
            </div>
        </div>
    )
}

export default ForgotPassword