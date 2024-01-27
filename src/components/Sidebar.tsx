import { Post } from "../model/Post";
/**
 * CASE 2 - we repeat the same interface across three components and we don't need it here
 */
type SidebarProps = {
  posts: Post[];
};

export const Sidebar = (props: SidebarProps) => {
  console.log("RENDERING - Sidebar");
  return (
    <div className="sidebar">
      <span>Most read post</span>
    </div>
  );
};

export default Sidebar;
