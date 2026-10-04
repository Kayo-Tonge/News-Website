import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import SearchOverlay from '../components/SearchOverlay.jsx'
import useNews from "../hooks/useNews.jsx"



export default function HomePage(props){
    
    const {articles,isLoading} = useNews()

    
    


    

    return (
        <> 
           
            <Header overlayClick={props.overlayClick} sidebarClick={props.sidebarClick}/>
            
            {props.sidebarOpen ? <Sidebar closeSidebarClick={props.closeSidebarClick}/> : null}
            {props.searchOpen ? <SearchOverlay articles={articles} isLoading={isLoading} closeOverlayClick={props.closeOverlayClick}/> : null}
        </>
    )

}

