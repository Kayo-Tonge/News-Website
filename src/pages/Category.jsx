import useNews from "../hooks/useNews.jsx"
import { useParams } from "react-router-dom";
import Header from "../components/Header.jsx"
import usePagination from "../hooks/usePagination.jsx";
import LoadMoreButton from "../components/LoadMoreButton.jsx"


export default function Category (){
    const { category } = useParams();
    const { articles, isLoading, showError, setPage } = useNews(category)
    const { handleClickMore } = usePagination(setPage)


    if (isLoading){
        return <div>Loading...</div>
    }

    if (showError){
        return <div>Something went wrong...</div>
    }

    const categoryArticles = articles.map(article => {
        return <main key={article.url}> 
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
            <Header />
            <h1 className="category-header">{category}</h1>
            {categoryArticles}
            {(articles.length >= 10 && category) ? <LoadMoreButton clickMore={handleClickMore} /> : null}
        </>
        
    )
    
}