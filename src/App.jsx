import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <div className="bg-black">
    <Navbar />
      <div className="min-h-[75vh] my-10">
      <Manager />
      </div>
      <Footer />
    </div>

    </>
  );
}

export default App;
