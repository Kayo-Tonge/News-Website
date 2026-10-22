import { Link } from "react-router-dom";

export default function Header(props) {
    return (
        <header className="site-header">
            <button
                className="icon-btn icon-left"
                onClick={props.sidebarClick}
                aria-label={props.sidebarOpen ? "Close menu" : "Open menu"}
                aria-expanded={props.sidebarOpen}
            >
                <i
                    className={props.sidebarOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
                    aria-hidden="true"
                ></i>
            </button>

            <Link to="/" className="logo">
                <img src={`${import.meta.env.BASE_URL}logo.png`} alt="NewsHub" />
            </Link>

            <button
                className="icon-btn icon-right"
                onClick={props.overlayClick}
                aria-label="Search"
            >
                <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            </button>
        </header>
    );
}