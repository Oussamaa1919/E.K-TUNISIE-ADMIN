

function InputText({labelTitle, labelStyle, type, containerStyle}){

    

    return(
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label>
            <input type={type || "text"}   className="input  input-bordered w-full " />
        </div>
    )
}


export default InputText 