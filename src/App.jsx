import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchPage from "./pages/Search";
import HomePage from "./pages/Home";
import { NotFoundPage } from "./pages/404";
import useRouter from "./hooks/useRouter";
import Contact from "./pages/Contact";

function App() {
  const { currentPath } = useRouter()

  let page = <NotFoundPage/>
  if (currentPath === '/') {
    page = <HomePage/>
  } else if (currentPath === '/search') {
    page = <SearchPage/>
  } else if (currentPath === '/contact') {
    page = <Contact/>
  }

  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
}

export default App;