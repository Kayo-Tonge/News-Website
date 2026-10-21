import useNews from "../hooks/useNews.jsx"
import { useParams } from "react-router-dom";
import Header from "../components/Header.jsx"
import Sidebar from '../components/Sidebar.jsx'
import SearchOverlay from '../components/SearchOverlay.jsx'
import usePagination from "../hooks/usePagination.jsx";
import LoadMoreButton from "../components/LoadMoreButton.jsx"
import useDuplicateChecker from "../hooks/useDuplicateChecker.jsx"


export default function Category (props){
    const { category } = useParams();
    const { articles, isLoading, showError, setPage } = useNews(category)
    console.log("Category:", category);
console.log("Loading:", isLoading);
console.log("Error:", showError);
console.log("Articles:", articles.length);
    
    const { handleClickMore } = usePagination(setPage)
    const { hasNotDuplicateId } = useDuplicateChecker()
    

    function handleClose() {
    props.closeOverlayClick();
    
    }
   
    if (isLoading){
        return <div>Loading...</div>
    }

    if (showError){
        return <div>Something went wrong...</div>
    }

    const categoryArticles = articles.filter(article => {
       return hasNotDuplicateId(article)
    }).map(article => {
        return <article key={article.id} className="cat-article"> 
            <a href={article.url}>
                <img src={article.image} alt={article.title}/>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">{article.description}</p>
                <p className="source">{article.source.name}</p>
            </a>
            
        </article>
        
    });
    
    
    return (
        <>  
            <Header overlayClick={props.overlayClick} sidebarClick={props.sidebarClick} sidebarOpen={props.sidebarOpen}/>
            {props.searchOpen && <SearchOverlay isLoading={props.isLoading} latestArticles={props.latestArticles} closeOverlayClick={props.closeOverlayClick} query={props.query} setQuery={props.setQuery} onClose={handleClose} category={category}/> }
            {props.sidebarOpen ? <Sidebar closeSidebarClick={props.closeSidebarClick} setQuery={props.setQuery}/> : null}
            
                <main className="category-page">
                    <h1 className="category-header">{(props.searchOpen && props.query !== "") ? null : category}</h1>
                    <div className="cat-grid">
                        {categoryArticles}
                    </div>
                    {(articles.length >= 10 && category ) ? <LoadMoreButton clickMore={handleClickMore} /> : null}
                </main>
            
               
            
            
            
            
        </>
        
    )
    
}