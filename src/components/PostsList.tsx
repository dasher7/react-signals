import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostsClient } from "../client/usePostClient";
import { Post } from "../model/Post";
import { PostCard } from "./PostCard";

type FormValues = {
  body: string;
};

//START WORKING WITH IMPORTED SIGNAL
/* const initialPosts = await getPost();
InitializePostSignal(initialPosts); */

// START CREATING SIGNAL

// Call function to load data from where you want to retrieve them
const initialSignal = await getPost();

//Initialize signal with the fetched data
export const postSignal = signal(initialSignal);

//Load data function
async function getPost() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const filteredPosts = response.data.slice(0, 3);
  const createdPosts = localStorage.getItem("CREATED_POST");
  if (createdPosts !== null) filteredPosts.push(JSON.parse(createdPosts));
  return filteredPosts;
}

//Update signal value function
function updateSignalPost(post: Post) {
  localStorage.setItem("CREATED_POST", JSON.stringify(post));
  postSignal.value = [...postSignal.value, post];
}

export function PostsList() {
  console.log("RENDERING - TodoList");

  const { register, handleSubmit } = useForm<FormValues>();
  const { savePosts } = usePostsClient();

  /**
   * !NOTE
   * If you want to use pure signal, and not signals hooks, and you don't want to Babel, you need this to
   * have your component reactive
   * See this: https://github.com/preactjs/signals/blob/main/packages/react/README.md#react-integration
   */
  useSignals();

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
