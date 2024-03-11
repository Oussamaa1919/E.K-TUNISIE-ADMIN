import TitleCard from '../../components/Cards/TitleCard';
import { showNotification } from '../common/headerSlice';
import { useState,useEffect } from "react"
import { useDispatch } from "react-redux"
import {useGetCalculQuery,useUpdateCalculMutation } from "../../slices/calculApiSlice"
import ErrorText from '../../components/Typography/ErrorText'



function Calcul() {
    const dispatch = useDispatch()

    const [cac, setCac] = useState('');
    const [bonAchat, setBonAchat] = useState('');
    const [cpoint, setCpoint] = useState('');
    const [errorMessage, setErrorMessage] = useState("")

    const { data: calcul, refetch, isLoading, error } = useGetCalculQuery();
    const [updateCalcul] = useUpdateCalculMutation();
    useEffect(() => {
        if (calcul) {
          setCac(calcul.cac);
          setBonAchat(calcul.bonAchat);
          setCpoint(calcul.cpoint);
          
        }
      }, [calcul]);


      const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response=  await updateCalcul({cac,bonAchat, });
            if (response.error) {
                setErrorMessage(response.error?.data?.message || response.error);
                
            }
            else {
          await refetch();
         
        
            dispatch(showNotification({ message: " C_point Modifié !!", status: 1 }));
            }
        } catch (err) {
            setErrorMessage(err?.data?.message || err.error);
          
          
        }
      };



  return (
    <>
      <TitleCard title=' C_POINT CALCUL ' topMargin='mt-2'>
        <form onSubmit={submitHandler}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
           
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text text-base-content' >
                Chiffre d’affaire par client (cac)
                </span>
              </label>
              <input
              value={cac}
                type= 'text'
                className='input  input-bordered w-full '
                onChange={(e) => setCac(e.target.value)}
              />
            </div>

             <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text text-base-content' >
                  Bon_Achat
                </span>
              </label>
              <input
              value={bonAchat}
              onChange={(e) => setBonAchat(e.target.value)}
                type= 'text'
                className='input  input-bordered w-full '
              />
            </div>
            
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text text-base-content' >
                 C_point
                </span>
              </label>
              <input
                type= 'text'
                value={cpoint}
                className='input  input-bordered w-full '
                disabled
              />
            </div>


          </div>
          
          <div className='mt-10'>
          <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <button className='btn btn-primary float-right'>Calculer</button>
          </div>
        </form>

      </TitleCard>
    </>
  );
}

export default Calcul;
