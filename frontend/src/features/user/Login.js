import {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LandingIntro from './LandingIntro'
import ErrorText from  '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import { useLoginMutation } from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { setCredentials } from '../../slices/authSlice';
function Login(){

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const jwtCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('jwt='));
  
  useEffect(() => {
    if (userInfo) {
      navigate('/app/dashboard');

      
    }
  }, [navigate, userInfo]);

 
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (jwtCookie) {
        console.log('JWT token cookie:', jwtCookie);
      } else {
        console.log('JWT token cookie not found.');
      }
      const res = await login({ email, password }).unwrap();
      
      dispatch(setCredentials({ ...res }));
     
      navigate('/app/welcome');
      
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
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Connexion</h2>
                    <form onSubmit={submitHandler}>

                        <div className="mb-4">

                            <input  type='email'
                                    placeholder='* Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input  input-bordered w-full mt-4"
                                   />
                                   
                            <input  type='password'
                            
                                    placeholder='* Mot De Passe'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input  input-bordered w-full mt-4"/>

                        </div>

                     

                        
                        <button type="submit" className={"btn mt-2 w-full btn-primary" + (isLoading ? " loading" : "")}>Connexion</button>

                    </form>
                    <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Mot de passe oublié?</span></Link>
                        </div>
                        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>


                </div>
            </div>
            </div>
        </div>
    )
}

export default Login