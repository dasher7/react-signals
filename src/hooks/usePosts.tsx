import { useEffect, useState } from "react";
import { usePostsClient } from "../client/usePostClient";
import { Post } from "../model/Post";

/**
 * type that describes the interface exposed by the hook
 * @Post are the post fetched by the JSONPlaceholder API
 * @UpdatePost is a function that simulates the real update of the fetched resources, it adds what come from the form
 */
type usePostType = {
  posts: Post[];
  updatePosts: (post: Post) => void;
};

/**
 * Incapsulates the logic of handling @Post letting us reutilize the logic across different components
 * @returns usePostType
 */
export const usePosts = (): usePostType => {
  //Keep the fetched post
  const [posts, setPosts] = useState<Post[]>([]);
  //Keep the value of localStorage, just here to rerender duty
  const [createdPosts, setCreatedPosts] = useState(
    localStorage.getItem("CREATED_POST")
  );
  //API
  const { getPosts } = usePostsClient();

  //createdPosts is forced to rerender, in real world use useQuery and real api :)
  useEffect(() => {
    loadData();
  }, [createdPosts]);

  /**
   * Call JSONPlaceholder API and, in case, add the localStoraged data
   * @return void
   */
  const loadData = async () => {
    const posts = await getPosts();
    const filteredPosts = posts.slice(0, 3);
    if (createdPosts !== null) filteredPosts.push(JSON.parse(createdPosts));
    setPosts(filteredPosts);
  };

  /**
   * Fake method used to fake the persist of the data after form submission
   * @param post the post we want to fake persist
   */
  const updatePosts = (post: Post) => {
    localStorage.setItem("CREATED_POST", JSON.stringify(post));
    setCreatedPosts(localStorage.getItem("CREATED_POST"));
  };

  return {
    posts,
    updatePosts,
  };
};

export default usePosts;
