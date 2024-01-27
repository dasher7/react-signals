import { computed } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { Post } from "../model/Post";
import { postSignal } from "./PostsList";

/**
 * CASE 2 - we repeat the same interface
 */
type NavbarProps = {
  posts: Post[];
};

const computedSignal = computed(() => postSignal.value.length);

export const Navbar = (props: NavbarProps) => {
  console.log("RENDERING - Navbar");

  useSignals();

  /* const { posts } = props; */

  return (
    <nav className="navbar">
      <ul className="menuItems">
        <li>
          <a href="link-1">Link 1</a>
        </li>
        <li>
          <a href="link-2">Link 2</a>
        </li>
        <li>
          <a href="link-3">Link 3</a>
        </li>
        <li>
          <a href="link-4">Link 4</a>
        </li>
        <li>
          <span>
            Published posts: <strong>{computedSignal}</strong>
            {/* Published posts: <strong>{posts.length}</strong> */}
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
