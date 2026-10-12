import HomePage from './pages/HomePage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Category from './pages/Category.jsx';
import { useState } from 'react'


function App() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [sidebarOpen,setSidebarOpen] = useState(false)  
  const [query,setQuery] = useState("")


  function overlayClick (){ //when the user clicks the search button, the searchOpen value turns to true which triggers the screen overlay
        setSearchOpen(true)
    }

    function sidebarClick (){  //when the user clicks the hamburger button, the sidebarOpen value turns to true which triggers the sidebar menu
       console.log("sidebarClick in App")
        setSidebarOpen(true)
    }

    function closeOverlayClick(){
        setSearchOpen(false)
    }

    function closeSidebarClick(){
        setSidebarOpen(false)
    }


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage overlayClick={overlayClick}
            sidebarClick={sidebarClick}
            sidebarOpen={sidebarOpen}
            searchOpen={searchOpen}
            closeSidebarClick={closeSidebarClick}
            closeOverlayClick={closeOverlayClick}
            query={query}
            setQuery={setQuery}/>} />
          <Route path="/category/:category"  element={<Category 
          overlayClick={overlayClick} 
          sidebarClick={sidebarClick} 
          searchOpen={searchOpen} 
          sidebarOpen={sidebarOpen} 
          closeOverlayClick={closeOverlayClick} 
          closeSidebarClick={closeSidebarClick}
          query={query}
          setQuery={setQuery}
          />} />
        </Routes>
          
      </BrowserRouter>
     
    </>  
    
    )
}

export default App
