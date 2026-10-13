import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import SearchOverlay from '../components/SearchOverlay.jsx'



export default function HomePage(props){
    
   

    
    


    

    return (
        <> 
           
            <Header overlayClick={props.overlayClick} sidebarClick={props.sidebarClick}/>
            
            {props.sidebarOpen ? <Sidebar closeSidebarClick={props.closeSidebarClick} setQuery={props.setQuery}/> : null}
            {props.searchOpen ? <SearchOverlay latestArticles={props.latestArticles} isLoading={props.isLoading} closeOverlayClick={props.closeOverlayClick} query={props.query} setQuery={props.setQuery}/> : null}
        </>
    )

}

