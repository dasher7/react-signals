import { computed } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { postSignal } from "./PostsList";
//import { postSignal } from "./PostsList";

const computedSignal = computed<number>(() => postSignal.value.length);
//const computedSignal = computed<number>(() => postSignal.value.length);

export const Navbar = () => {
  console.log("RENDERING - Navbar");

  /**
   * !NOTE
   * If you want to use pure signal, and not signals hooks, and you don't want to Babel, you need this to
   * have your component reactive
   * See this: https://github.com/preactjs/signals/blob/main/packages/react/README.md#react-integration
   */
  useSignals();

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
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
