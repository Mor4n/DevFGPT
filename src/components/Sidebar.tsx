import SidebarItem from "./SidebarItem";
import History from "./History";
import { useChatContext } from "../context/ChatContext";

function Sidebar() {
  const { createNewChat } = useChatContext();

  return (
    <aside
      className="
        w-64
        h-screen
        bg-zinc-900
        text-white
        flex
        flex-col
        p-3
      "
    >
      <div className="mb-4 px-2">
        <span className="text-lg font-semibold flex items-center gap-2">
          <img
            src="https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/ollama.png"
            alt="Logo"
            className="w-12"
          />
          Dev.FGPT
        </span>
      </div>

      <SidebarItem
        onClick={createNewChat}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
            </g>
          </svg>
        }
      >
        Nuevo chat
      </SidebarItem>

      <History />
    </aside>
  );
}

export default Sidebar;