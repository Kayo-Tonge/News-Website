

export default function SearchOverlay (props){
    return (
        <div className="overlay-container">
            <input type="text" placeholder="Search" />
			<button onClick={props.onClick}><i class="fa-solid fa-x"></i></button>
            <section className="latest-news">
                <h3>Latest News</h3>
                
            </section>
        </div>
    )
}