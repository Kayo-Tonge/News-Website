import { useState,useEffect } from 'react'
import getNews from './news-website/src/services/Api/news.js'


export default function useNews(){
    const [articles,setArticles] = useState([])
    const [isLoading,setIsLoading] = useState(true)

    useEffect (() => {
        getNews().then(data => setArticles(data)).finally(() => setIsLoading(false))
    }, [])

    return {articles, isLoading}
}
