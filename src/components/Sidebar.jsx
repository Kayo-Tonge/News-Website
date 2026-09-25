

export default function Sidebar(props) {
    return (
        <div className="sidebar-links">
            <button onClick={() => props.onCategoryChange('general')}>General</button>
            <button onClick={() => props.onCategoryChange('world')}>World</button>
            <button onClick={() => props.onCategoryChange('nation')}>Nation</button>
            <button onClick={() => props.onCategoryChange('business')}>Business</button>
            <button onClick={() => props.onCategoryChange('technology')}>Technology</button>
            <button onClick={() => props.onCategoryChange('entertainment')}>Entertainment</button>
            <button onClick={() => props.onCategoryChange('sports')}>Sports</button>
            <button onClick={() => props.onCategoryChange('science')}>Science</button>
            <button onClick={() => props.onCategoryChange('health')}>Health</button>
        </div>
    )
}