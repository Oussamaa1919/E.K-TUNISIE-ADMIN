import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Calcul from '../../features/calcul'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Calcul"}))
      }, [])


    return(
        <Calcul />
    )
}

export default InternalPage