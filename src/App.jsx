// import { useState } from "react";
// import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IndexMain from "./components/IndexMain";
import JobList from "./components/JobList";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      {/* <main >
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </main> */}

      {/* <IndexMain /> */}
      <JobList/>
      <Footer />
    </>
  );
}

export default App;