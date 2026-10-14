

export default function CloseButton (props){
    return (
       
        <button onClick={(event) => {
            props.onClick && props.onClick(event);
            props.onClose && props.onClose(event);
        }}
        className={props.className}>
        <i className="fa-solid fa-x"></i>
        </button>
    )
}