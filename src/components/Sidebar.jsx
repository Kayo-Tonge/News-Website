import CloseButton from './CloseButton.jsx'
import { useNavigate } from 'react-router-dom';

export default function Sidebar(props) {
    const navigate = useNavigate(); //we set the category state to a new value. we retrieve the category from useNews, which is responsible for retrieving the gNews api data and re-rendered based on the category the user chooses
        //setCategory(newCategory) remember to use this
    function onCategoryChange(newCategory) {
        props.closeSidebarClick();
        navigate(`/category/${newCategory}`); 
        
    }
    return (
        <>
            <div className="sidebar-header">
                <CloseButton onClick={props.closeSidebarClick} />
            </div>
            <div className="sidebar-links">
                <button onClick={() => onCategoryChange('general')}>General</button>
                <button onClick={() => onCategoryChange('world')}>World</button>
                <button onClick={() => onCategoryChange('nation')}>Nation</button>
                <button onClick={() => onCategoryChange('business')}>Business</button>
                <button onClick={() => onCategoryChange('technology')}>Technology</button>
                <button onClick={() => onCategoryChange('entertainment')}>Entertainment</button>
                <button onClick={() => onCategoryChange('sports')}>Sports</button>
                <button onClick={() => onCategoryChange('science')}>Science</button>
                <button onClick={() => onCategoryChange('health')}>Health</button>
            </div>
        </>
    )
}