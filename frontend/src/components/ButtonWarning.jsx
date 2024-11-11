import {Link} from "react-router-dom"

export default function ButtonWarning({label, buttonText, to}){
    return(
        <div className="flex justify-center">
            <div className="mr-1">
                {label}
            </div>
            <Link className="pointer underline cursor-pointer" to={to}>
                {buttonText}
            </Link>
        </div>
    )
}