import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Publicité from '../../features/publicité'

function InternalPage(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Publicités"}))
      }, [])
      
    return(
        <Publicité />
    )
}

export default InternalPage