

export default function LoadMoreButton (props){
    return (
         <div className="load-more-wrapper">
            <button 
                onClick={props.clickMore}
                type="button"
                className="load-more-btn"
            >Load More</button>
        </div>
    )
} 