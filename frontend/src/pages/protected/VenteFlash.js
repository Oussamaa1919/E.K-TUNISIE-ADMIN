import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Venteflash from '../../features/venteFlash'

function VenteFlash(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Vente Flash"}))
      }, [])


    return(
        <Venteflash />
    )
}

export default VenteFlash