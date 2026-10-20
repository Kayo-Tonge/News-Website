import { useState, useEffect, useRef } from 'react'
import { getNews } from "../services/Api/news.js"

const CACHE_MS = 30 * 60 * 1000   // 30 minutes
const inFlight = new Map()         // requests currently running, shared across effect re-runs

function getNewsCached(category, page) {
    const key = `news:${category}:${page}`

    // 1. fresh cache: no network call
    try {
        const raw = localStorage.getItem(key)
        if (raw) {
            const { data, time } = JSON.parse(raw)
            if (Date.now() - time < CACHE_MS) return Promise.resolve(data)
        }
    } catch { /* ignore bad cache */ }

    // 2. same request already running: reuse it instead of sending another
    if (inFlight.has(key)) return inFlight.get(key)

    // 3. real request, saved only if it succeeds
    const request = getNews(category, page)
        .then(data => {
            try {
                localStorage.setItem(key, JSON.stringify({ data, time: Date.now() }))
            } catch { /* storage full, ignore */ }
            return data
        })
        .finally(() => inFlight.delete(key))

    inFlight.set(key, request)
    return request
}

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