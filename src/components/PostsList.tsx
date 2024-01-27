import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostsClient } from "../client/usePostClient";
import { Post } from "../model/Post";
import { PostCard } from "./PostCard";

// !important
//https://github.com/preactjs/signals/blob/main/packages/react/README.md#react-integration

/**
 * CASE 2 - we repeat the same interface
 */
type PostListProps = {
  posts: Post[];
  updatePosts: (post: Post) => void;
};

type FormValues = {
  body: string;
};
const initialSignal = await getPost();
export const postSignal = signal(initialSignal);
async function getPost() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const filteredPosts = response.data.slice(0, 3);
  const createdPosts = localStorage.getItem("CREATED_POST");
  if (createdPosts !== null) filteredPosts.push(JSON.parse(createdPosts));
  return filteredPosts;
}

function updateSignalPost(post: Post) {
  localStorage.setItem("CREATED_POST", JSON.stringify(post));
  postSignal.value = [...postSignal.value, post];
}

export function PostsList(props: PostListProps) {
  console.log("RENDERING - TodoList");

  /* const { posts, updatePosts } = props; */
  const { register, handleSubmit } = useForm<FormValues>();
  const { savePosts } = usePostsClient();

  useSignals();

  /**
   * CASE 1: We just want to render todos
   * every component only renders once (TodoList twice due the fetch)
   *
   * As you can see the original import of the hook is here and it is totally fine
   * const { todos: remoteTodos } = useTodos();
   */

  /**
   * We map props that come from the father into a @PostCard component
   */
  /*  const postCards = useMemo(() => {
    return postSignal.value.map((todo: Post) => (
      <PostCard key={todo.id} {...todo} />
    ));
  }, [posts]); */

  /**
   * Handler triggered when user clicks on the "submit" button
   * @param data FormValues, describes and contains the data written by the user in the form
   */
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const createdPost = await savePosts(data.body);
    updateSignalPost(createdPost);
  };

  return (
    <div className="todo-list">
      <h1>Posts List:</h1>
      <div className="post-card-list-wrapper">
        {postSignal.value.map((todo: Post) => (
          <PostCard key={todo.id} {...todo} />
        ))}
      </div>
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
