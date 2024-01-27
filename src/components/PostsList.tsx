import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostsClient } from "../client/usePostClient";
import { Post } from "../model/Post";
import { PostCard } from "./PostCard";

/**
 * CASE 2  we repeat the same interface across three components and we don't need it here
 * In this case we added just a callback function to notify our parent (App.tsx) that we updated posts
 * NOTE: values of posts are still stored in the hook but we follow the best practice of passing props top-bottom
 */
type PostListProps = {
  posts: Post[];
  updatePosts: (post: Post) => void;
};

type FormValues = {
  body: string;
};

export function PostsList(props: PostListProps) {
  console.log("RENDERING - TodoList");

  const { posts, updatePosts } = props;
  const { register, handleSubmit } = useForm<FormValues>();
  const { savePosts } = usePostsClient();

  /**
   * We map props that come from the father into a @PostCard component
   */
  const postCards = useMemo(() => {
    return posts.map((todo: Post) => <PostCard key={todo.id} {...todo} />);
  }, [posts]);

  /**
   * Handler triggered when user clicks on the "submit" button
   * @param data FormValues, describes and contains the data written by the user in the form
   */
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const createdPost = await savePosts(data.body);
    updatePosts(createdPost);
  };

  return (
    <div className="todo-list">
      <h1>Posts List:</h1>
      <div className="post-card-list-wrapper">{postCards}</div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <span>Add Post:</span>
        <input
          type="text"
          className="form-input"
          {...register("body", { required: true })}
        ></input>
        <button className="form-button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}
