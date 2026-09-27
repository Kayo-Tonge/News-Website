import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import SearchOverlay from '../components/SearchOverlay.jsx'
import useNews from "../hooks/useNews.jsx"
import { useState } from "react"


export default function HomePage(){
    const [searchOpen, setSearchOpen] = useState(false)
    const[sidebarOpen,setSidebarOpen] = useState(false)
    const {articles,isLoading,category,setCategory} = useNews()
    
    function overlayClick (){ //when the user clicks the search button, the searchOpen value turns to true which triggers the screen overlay
        setSearchOpen(true)
    }

    function sidebarClick (){  //when the user clicks the hamburger button, the sidebarOpen value turns to true which triggers the sidebar menu
        setSidebarOpen(true)
    }

    function onCategoryChange(newCategory){ //we set the category state to a new value. we retrieve the category from useNews, which is responsible for retrieving the gNews api data and re-rendered based on the category the user chooses
        setCategory(newCategory)
    }

    return (
        <>
            <Header overlayClick={overlayClick} sidebarClick={sidebarClick}/>
            {sidebarOpen ? <Sidebar onCategoryChange={onCategoryChange}/> : null}
            {searchOpen ? <SearchOverlay articles={articles} isLoading={isLoading} /> : null}
        </>
    )

}

