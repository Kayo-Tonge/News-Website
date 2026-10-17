import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import SearchOverlay from '../components/SearchOverlay.jsx'
import useNews from "../hooks/useNews.jsx"
import { useEffect, useState } from "react";
import useDuplicateChecker from "../hooks/useDuplicateChecker.jsx"


export default function HomePage(props){
    const [activeIndex, setActiveIndex] = useState(0);
    const { hasNotDuplicateId } = useDuplicateChecker()
    const { articles: nationArticles, isLoading: nationLoading, } = useNews("nation",activeIndex === 0)
    const { articles: worldArticles, isLoading: worldLoading,} = useNews("world", activeIndex === 1)
    const { articles: businessArticles, isLoading: businessLoading, } = useNews("business",activeIndex === 2)
    const { articles: technologyArticles, isLoading: technologyLoading, } = useNews("technology",activeIndex === 3)
    const { articles: entertainmentArticles, isLoading: entertainmentLoading, } = useNews("entertainment",activeIndex === 4)
    const { articles: sportsArticles, isLoading: sportsLoading,} = useNews("sports",activeIndex === 5)
    const { articles: scienceArticles, isLoading: scienceLoading, } = useNews("science",activeIndex === 6)
    const { articles: healthArticles, isLoading: healthLoading,} = useNews("health",activeIndex === 7)


    const loadingStates = [
        worldLoading, 
        nationLoading,
        businessLoading,
        technologyLoading,
        entertainmentLoading,
        sportsLoading,
        scienceLoading,
        healthLoading
    ]

    const activeLoading = loadingStates[activeIndex];

    
    useEffect(() => {
    if (activeLoading || activeIndex >= loadingStates.length - 1) {
        return;
    }

    const timeoutId = setTimeout(() => {
        setActiveIndex(index => index + 1);
    }, 1000);

    return () => clearTimeout(timeoutId);
}, [activeIndex, activeLoading]);


    const displayedNationArticles = nationArticles.slice(0,3)
    .filter(article => hasNotDuplicateId(article))
    .map(article => (
        <main key={article.id}>
            <a href={article.url}>
                <img src={article.image} alt={article.title} />
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">{article.description}</p>
                <p className="source">{article.source.name}</p>
            </a>
        </main>
    ));

    return (
        <> 
           
            <Header overlayClick={props.overlayClick} sidebarClick={props.sidebarClick}/>
            
            {props.sidebarOpen ? <Sidebar closeSidebarClick={props.closeSidebarClick} setQuery={props.setQuery}/> : null}
            {props.searchOpen ? <SearchOverlay latestArticles={props.latestArticles} isLoading={props.isLoading} closeOverlayClick={props.closeOverlayClick} query={props.query} setQuery={props.setQuery}/> : null}
            {displayedNationArticles}
        </>
    )

}

