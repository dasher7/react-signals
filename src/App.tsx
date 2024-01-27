import "./App.css";
import Navbar from "./components/Navbar";
import { PostsList } from "./components/PostsList";
import Sidebar from "./components/Sidebar";
import { usePosts } from "./hooks/usePosts";

function App() {
  /**
   * CASE 2 - we want to add the count of the todos in our navbar
   * Now we need to share the todos across the components
   * NOTE: in this all components render three times, just the firm time we land on the page
   */
  const { posts, updatePosts } = usePosts();

  return (
    <div className="App">
      <Navbar posts={posts} />
      <Sidebar posts={posts} />
      <PostsList posts={posts} updatePosts={updatePosts} />
    </div>
  );
}

export default App;
