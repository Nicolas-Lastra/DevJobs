import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchPage from "./pages/Search";
import HomePage from "./pages/Home";

function App() {
  const currentPath = window.location.pathname

  return (
    <>
      <Header />
      {
        currentPath === '/' ? <HomePage/> : <SearchPage/>
      }
      <Footer />
    </>
  );
}

export default App;