import SidebarItem from "./SidebarItem";
import { useChatContext } from "../context/ChatContext";

function History() {
  const { sessions, activeSessionId, selectChat, deleteChat } = useChatContext();

  return (
    <div className="flex-1 overflow-y-auto mt-4">
      <p className="text-xs text-zinc-500 px-3 mb-2 font-medium uppercase tracking-wider">
        Historial de Chats
      </p>

      {sessions.length === 0 ? (
        <p className="text-xs text-zinc-600 px-3 py-2 italic">
          Esto está vacío...
        </p>
      ) : (
        <div className="space-y-1">
          {sessions.map((session) => {
            const isActive = session.id === activeSessionId;
            return (
              <div key={session.id} className="group relative flex items-center">
                <SidebarItem
                  active={isActive}
                  onClick={() => selectChat(session.id)}
                >
                  {session.title}
                </SidebarItem>

                <button
                  type="button"
                  title="Eliminar consulta"
                  onClick={(e) => deleteChat(session.id, e)}
                  className="
                    absolute 
                    right-2 
                    opacity-0 
                    group-hover:opacity-100 
                    text-zinc-400 
                    hover:text-red-400 
                    p-1 
                    rounded 
                    transition
                    bg-zinc-800/80
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default History;

