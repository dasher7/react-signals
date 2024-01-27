import { signal } from "@preact/signals-react";
import axios from "axios";
import { Post } from "../model/Post";

// Call the function that fetch the data for us in order to pass them to the signal
const initialSignal = await getPost();

// Initialize the signal
export const postSignal = signal(initialSignal);

//function the allow us to retrieve data from the server
async function getPost() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const filteredPosts = response.data.slice(0, 3);
  const createdPosts = localStorage.getItem("CREATED_POST");
  if (createdPosts !== null) filteredPosts.push(JSON.parse(createdPosts));
  return filteredPosts;
}

//function that allow us to set new saved post into the signal observer
export function updatePosts(post: Post) {
  localStorage.setItem("CREATED_POST", JSON.stringify(post));
  postSignal.value = [...postSignal.value, JSON.stringify(post)]

}
 
