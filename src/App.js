import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import About from './page/About';
import CreateArticle from './page/CreateArticle';
import PrivateRoute from './components/Auth/PrivateRoute';
import ArticleList from './components/ArticleList';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import EditArticle from './dashboard/edit-article';
import Dashboard from './dashboard/dashboard';
import PasswordReset from './components/Auth/PasswordReset';
import CategoryDropdown from './components/CategoryDropdown';
import ArticleDetail from './page/ArticleDetail';
import PopularArticle from './components/PopularArticle'; 
import Footer from './components/Footer';
import Slider from './components/Slider';
import ArtikelBawah from './components/GoogleTrend';
import SearchResults from './page/SearchResult';
import TopTags from './components/TopTagsArtikel';
import TopTagsLink from './components/TopTagsLink';
import TagArticlesPage from '../src/page/TagArticlesPage';
import BeritaTerkini from './components/BeritaTerkini';
import CategoryArticles from './components/CategoryArticles';
import PrivacyPolicy from './page/PrivacyPolicy';
import PedomanSiber from './page/PedomanSiber'; 
import SidebarDashboard from './components/SidebarDashboard';
import IndexDashboard from './dashboard/index';
import Categories from './components/Categories';
import Contact from './page/Contact';
import VideoPage from './page/VideoPage';
import GoogleLoginButton from './components/GoogleLoginButton';

function Home() {
  return (
    <div style={{marginRight: '0'}}>
      <Header />
      <Slider />
      <div className="container" style={{padding: '0% 8%'}}> 
       <div style={{marginTop: '-100px'}}> <BeritaTerkini /> </div>
        <div>
        <TopTags />
        <TopTagsLink />
        </div>
      </div>
      <PopularArticle />
      <ArtikelBawah />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/header" element={<Header />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/categorydropdown" element={<CategoryDropdown />} />
          <Route path="/articles/:id/:slug" element={<ArticleDetail />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/tags/:tagId" element={<TagArticlesPage />} />
          <Route path="/kategori/:slug" element={<CategoryArticles />} />
          <Route path="/terpopuler" element={<PopularArticle />} />
          <Route path="/berita-terkini" element={<BeritaTerkini />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} /> 
          <Route path="/pedoman-siber" element={<PedomanSiber />} /> 
          <Route path="/indexdashboard" element={<IndexDashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/sidebar" element={<SidebarDashboard />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/videos/category/:category" element={<VideoPage />} />
        
        
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/create-article" element={<CreateArticle />} />
            <Route path="/edit-article/:id" element={<EditArticle />} />
          </Route> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
