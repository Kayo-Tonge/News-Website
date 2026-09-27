import { useState,useEffect } from 'react'
import { getNews } from "../services/Api/news.js"

export default function useNews(){
    const [articles,setArticles] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [category,setCategory] = useState("general")

    useEffect (() => { //We need useEffect so we can track the api changes based on the category the user chooses. React only re renders once the category changes, indicating that the api data is being fetched and updated appropriately
        getNews(category).then(data => setArticles(data)).finally(() => setIsLoading(false))
    }, [category])

    return {articles, isLoading,category,setCategory}
}
