
import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ArticlePage from './Pages/ArticlePage';
import ArticlesListPage from './Pages/ArticlesListPage';
import NotFoundPage from './Pages/NotFoundPage';
import LoginPage from './Pages/LoginPage';
import CreateAccountPage from "./Pages/CreateAccountPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
       <NavBar/>
        <div id="page-body">
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/about' element={<AboutPage/>}/>
            <Route path='/articles' element={<ArticlesListPage/>}/>
            <Route  path='/articles/:articleId' element={<ArticlePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/create-account' element={<CreateAccountPage/>}/>  
            <Route path='*' element={<NotFoundPage/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;



