import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import UserRoute from "./Routes/UserRoute";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <UserRoute/>
      <Footer />
    </div>
  );
}

export default App;
