export default function InputBox({label, placeholder, onChange, type}){
    return(
        <div className="flex flex-col m-1">
            <label className="">{label}</label>
            <input type={type} onChange={onChange} className="border border-gray-300 p-1 rounded-md" placeholder={placeholder}></input>
        </div>
    )
}