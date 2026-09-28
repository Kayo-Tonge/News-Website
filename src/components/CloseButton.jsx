

export default function CloseButton (props){
    return (
        <button onClick={props.onClick} > 
            <i className="fa-solid fa-x"></i>
        </button> 
    )
}