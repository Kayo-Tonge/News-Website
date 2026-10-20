import { useState, useEffect, useRef } from 'react'
import { getNewsCached } from "../services/Api/news.js"



export default function useNews(category, enabled = true) {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showError, setShowError] = useState(false)
    const [page, setPage] = useState(1)
    const prevCategoryRef = useRef(category)

    useEffect(() => {
        if (!enabled) return

        let ignore = false   // set to true if this effect run gets cleaned up

        // replace on page 1 or when the category changed; append on "load more"
        const replace = page === 1 || prevCategoryRef.current !== category
        prevCategoryRef.current = category

        getNewsCached(category, page)
            .then(data => {
                if (ignore) return
                setArticles(prev => (replace ? data : [...prev, ...data]))
            })
            .catch(error => {
                if (ignore) return
                console.error("Error: " + error)
                setShowError(true)
            })
            .finally(() => {
                if (!ignore) setIsLoading(false)
            })

        return () => { ignore = true }
    }, [category, page, enabled])

    return { articles, isLoading, category, showError, page, setPage }
}