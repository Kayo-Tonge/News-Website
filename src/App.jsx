import HomePage from './pages/HomePage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Category from './pages/Category.jsx';

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </BrowserRouter>
    </>   
    )
}

export default App
