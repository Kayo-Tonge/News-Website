import { Link } from "react-router-dom";



export default function Header (props){
    return (
        <>
        <header>
            <button className="hamburger-icon" onClick={props.sidebarClick}>
                <i className="fa-solid fa-bars"  style={{ color: "rgb(207, 213, 222)" }}></i>
            </button>
            <Link to="/">
                <img src="/logo.png" alt="logo" />
            </Link>
            <button className="search-button" onClick={props.overlayClick}>
            <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </header>
        </>
    )
}