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
    const { handleClickMore } = usePagination(setPage)
    const { hasNotDuplicateId } = useDuplicateChecker()


    if (isLoading){
        return <div>Loading...</div>
    }

    if (showError){
        return <div>Something went wrong...</div>
    }

    const categoryArticles = articles.filter(article => {
       return hasNotDuplicateId(article)
    }).map(article => {
        return <main key={article.id}> 
            <a href={article.url}>
                <img src={article.image} alt={article.title}/>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">{article.description}</p>
                <p className="source">{article.source.name}</p>
            </a>
            
        </main>
        
    });
    return (
        <>  
            <Header overlayClick={props.overlayClick} sidebarClick={props.sidebarClick}/>
            {props.sidebarOpen ? <Sidebar closeSidebarClick={props.closeSidebarClick}/> : null}
            {props.searchOpen ? <SearchOverlay articles={articles} isLoading={isLoading} closeOverlayClick={props.closeOverlayClick}/> : null}
            <h1 className="category-header">{category}</h1>
            {categoryArticles}
            {(articles.length >= 10 && category) ? <LoadMoreButton clickMore={handleClickMore} /> : null}
        </>
        
    )
    
}