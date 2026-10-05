import { useState,useEffect,useRef } from 'react'
import { getNews } from "../services/Api/news.js"

export default function useNews(category){
    const [articles,setArticles] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [showError,setShowError] = useState(false)
    const [page, setPage] = useState(1)
    const prevCategoryRef = useRef(category)
    //we created prevCategoryRef because we need to keep track of our previous category before it changed after re-rendering that is caused by the user click a different category
    //We track this so we can know which category we current have, which one we are changing to, and not onyl re-route to the new one, but also fetching data (calling useEffect) for the articles related to that category

    useEffect (() => { //We need useEffect so we can track the api changes based on the category the user chooses. React only re renders once the category changes, indicating that the api data is being fetched and updated appropriately
        console.log("previous:", prevCategoryRef.current)
        console.log("current:", category)
        console.log("page:", page)

        const prevCategoryChanged = prevCategoryRef.current !== category
        prevCategoryChanged ? 
        getNews(category,page).then(data => setArticles(data)) : getNews(category,page).then(data => setArticles(prevArticles => [...prevArticles, ...data])).catch(error => { //prevArticles => [...prevArticles, ...data] means we are taking the articles array from the api and adding data to those articles as we click the load more button. The api free plan only gives 10 articles at a time, so we need a state(like articles) to add more data to it
            console.error("Error: " + error)
            setShowError(true)

        })
    .finally(() => setIsLoading(false))
    prevCategoryRef.current = category
    }, [category,page])
    
    
    

    return {articles, isLoading, category, showError, page, setPage}
             
    
}

