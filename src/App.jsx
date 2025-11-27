import { lazy, Suspense } from 'react'
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from 'react-router'

const HomePage = lazy(() => import('./pages/Home.jsx'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))
const Contact = lazy(() => import('./pages/Contact'))
const JobDetail = lazy(() => import('./pages/Detail'))
const NotFoundPage = lazy(() => import('./pages/404'))

function App() {

  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}
      >Cargando ...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/jobs/:jobId" element={<JobDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;