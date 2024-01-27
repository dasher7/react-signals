import { Post } from "../model/Post";

export const PostCard = (props: Post) => {
  return (
    <div className="post-card">
      <span className="post-card-title">{props.title}</span>
      <span className="post-card-body">{props.body}</span>
    </div>
  );
};
