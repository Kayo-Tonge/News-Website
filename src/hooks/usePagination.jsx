import { useState } from "react"

//i created a custom hook because this code is being using in SearchOverlay and Category. This file is responsible for adding new articles after each api fetch
export default function usePagination(setPage) {
    const [visibleArticles,setVisibleArticles] = useState(10)


    function handleClickMore (){ //10 new articles will be added each time the user clicks the load more button
        setVisibleArticles(prevArticles => prevArticles + 10)
        setPage(prevPage => prevPage + 1)
    }

    return {handleClickMore, visibleArticles} //these are returned because handleClickMore will be triggered when the user clicks the load more button in both SearchOverlay and Category
    //visibleArticles is passed
}