import "./App.css";
import Navbar from "./components/Navbar";
import { PostsList } from "./components/PostsList";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <PostsList />
    </div>
  );
}

export default App;
