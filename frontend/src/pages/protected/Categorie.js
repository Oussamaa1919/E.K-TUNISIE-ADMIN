import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Categorie from '../../features/categorie'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Categorie"}))
      }, [])


    return(
        <Categorie />
    )
}

export default InternalPage