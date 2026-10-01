
import { useState,useEffect } from 'react'
import LoadMoreButton from "./LoadMoreButton.jsx"
import CloseButton from './CloseButton.jsx'
import { getSearchResults } from "../services/Api/news.js"


export default function SearchOverlay(props) {
    const articles = props.articles 
    const isLoading = props.isLoading 
    const [query, setQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [visibleArticles,setVisibleArticles] = useState(10)
    const [page,setPage] = useState(1)

    

     useEffect(() => { 
        const timeout = setTimeout(() => { // this is called debouncing. the API request is delayed so it only runs after the user stops typing for 1 second
            getSearchResults(query,page).then(data => setSearchResults(prevResults => [...prevResults,...data])).catch(error => {
            console.error("Error: " + error)        
                })
        },1000)
        return () => clearTimeout(timeout)
    }, [query,page])

    //this function's job is to capture the user's input in the search section of the website
    function handleSearchQuery(event) {
        const currentInput = event.currentTarget.value
        setQuery(currentInput)
    }


   
    //renderArticles takes the first 10 articles and display the title, image, and a link to each article
    function renderArticles() {
        return articles.slice(0, 10).map((article) => {
            return (
                <a href={article.url} key={article.id}>
                    <article>
                        <h4>{article.title}</h4>
                        <img src={article.image} />
                    </article>
                </a>
            )
        })
    }

    //As the user types, the search results is going to update and show articles as the user is typing. The title of each article matches the user's input 
    function renderSearchResults() {
        return (
            searchResults.slice(0,visibleArticles).map(article => {
                return (
                    <div key={article.id}>
                        <article>{article.title}</article>
                        <img src={article.image} />
                    </div>
                )
            })
        )
    }

    function handleClickMore (){ //15 new articles will be added each time the user clicks the load more button
        setVisibleArticles(prevArticles => prevArticles + 15)
        setPage(prevPage => prevPage + 1)
    }

    //the entire screen overlay is displayed
    return (
        <div className="overlay-container">
            <input //this is the search bar
                type="text"
                placeholder="Search"
                onChange={handleSearchQuery} //the user's input as they are typing is being captured
            /> 

            <CloseButton onClick={props.closeOverlayClick} />
            
            {/*if the user's input(searchQuery) is empty, we show the 10 latest news below the search bar. If it's not, we render the results based on the user's input*/ query.length === 0 ?
                <section className="latest-news">
                    <h3>Latest News</h3>
                    {isLoading ? <p>Loading...</p> : renderArticles()}
                </section>
                :
                renderSearchResults()
            }
            {(searchResults.length > 10 && query)? <LoadMoreButton clickMore={handleClickMore} /> : null}
        </div>
    )
}

