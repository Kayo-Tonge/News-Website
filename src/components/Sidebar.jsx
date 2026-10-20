import { useNavigate } from 'react-router-dom';

const categories = [
    "general", "world", "nation", "business", "technology",
    "entertainment", "sports", "science", "health"
];

export default function Sidebar(props) {
    const navigate = useNavigate(); //we set the category state to a new value. we retrieve the category from useNews, which is responsible for retrieving the gNews api data and re-rendered based on the category the user chooses

    function onCategoryChange(newCategory) {
        props.closeSidebarClick();
        props.setQuery("");
        navigate(`/category/${newCategory}`);
    }

    return (
        <>
            <div className="sidebar-backdrop" onClick={props.closeSidebarClick} />
            <nav className="sidebar" aria-label="Categories">
                {categories.map(category => (
                    <button key={category} onClick={() => onCategoryChange(category)}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </nav>
        </>
    );
}