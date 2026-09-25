
import { useState } from 'react'
import useNews from "./news-website/src/hooks/useNews.jsx"
import LoadMoreButton from "./news-website/src/components/LoadMoreButton.jsx"

export default function SearchOverlay(props) {
    const { articles, isLoading } = useNews()
    const [searchQuery, setSearchQuery] = useState("")
    const [visibleArticles,setVisibleArticles] = useState(15)

    //this function's job is to capture the user's input in the search section of the website
    function handleSearchQuery(event) {
        const currentInput = event.currentTarget.value
        setSearchQuery(currentInput)
    }

    //renderArticles takes the first 10 articles and display the title, image, and a link to each article
    function renderArticles() {
        return articles.slice(0, 10).map((article) => {
            return (
                <a href={article.url} key={article.id}>
                    <article>
                        <h4>{article.title}</h4>
                        <img src={article.img} />
                    </article>
                </a>
            )
        })
    }

    //As the user types, the search results is going to update and show articles as the user is typing. The title of each article matches the user's input 
    function renderSearchResults() {
        return (
            articles.slice(0,visibleArticles).filter((article) => {
                return article.title.includes(searchQuery.toLowerCase())
            }).map(article => {
                return (
                    <div key={article.id}>
                        <article>{article.title}</article>
                        <img src={article.img} />
                    </div>
                )
            })
        )
    }

    function handleClickMore (){
        setVisibleArticles(prevArticles => prevArticles + 15)
    }

    //the entire screen overlay is displayed
    return (
        <div className="overlay-container">
            <input //this is the search bar
                type="text"
                placeholder="Search"
                onChange={handleSearchQuery} //the user's input as they are typing is being captured
            /> 

            <button onClick={props.onClick} > 
                <i class="fa-solid fa-x"></i>
            </button> /
            
            {/*if the user's input(searchQuery) is empty, we show the 10 latest news below the search bar. If it's not, we render the results based on the user's input*/ searchQuery.length === 0 ?
                <section className="latest-news">
                    <h3>Latest News</h3>
                    {isLoading ? <p>Loading...</p> : renderArticles()}
                </section>
                :
                renderSearchResults()
            }
            <LoadMoreButton clickMore={handleClickMore} />
        </div>
    )
}

