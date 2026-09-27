const API_KEY = import.meta.env.VITE_GNEWS_KEY;

export async function getNews(category) {
    const response = await fetch(
        `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${API_KEY}&lang=en`
    );

    const data = await response.json();

    console.log(data.articles);

    return data;
}


