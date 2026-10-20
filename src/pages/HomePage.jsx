import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import SearchOverlay from '../components/SearchOverlay.jsx'
import useNews from "../hooks/useNews.jsx"
import { useEffect, } from "react";
import useDuplicateChecker from "../hooks/useDuplicateChecker.jsx"
import CategorySection from '../components/CategorySection.jsx';


export default function HomePage(props){
    
    const { hasNotDuplicateId } = useDuplicateChecker()
    const { articles: nationArticles, isLoading: nationLoading, } = useNews("nation",props.activeIndex >= 1)
    const { articles: worldArticles, isLoading: worldLoading,} = useNews("world", props.activeIndex >= 2)
    const { articles: businessArticles, isLoading: businessLoading, } = useNews("business",props.activeIndex >= 3)
    const { articles: technologyArticles, isLoading: technologyLoading, } = useNews("technology",props.activeIndex >= 4)
    const { articles: entertainmentArticles, isLoading: entertainmentLoading, } = useNews("entertainment",props.activeIndex >= 5)
    const { articles: sportsArticles, isLoading: sportsLoading,} = useNews("sports",props.activeIndex >= 6)
    const { articles: scienceArticles, isLoading: scienceLoading, } = useNews("science",props.activeIndex >= 7)
    const { articles: healthArticles, isLoading: healthLoading,} = useNews("health",props.activeIndex >= 8)


    const loadingStates = [
    props.isLoading,
    nationLoading,
    worldLoading,
    businessLoading,
    technologyLoading,
    entertainmentLoading,
    sportsLoading,
    scienceLoading,
    healthLoading
];
    const activeLoading = loadingStates[props.activeIndex];

    
    useEffect(() => {
    if (activeLoading || props.activeIndex >= loadingStates.length - 1) {
        return;
    }

    const timeoutId = setTimeout(() => {
        props.setActiveIndex(index => index + 1);
    }, 1000);

    return () => clearTimeout(timeoutId);
}, [props.activeIndex, activeLoading]);


   const frontArticles = (nationArticles ?? [])
    .filter(article => hasNotDuplicateId(article))
    .slice(0, 7);

    const hero = frontArticles.find(article => article.image);

    const pair = frontArticles
        .filter(article => article.id !== hero?.id)
        .slice(0, 2);

    const list = frontArticles
        .filter(article =>
            article.id !== hero?.id &&
            !pair.some(pairArticle => pairArticle.id === article.id) &&
            article.image
        )
        .slice(0, 4);

    const trendingArticles = (worldArticles ?? [])
    .filter(article => hasNotDuplicateId(article))
    .slice(0, 5).map(article => (
        <article key={article.id} className="list-item">
            <a href={article.url}>
                <div className="list-text">
                    <h3 className="list-title">{article.title}</h3>
                    <p className="source">{article.source.name}</p>
                </div>
            </a>
        </article>
    ))

     // ---------- other categories (filtered once, here) ----------
    const unique = (articles) => (articles ?? []).filter(a => hasNotDuplicateId(a));
    const business = unique(businessArticles);
    const technology = unique(technologyArticles);
    const entertainment = unique(entertainmentArticles);
    const sports = unique(sportsArticles);
    const science = unique(scienceArticles);
    const health = unique(healthArticles);

    return (
        <> 
           
            <Header overlayClick={props.overlayClick} sidebarClick={props.sidebarClick}/>
            
            {props.sidebarOpen ? <Sidebar closeSidebarClick={props.closeSidebarClick} setQuery={props.setQuery}/> : null}
            {props.searchOpen ? <SearchOverlay latestArticles={props.latestArticles} isLoading={props.isLoading} closeOverlayClick={props.closeOverlayClick} query={props.query} setQuery={props.setQuery}/> : null}

            <main>
                <section className="front-page">
                    <div className="heading-wrapper">
                        <h2>Today's Pick</h2>
                    </div>
                    {hero && (
                        <article className="hero">
                            <a href={hero.url}>
                                <p className="source">{hero.source.name}</p>
                                <h2 className="hero-title">{hero.title}</h2>
                                <p className="hero-description">{hero.description}</p>
                                <img src={hero.image} alt={hero.title} />
                            </a>
                        </article>
                    )}

                    <div className="pair">
                        {pair.map(article => (
                            <article key={article.id} className="pair-item">
                                <a href={article.url}>
                                    <p className="source">{article.source.name}</p>
                                    <h3 className="pair-title">{article.title}</h3>
                                    <p className="pair-description">{article.description}</p>
                                </a>
                            </article>
                        ))}
                    </div>

                    <div className="list">
                        {list.map(article => {

                        return (
                            <article key={article.id} className="list-item">
                                <a href={article.url}>
                                    <div className="list-text">
                                        <p className="source">{article.source.name}</p>
                                        <h3 className="list-title">{article.title}</h3>
                                    </div>
                                    <img src={article.image} alt={article.title} />
                                </a>
                            </article>
                        );
                    })}
                    </div>

                    <div className="trending-wrapper">
                        <h2>Trending Stories</h2>
                    </div>
                    {trendingArticles}
                </section>
                <CategorySection label="Business" articles={business} />
                <CategorySection label="Technology" articles={technology} />
                <CategorySection label="Entertainment" articles={entertainment} />
                <CategorySection label="Sports" articles={sports} />
                <CategorySection label="Science" articles={science} />
                <CategorySection label="Health" articles={health} />
            </main>
        </>
    )

}

