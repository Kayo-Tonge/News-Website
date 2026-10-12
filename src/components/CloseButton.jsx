

export default function CloseButton (props){
    return (
       
        <button onClick={(event) => {
            props.onClick && props.onClick(event);
            props.onClose && props.onClose(event);
        }}>
        <i className="fa-solid fa-x"></i>
        </button>
    )
}