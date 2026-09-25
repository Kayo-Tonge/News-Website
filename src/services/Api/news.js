const API_KEY = "225510efc9807d94bee36f8823d47c30";

export async function getNews() {
    const response = await fetch(
        `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${API_KEY}&?lang:eng`
    );

    const data = await response.json();

    console.log(data.articles);

    return data;
}

getNews()
