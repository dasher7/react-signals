import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostsClient } from "../client/usePostClient";
import usePosts from "../hooks/usePosts";
import { Post } from "../model/Post";
import { PostCard } from "./PostCard";

type FormValues = {
  body: string;
};

export function PostsList() {
  console.log("RENDERING - TodoList");

  const { register, handleSubmit } = useForm<FormValues>();
  const { savePosts } = usePostsClient();

  const { posts: remotePosts, updatePosts } = usePosts();

  /**
   * We map props that come from the father into a @PostCard component
   */
  const postCards = useMemo(() => {
    return remotePosts.map((todo: Post) => (
      <PostCard key={todo.id} {...todo} />
    ));
  }, [remotePosts]);

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
