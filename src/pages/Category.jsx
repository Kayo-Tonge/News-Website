import useNews from "../hooks/useNews.jsx"
import { useParams } from "react-router-dom";


export default function Category (){
    const { category } = useParams();
    const { articles } = useNews()
    const categoryArticles = articles.map(article => {
        return <main>
            <h1 className="category-header">{category}</h1>
            <a href={article.url}>
                <img src={article.image}/>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">{article.description}</p>
                <p classNAme="source">{article.source.name}</p>
            </a>
            
        </main>
        
    });
    return (
        <>
            {categoryArticles}
        </>
        
    )
    
}