import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import PointDeVente from '../../features/pointsdevente'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Points de Vente"}))
      }, [])


    return(
        <PointDeVente />
    )
}

export default InternalPage