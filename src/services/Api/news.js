const API_KEY = import.meta.env.VITE_GNEWS_KEY;

export async function getNews(category, page) {
    
        const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${API_KEY}&page=${page}&lang=en`);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        
        return data.articles
    
    
}


export async function getSearchResults(query,page){
    const response = await fetch(`https://gnews.io/api/v4/search?q=${query}&apikey=${API_KEY}&page=${page}&lang=en`);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        
        return data.articles
}