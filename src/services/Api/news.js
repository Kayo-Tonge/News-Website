const API_KEY = import.meta.env.VITE_GNEWS_KEY;


export async function getNews(category, page) {
    const country = category === "general" || category === "world"
        ? ""
        : "&country=us";

    const response = await fetch(
        `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${API_KEY}&page=${page}&lang=en${country}`
    );

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data.articles;
}



export async function getSearchResults(query,page){
    const response = await fetch(`https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&apikey=${API_KEY}&page=${page}&lang=en`);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        
        return data.articles
}

// ---------- cache (new) ----------
const CACHE_MS = 30 * 60 * 1000; // 30 minutes
const inFlight = new Map();      // requests currently running

function cached(key, fetcher) {
    // 1. fresh copy saved on the "shelf"? use it, no network call
    try {
        const raw = localStorage.getItem(key);
        if (raw) {
            const { data, time } = JSON.parse(raw);
            if (Date.now() - time < CACHE_MS) return Promise.resolve(data);
        }
    } catch { /* ignore bad cache */ }

    // 2. same request already running? share it
    if (inFlight.has(key)) return inFlight.get(key);

    // 3. real request, saved only if it succeeds
    const request = fetcher()
        .then(data => {
            try {
                localStorage.setItem(key, JSON.stringify({ data, time: Date.now() }));
            } catch { /* storage full, ignore */ }
            return data;
        })
        .finally(() => inFlight.delete(key));

    inFlight.set(key, request);
    return request;
}

export function getNewsCached(category, page) {
    return cached(`news:${category}:${page}`, () => getNews(category, page));
}

export function getSearchCached(query, page) {
    const q = query.trim().toLowerCase();
    return cached(`search:${q}:${page}`, () => getSearchResults(q, page));
}