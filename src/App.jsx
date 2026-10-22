import HomePage from './pages/HomePage.jsx';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Category from './pages/Category.jsx';
import { useState } from 'react'
import useNews from "./hooks/useNews.jsx"

function App() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [query, setQuery] = useState("")
  const { articles: latestArticles, isLoading } = useNews("general")
  const [activeIndex, setActiveIndex] = useState(0);

  function overlayClick() { //when the user clicks the search button, the searchOpen value turns to true which triggers the screen overlay
    setSearchOpen(true)
  }

  function sidebarClick() { //when the user clicks the hamburger button, the sidebarOpen value toggles the sidebar menu
    setSidebarOpen(prevSidebar => !prevSidebar)
  }

  function closeOverlayClick() {
    setSearchOpen(false)
  }

  function closeSidebarClick() {
    setSidebarOpen(false)
  }

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage
            overlayClick={overlayClick}
            sidebarClick={sidebarClick}
            sidebarOpen={sidebarOpen}
            searchOpen={searchOpen}
            closeSidebarClick={closeSidebarClick}
            closeOverlayClick={closeOverlayClick}
            query={query}
            setQuery={setQuery}
            latestArticles={latestArticles}
            isLoading={isLoading}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />} />
          <Route path="/category/:category" element={<Category
            overlayClick={overlayClick}
            sidebarClick={sidebarClick}
            searchOpen={searchOpen}
            sidebarOpen={sidebarOpen}
            closeOverlayClick={closeOverlayClick}
            closeSidebarClick={closeSidebarClick}
            query={query}
            setQuery={setQuery}
            latestArticles={latestArticles}
            isLoading={isLoading}
          />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App