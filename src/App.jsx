import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import PropertyPage from './pages/PropertyPage'
import ScrollToTop from './components/ScrollToTop'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

/**
 * Main App Component with Routing
 */
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Search/Home Page */}
        <Route path="/" element={<SearchPage />} />
        
        {/* Individual Property Detail Page */}
        <Route path="/property/:id" element={<PropertyPage />} />
        
        {/* 404 Not Found */}
        <Route path="*" element={
          <div style={{ 
            padding: '4rem 2rem', 
            textAlign:  'center',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div>
              <h1>404 - Page Not Found</h1>
              <p>These are not the pages you are looking for.</p>
              <a href="/" style={{ color: '#2563eb' }}>← Go Home</a>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App