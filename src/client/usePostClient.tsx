import { Post } from "../model/Post";

type usePostsClientType = {
  getPosts: () => Promise<Post[]>;
  savePosts: (Post: string) => Promise<Post>;
};

export const usePostsClient = (): usePostsClientType => {
  /**
   * Call a GET api to retrieve all the Posts relative to the user
   * @returns {Post | Post[]} fetched Post
   */
  const getPosts = async (): Promise<Post[]> => {
    const Posts = await fetch("https://jsonplaceholder.typicode.com/posts");
    return Posts.json();
  };

  /**
   * Fake api to call to simulate the creation of a new @Post
   * @param post string that represents the post body
   * @returns
   */
  const savePosts = async (post: string): Promise<Post> => {
    const createdPost = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        body: JSON.stringify({
          title: post,
          body: post,
          userId: 1,
          id: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    return createdPost.json();
  };

  return {
    getPosts,
    savePosts,
  };
};
