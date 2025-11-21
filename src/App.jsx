import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchPage from "./pages/Search";
import HomePage from "./pages/Home";
import { NotFoundPage } from "./pages/404";
import Contact from "./pages/Contact";
import Route from "./components/Route";

function App() {

  return (
    <>
      <Header />
      <Route path="/" component={HomePage}/>
      <Route path="/search" component={SearchPage}/>
      <Route path="/contact" component={Contact}/>
      <Footer />
    </>
  );
}

export default App;