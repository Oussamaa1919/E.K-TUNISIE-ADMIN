import { useEffect } from 'react'
import { MODAL_BODY_TYPES } from '../utils/globalConstantUtil'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../features/common/modalSlice'
import AddPromoModalBody from '../features/promo/components/AddPromoModalBody'
import AddVenteFlashModal from '../features/venteFlash/AddVenteFlashModal'
import ConfirmationModalBody from '../features/common/components/ConfirmationModalBody'
import AddptventeModal from '../features/pointsdevente/AddptventeModal'
import AddPuclicitéModalBody from '../features/publicité/AddPuclicitéModalBody'
import AddMembreModalBody from '../features/settings/team/AddMembreModalBody'
import AddProduitModal from '../features/produit/AddProduitModal'
function ModalLayout(){


    const {isOpen, bodyType, size, extraObject, title} = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const close = (e) => {
        dispatch(closeModal(e))
    }



    return(
        <>
        {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className={`modal-box  ${size === 'lg' ? 'max-w-5xl' : ''}`}>
                <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => close()}>✕</button>
                <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>


                {/* Loading modal body according to different modal type */}
                {
                    {        [MODAL_BODY_TYPES.TRANSACTION_ADD_NEW] : <AddptventeModal closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.PUBLICITE_ADD_NEW] : <AddPuclicitéModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.MEMBRE_ADD_NEW] : <AddMembreModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.PROMO_ADD_NEW] : <AddPromoModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.VENTE_FLASH_ADD_NEW] : <AddVenteFlashModal closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.PRODUIT_ADD_NEW] : <AddProduitModal closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.CONFIRMATION] : <ConfirmationModalBody extraObject={extraObject} closeModal={close}/>,
                             [MODAL_BODY_TYPES.DEFAULT] : <div></div>
                    }[bodyType]
                }
            </div>
            </div>
            </>
    )
}

export default ModalLayout