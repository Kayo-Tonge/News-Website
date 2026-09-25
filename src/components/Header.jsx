

export default function Header (props){
    return (
        <header>
            <button className="hamburger-icon">
                <i class="fa-solid fa-bars" style="color: rgb(207, 213, 222);"></i>
            </button>
            <button className="search-button" onClick={props}>
            <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        </header>
    )
}