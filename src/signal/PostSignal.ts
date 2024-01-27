import { Signal, signal } from "@preact/signals-react";
import axios from "axios";
import { Post } from "../model/Post";

// Initialize the signal
export const postSignal = signal<Post[]>([])

// Initialize the signal
export const InitializePostSignal = (initialPosts: Post[]) => {
  postSignal.value = initialPosts
}

//function the allow us to retrieve data from the server
export async function getPost(): Promise<Post[]> {
  const response = await axios.get<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const filteredPosts = response.data.slice(0, 3);
  const createdPosts = localStorage.getItem("CREATED_POST");
  if (createdPosts !== null) filteredPosts.push(JSON.parse(createdPosts));
  return filteredPosts;
}

//function that allow us to set new saved post into the signal observer
// you can either work with the signal in this file or use the refs as described below
export function updatePosts(signal: Signal<Post[]>, post: Post) {
  localStorage.setItem("CREATED_POST", JSON.stringify(post));
  signal.value = [...signal.value, post]
}
 
